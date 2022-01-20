import { Component, OnInit } from '@angular/core';
import { FriendshipService } from 'src/app/services/friendship.service';
import { UserService } from 'src/app/services/user.service';
import { Friendship } from 'src/types';

@Component({
  selector: 'app-profile-friends-page',
  templateUrl: './profile-friends-page.component.html',
  styleUrls: ['./profile-friends-page.component.scss']
})
export class ProfileFriendsPageComponent implements OnInit {

  friends: Friendship[] = []
  friendRequests: Friendship[] = []

  constructor(
    public friendshipService: FriendshipService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {

    // TODO: Is there a better way than nesting subscribe's?

    this.userService.currentUser.subscribe(user => {
      if (!user) return

      this.friendshipService.getFriendRequests(user).subscribe(requests => {
        this.friendRequests = requests
        console.log({ requests })
      })

      this.friendshipService.getFriends(user).subscribe(friends => {
        this.friends = friends
      })

    })


  }

}
