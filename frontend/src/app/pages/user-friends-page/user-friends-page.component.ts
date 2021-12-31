import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Friendship } from 'src/types';

@Component({
  selector: 'app-user-friends-page',
  templateUrl: './user-friends-page.component.html',
  styleUrls: ['./user-friends-page.component.scss']
})
export class UserFriendsPageComponent implements OnInit {

  friends: Friendship[]

  constructor(public userService: UserService) {
    this.friends = userService.getFriendships().filter(f => f.status === "friend")
  }

  ngOnInit(): void { }

}
