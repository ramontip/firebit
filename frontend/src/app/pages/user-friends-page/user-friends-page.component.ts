import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
  ) {
    // this.friends = userService.getFriendships().filter(f => f.status === "friend")

    const username: string = route.snapshot.params.username

    userService.getUserByUsername(username).subscribe(
      user => {
        if (!user) {
          this.router.navigate(["**"], { skipLocationChange: true })
          return
        }

        this.user = user

        friendshipService.getFriendsByUser(username).subscribe(friendships => {
          this.friends = friendships
        })
      },
      err => {
        this.router.navigate(["**"], { skipLocationChange: true })
      }
    )
  }

  ngOnInit(): void { }

}
