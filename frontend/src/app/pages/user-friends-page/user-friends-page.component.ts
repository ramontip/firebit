import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Friendship } from 'src/types';

@Component({
  selector: 'app-user-friends-page',
  templateUrl: './user-friends-page.component.html',
  styleUrls: ['./user-friends-page.component.scss']
})
export class UserFriendsPageComponent implements OnInit {

  friends: Friendship[] = []

  constructor(
    public userService: UserService,
    public route: ActivatedRoute,
  ) {
    // this.friends = userService.getFriendships().filter(f => f.status === "friend")

    const username: string = route.snapshot.params.username

    userService.getFriendsByUser(username).subscribe(friendships => {
      this.friends = friendships
    })

  }

  ngOnInit(): void { }

}
