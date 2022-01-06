import { Injectable } from '@angular/core';
import { Friendship, User } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  user: User = { name: "Jane Doe", username: "jane", aboutme: "Lorem ipsum dolor sit amet doctetur" }

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
