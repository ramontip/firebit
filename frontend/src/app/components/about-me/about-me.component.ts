import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { FriendshipService } from 'src/app/services/friendship.service';
import { UserService } from 'src/app/services/user.service';
import { Friendship, User } from 'src/types';

type Action = "none" | "edit" | "friend" | "profile"

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  @Input()
  user: User | null = null

  @Input()
  action: Action = "none"

  @Input()
  friendship?: Friendship

  currentUser?: User

  formattedAbout?: string

  constructor(
    private friendshipService: FriendshipService,
    private userService: UserService,
    private appService: AppService,
  ) {
  }

  ngOnInit(): void {
    console.log({ f: this.friendship })

    this.userService.currentUser.subscribe(user => {
      if (user)
        this.currentUser = user

      this.formattedAbout = this.appService.replaceTags(this.user?.userdetails?.about ?? "")

    })

  }

  addFriend() {
    this.friendshipService.sendFriendRequest(this.user?.id ?? -1).subscribe(f => {
      this.friendship = f
    })
  }

  removeFriend() {
    if (this.friendship) {
      this.friendshipService.removeFriend(this.friendship).subscribe(() => {
        this.friendship = undefined
      })
    }
  }

}
