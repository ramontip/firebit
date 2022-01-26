import {Component, Input, OnInit} from '@angular/core';
import {AppService} from 'src/app/services/app.service';
import {FriendshipService} from 'src/app/services/friendship.service';
import {Friendship, User} from 'src/types';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  @Input()
  friendship?: Friendship

  friendUser?: User

  @Input()
  editable = false

  @Input()
  user?: User

  constructor(
    private friendshipService: FriendshipService,
    public appService: AppService,
  ) {
  }

  ngOnInit(): void {
    // temp
    this.friendshipService.otherUser(this.friendship, this.user).subscribe(user => {
      this.friendUser = user
      // console.log({ friendUser: user })
    })
  }

  acceptRequest() {
    // console.log({ f: this.friendship })
    if (this.friendship) {
      this.friendshipService.acceptFriendRequest(this.friendship).subscribe(friend => {
        // console.log({ friend })
        this.friendship = friend

        this.appService.refreshRoute()
      })
    }
  }

  declineRequest() {
    if (this.friendship) {
      this.friendshipService.declineFriendRequest(this.friendship).subscribe(() => {
        this.friendship = undefined
        // TODO: How to remove this component?
        this.appService.refreshRoute()
      })
    }
  }

  removeFriend() {
    if (this.friendship && confirm("Do you really want to unfriend?")) {
      this.friendshipService.removeFriend(this.friendship).subscribe(() => {
        this.appService.refreshRoute()
      })
    }
  }

}
