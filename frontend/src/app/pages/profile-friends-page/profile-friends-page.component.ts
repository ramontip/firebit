import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {Friendship} from 'src/types';

@Component({
  selector: 'app-profile-friends-page',
  templateUrl: './profile-friends-page.component.html',
  styleUrls: ['./profile-friends-page.component.scss']
})
export class ProfileFriendsPageComponent implements OnInit {

  friendships: Friendship[] = []
  friends: Friendship[] = []
  friendRequests: Friendship[] = []

  constructor(public userService: UserService) {

    // TODO: Is there a better way than nesting subscribe's?

    // @ts-ignore
    userService.getCurrentUser().subscribe(user => {

      userService.getFriendships().subscribe(friendships => {
        this.friendships = friendships

        // console.log({ friendships })
        // console.log({ user })

        // TODO: show only incoming requests -> && f.to_auth_user === current user
        this.friendRequests = friendships.filter(f => f.friendship_status === 1 && f.to_auth_user === user.id)
        this.friends = friendships.filter(f => f.friendship_status === 2)
      })

    })

  }

  ngOnInit(): void {
  }

}
