import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Friendship } from 'src/types';

@Component({
  selector: 'app-profile-friends-page',
  templateUrl: './profile-friends-page.component.html',
  styleUrls: ['./profile-friends-page.component.scss']
})
export class ProfileFriendsPageComponent implements OnInit {

  friendships: Friendship[]
  friends: Friendship[]
  friendRequests: Friendship[]

  constructor(public userService: UserService) {
    this.friendships = userService.getFriendships()

    this.friends = this.friendships.filter(f => f.status === "friend")
    this.friendRequests = this.friendships.filter(f => f.status === "pending")
  }

  ngOnInit(): void { }

}
