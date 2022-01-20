import { Component, Input, OnInit } from '@angular/core';
import { FriendshipService } from 'src/app/services/friendship.service';
import { Friendship, User } from 'src/types';

type Action = "none" | "edit" | "friend"

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

  constructor(
    private friendshipService: FriendshipService,
  ) { }

  ngOnInit(): void {
    console.log({ f: this.friendship })
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
