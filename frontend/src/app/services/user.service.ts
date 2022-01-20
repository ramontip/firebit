import {Injectable} from '@angular/core';
import {Friendship, JWTToken, User} from 'src/types';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AppService} from "./app.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly ACCESS_TOKEN_KEY = 'accessToken';

  isLoggedIn = new BehaviorSubject(false);
  currentUser = new BehaviorSubject<User | null>(null)

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelperService: JwtHelperService,
    private appService: AppService
  ) {
    const token = localStorage.getItem(this.ACCESS_TOKEN_KEY);

    if (token) {
      const tokenValid = !this.jwtHelperService.isTokenExpired(token);
      this.isLoggedIn.next(tokenValid);

      this.setCurrentUser()
    }
  }

  // Authentication

  login(userData: { username: string, password: string }): void {
    this.http.post(this.appService.baseUrl + '/token/', userData).subscribe(
      (res: any) => {
        this.isLoggedIn.next(true);
        localStorage.setItem('accessToken', res.token);

        this.setCurrentUser()

        this.router.navigate(['bitmap']);
        this.appService.showSnackBar('Logged in successfully', 'Hide', 3000);
      },
      () => this.appService.showSnackBar('Invalid username or password', 'Hide', 3000)
    );
  }

  logout() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);

    // TODO: Maybe inform server about logout, to delete tokens or something?

    this.isLoggedIn.next(false);
    this.currentUser.next(null)

    this.router.navigate(['/login']);

    this.appService.showSnackBar("Logged out successfully", "Hide")

  }

  registerUser(userData: User) {
    this.router.navigate(['bitmap']);
    return this.http.post(this.appService.baseUrl + '/users/', userData);
  }


  setCurrentUser() {
    const token = localStorage.getItem(this.ACCESS_TOKEN_KEY)

    const decodedToken = this.jwtHelperService.decodeToken<JWTToken>(token ?? undefined)


    this.http.get<User>(this.appService.baseUrl + `/users/${decodedToken.user_id}/`).subscribe(user => {
      this.currentUser.next(user)
      console.log({currentUser: this.currentUser.value})
    })
  }

  // Users

  getUser(id: number) {
    return this.http.get<User>(this.appService.baseUrl + `/users/${id}/`);
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


  // user: User = {
  //   id: 1,
  //   first_name: "Max",
  //   last_name: "Muster",
  //   username: "maxi_m",
  //   email: "mm@firebit.net",
  //   is_superuser: false,
  //   is_staff: false,
  //   is_active: true
  // }

  // Friendships

  getFriendships() {
    return this.http.get<Friendship[]>(this.appService.baseUrl + `/friendships/?auth_user=${this.currentUser.value?.username}`)
  }

  getFriendsByUser(username: string) {
    return this.http.get<Friendship[]>(this.appService.baseUrl + `/friendships/?auth_user=${username}&status=2`)
  }

}
