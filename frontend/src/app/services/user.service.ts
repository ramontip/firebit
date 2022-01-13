import { Injectable } from '@angular/core';
import {Friendship, User} from 'src/types';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id:number) {
    return this.http.get<User>(`/api/users/${id}/`);
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
      { user: this.user, status: 'pending' },
      { user: this.user, status: 'pending' },
      { user: this.user, status: 'friend' },
      { user: this.user, status: 'friend' },
      { user: this.user, status: 'friend' },
    ]
  }

}
