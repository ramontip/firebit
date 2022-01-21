import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BitService } from 'src/app/services/bit.service';
import { FriendshipService } from 'src/app/services/friendship.service';
import { UserService } from 'src/app/services/user.service';
import { Bit, Friendship, User } from 'src/types';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  bits: Bit[] = []

  user?: User
  friendship?: Friendship

  constructor(
    public userService: UserService,
    public bitService: BitService,
    public friendshipService: FriendshipService,
    public route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    const username: string = this.route.snapshot.params.username

    this.userService.getUserByUsername(username).subscribe(user => {
      this.user = user
      console.log({ user })

      if (!user) {
        this.router.navigate(["**"], { skipLocationChange: true })
        return
      }

      this.friendshipService.getFriendship(user?.username ?? "").subscribe(friendship => {
        this.friendship = friendship

        console.log({ friendship })

        if (friendship?.friendship_status === 2) {
          this.bitService.getBitsByUser(username).subscribe(bits => {
            this.bits = bits
          })
        }
      })

    },
      err => {
        this.router.navigate(["**"], { skipLocationChange: true })
      }
    )

  }

}
