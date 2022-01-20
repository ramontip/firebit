import { Component, OnInit } from '@angular/core';
import { BitService } from 'src/app/services/bit.service';
import { UserService } from 'src/app/services/user.service';
import { Bit } from 'src/types';

@Component({
  selector: 'app-activities-liked',
  templateUrl: './activities-liked.component.html',
  styleUrls: ['./activities-liked.component.scss']
})
export class ActivitiesLikedComponent implements OnInit {

  likedBits: Bit[] = []

  constructor(
    public bitService: BitService,
    public userService: UserService,
  ) { }

  async ngOnInit() {
    // Just make sure to load user first
    this.userService.currentUser.subscribe(() => {
      // if (user)
      this.bitService.getLikedBits().subscribe(bits => this.likedBits = bits)
    })
  }

}
