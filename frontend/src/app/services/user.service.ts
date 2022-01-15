import {Injectable} from '@angular/core';
import {Friendship, User} from 'src/types';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AppService} from "./app.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly accessTokenLocalStorageKey = 'accessToken';
  isLoggedIn = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router, private jwtHelperService: JwtHelperService, private appService: AppService) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token) {
      const tokenValid = !this.jwtHelperService.isTokenExpired(token);
      this.isLoggedIn.next(tokenValid);
    }
  }

  login(userData: { username: string, password: string }): void {
    this.http.post('/api/token/', userData).subscribe((res: any) => {
      this.isLoggedIn.next(true);
      localStorage.setItem('accessToken', res.token);
      this.router.navigate(['bitmap']);
      this.appService.showSnackBar('Logged in successfully', 'hide', 3000);
    }, () => {
      this.appService.showSnackBar('Wrong username or password', 'hide', 3000);
    });
  }

  registerUser(userData: User) {
    this.router.navigate(['bitmap']);
    return this.http.post('/api/users/', userData);
  }

  getUser(id: number) {
    return this.http.get<User>(`/api/users/${id}/`);
  }

  getAllUsers() {
    return this.http.get<User[]>('/api/users/');
  }


  user: User = {
    id: 1,
    first_name: "Max",
    last_name: "Muster",
    username: "maxi_m",
    email: "mm@firebit.net",
    is_superuser: false,
    is_staff: false,
    is_active: true
  }

  getFriendships(): Friendship[] {
    return [
      {user: this.user, status: 'pending'},
      {user: this.user, status: 'pending'},
      {user: this.user, status: 'friend'},
      {user: this.user, status: 'friend'},
      {user: this.user, status: 'friend'},
    ]
  }

}
