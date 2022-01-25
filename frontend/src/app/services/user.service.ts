import { Injectable } from '@angular/core';
import { Credentials, Friendship, JWTToken, User, UserDetails } from 'src/types';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AppService } from "./app.service";
import { map, switchMap } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";

//import * as url from "url";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly ACCESS_TOKEN_KEY = 'access_token';

  isLoggedIn = new BehaviorSubject(false);
  isAdmin = new BehaviorSubject(false)
  currentUser = new BehaviorSubject<User | null>(null)

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelperService: JwtHelperService,
    private appService: AppService,
    private cookieService: CookieService,
  ) {
    const token = localStorage.getItem(this.ACCESS_TOKEN_KEY);

    if (token) {
      const tokenValid = !this.jwtHelperService.isTokenExpired(token);
      this.isLoggedIn.next(tokenValid);

      if (!tokenValid) {
        appService.showSnackBar("Your token has expired, please log in again", "Hide")
      }

      this.setCurrentUser()
    }
  }

  // Authentication

  login(userData: Credentials) {
    return this.http.post<{ token: string }>(this.appService.baseUrl + '/token/', userData).pipe( //.subscribe(
      // Set logged in
      // map((res) => {
      //   console.log({ loginResponse: res })

      //   this.isLoggedIn.next(true);
      //   localStorage.setItem('access_token', res.token);

      //   this.setCurrentUser()
      //   return res
      // }),
      // Set user
      switchMap(res => {
        const token = this.jwtHelperService.decodeToken<JWTToken>(res.token ?? undefined)

        return this.getUser(token.user_id).pipe(
          map(user => {
            localStorage.setItem('access_token', res.token);
            this.isLoggedIn.next(true)

            this.currentUser.next(user)
            this.isAdmin.next(user.is_superuser || user.is_staff)

            // console.log({ currentUserSwitch: this.currentUser.value })
            // console.log({ isAdminSwitch: this.isAdmin.value })

            return user
          })
        )
      })
    );
  }

  logout() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);

    // TODO: Maybe inform server about logout, to delete tokens or something?

    this.isLoggedIn.next(false);
    this.currentUser.next(null)
    this.isAdmin.next(false)

    this.router.navigate(['/login']);

    this.appService.showSnackBar("Logged out successfully", "Hide")

  }

  registerUser(userData: User) {
    return this.http.post<User>(this.appService.baseUrl + '/users/', userData);
  }


  setCurrentUser() {
    const token = localStorage.getItem(this.ACCESS_TOKEN_KEY)

    const decodedToken = this.jwtHelperService.decodeToken<JWTToken>(token ?? undefined)


    this.http.get<User>(this.appService.baseUrl + `/users/${decodedToken.user_id}/`).subscribe(user => {
      this.currentUser.next(user)
      // console.log({ currentUser: this.currentUser.value })

      this.isAdmin.next(user.is_superuser || user.is_staff)
      // console.log({ isAdmin: this.isAdmin.value })
    })
  }

  updateUser(id: number, userData: User | { password?: string, is_staff?: boolean }) {
    return this.http.patch<User>(`/api/users/${id}/`, userData, {
      headers: { "X-CSRFToken": this.cookieService.get('csrftoken') }
    }).pipe(
      map(user => {
        console.log({ nextUser: user });

        // Only change current user if the current user is updated
        if (this.currentUser.value?.id === user.id) {
          this.currentUser.next(user)
        }

        return user
      })
    )
  }

  deleteUser(user: User) {
    return this.http.delete(this.appService.baseUrl + `/users/${user.id}/`)
  }

  checkPassword(credentials: Credentials) {
    return this.http.post<{ error?: string }>(this.appService.baseUrl + "/users/check_password/", credentials)
  }

  // Users

  getUser(id: number) {
    return this.http.get<User>(this.appService.baseUrl + `/users/${id}/`);
  }

  getUserByUsername(username: string) {
    return this.http.get<User[]>(`/api/users/?username=${username}`).pipe(
      map(users => users.length ? users[0] : undefined)
    )
  }

  getUserByEmail(email: string) {
    return this.http.get<User[]>(`/api/users/?email=${email}`).pipe(
      map(users => users.length ? users[0] : undefined)
    )
  }

  // return this.http.post<{ token: string }>(this.appService.baseUrl + '/token/', userData).pipe( //.subscribe(

  resetUserPassword(email: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.appService.baseUrl + '/password_reset/', JSON.stringify({ email }), { headers: headers }).pipe(
      map(res => {
        // console.log({ resetUserPasswordResponse: res })
        return res
      })
    )
  }

  confirmResetUser(token: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<{ status: string }>(this.appService.baseUrl + '/password_reset/confirm/', JSON.stringify({
      token,
      password
    }), { headers: headers })
  }

  validateResetToken(token: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<{ status: string }>(this.appService.baseUrl + '/password_reset/validate_token/', JSON.stringify({
      token
    }), { headers: headers })
  }

  // getCurrentUser() {
  //   return this.http.get<User>(this.appService.baseUrl + `/users/1/`)
  // }

  getAllUsers() {
    return this.http.get<User[]>(this.appService.baseUrl + '/users/');
  }


  hasPermission(permission: string): boolean {
    const token = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    const decodedToken = this.jwtHelperService.decodeToken(token ? token : '');
    const permissions = decodedToken ? decodedToken.permissions : {};
    return permission in permissions;
  }

  hasFriend(username: string) {
    return this.http.get<Friendship[]>(`/api/friendships/?auth_user=${username}`).pipe(
      map(f => f.length > 0)
    )
  }

  // User Details

  createUserDetails(formData: FormData) {
    return this.http.post<UserDetails>(this.appService.baseUrl + `/userDetails/`, formData);
  }

  updateUserDetails(id: number, formData: any) {
    return this.http.patch<UserDetails>(this.appService.baseUrl + `/userDetails/${id}/`, formData).pipe(

    );
  }

  // Counters
  // TODO: Put here for stats to be all in one place, maybe move to respective service?

  getFriendCount(username: string) {
    return this.http.get<{ friendships: number }>(`/api/friendships/?auth_user=${username}&status=2&count=true`)
      .pipe(map(res => {
        // console.log({ res })
        return res.friendships
      }))
  }

  getLikeCount(id: number) {
    return this.http.get<{ liked_bits: number }>(this.appService.baseUrl + `/users/${id}/liked_bits/?count=true`)
      .pipe(map(res => {
        // console.log({ res })
        return res.liked_bits
      }))
  }

  getBookmarkCount(id: number) {
    return this.http.get<{ bookmarks: number }>(this.appService.baseUrl + `/users/${id}/bookmarks/?count=true`)
      .pipe(map(res => {
        // console.log({ res })
        return res.bookmarks
      }))
  }

}
