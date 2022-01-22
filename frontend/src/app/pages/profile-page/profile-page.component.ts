import { Component, OnInit } from '@angular/core';
import { BitService } from 'src/app/services/bit.service';
import { UserService } from 'src/app/services/user.service';
import { Bit, User } from 'src/types';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  bits?: Bit[]
  user?: User

  constructor(
    public userService: UserService,
    public bitService: BitService,
  ) { }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.user = user
      }

      this.bitService.getBitsByUser(user?.username ?? "").subscribe(bits => this.bits = bits)
    })
  }

}
