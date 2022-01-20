import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FriendshipService } from 'src/app/services/friendship.service';
import { UserService } from 'src/app/services/user.service';
import { Friendship, User } from 'src/types';

@Component({
  selector: 'app-user-friends-page',
  templateUrl: './user-friends-page.component.html',
  styleUrls: ['./user-friends-page.component.scss']
})
export class UserFriendsPageComponent implements OnInit {

  friends: Friendship[] = []

  user?: User

  constructor(
    public userService: UserService,
    public friendshipService: FriendshipService,
    public route: ActivatedRoute,
  ) {
    // this.friends = userService.getFriendships().filter(f => f.status === "friend")

    const username: string = route.snapshot.params.username

    friendshipService.getFriendsByUser(username).subscribe(friendships => {
      this.friends = friendships
    })

    userService.getUserByUsername(username).subscribe(user => {
      this.user = user
    })

  }

  ngOnInit(): void { }

}
