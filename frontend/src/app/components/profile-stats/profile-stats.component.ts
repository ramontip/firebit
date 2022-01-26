import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Stat, User } from 'src/types';

@Component({
  selector: 'app-profile-stats',
  templateUrl: './profile-stats.component.html',
  styleUrls: ['./profile-stats.component.scss']
})
export class ProfileStatsComponent implements OnInit {

  @Input()
  user?: User

  stats: Stat[] = [
    { description: a => `${a} friend${a !== 1 ? "s" : ""}`, amount: 0, icon: "people", link: "friends" },
    { description: a => `${a} bit${a !== 1 ? "s" : ""} liked`, amount: 0, icon: "local_fire_department" },
    { description: a => `${a} bit${a !== 1 ? "s" : ""} bookmarked`, amount: 0, icon: "bookmark" },
  ]

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (!this.user) {
      return
    }

    this.userService.getFriendCount(this.user.username).subscribe(count => {
      this.stats[0].amount = count
    })

    this.userService.getLikeCount(this.user.id).subscribe(count => {
      this.stats[1].amount = count
    })

    this.userService.getBookmarkCount(this.user.id).subscribe(count => {
      this.stats[2].amount = count
    })

  }

}
