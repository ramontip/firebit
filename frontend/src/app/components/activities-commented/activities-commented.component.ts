import { Component, OnInit } from '@angular/core';
import { BitService } from 'src/app/services/bit.service';
import { UserService } from 'src/app/services/user.service';
import { Bit } from 'src/types';

@Component({
  selector: 'app-activities-commented',
  templateUrl: './activities-commented.component.html',
  styleUrls: ['./activities-commented.component.scss']
})
export class ActivitiesCommentedComponent implements OnInit {

  commentedBits?: Bit[]

  constructor(
    public bitService: BitService,
    public userService: UserService,
  ) { }

  ngOnInit() {
    // Just make sure to load user first
    this.userService.currentUser.subscribe(() => {
      // if (user)
      this.bitService.getCommentedBits().subscribe(bits => this.commentedBits = bits)
    })
  }

}
