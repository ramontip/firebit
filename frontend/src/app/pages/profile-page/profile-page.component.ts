import { Component, OnInit } from '@angular/core';
import { BitService } from 'src/app/services/bit.service';
import { UserService } from 'src/app/services/user.service';
import { Bit } from 'src/types';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  bits: Bit[] = []

  constructor(
    public userService: UserService,
    public bitService: BitService,
  ) { }

  ngOnInit(): void {
    // TODO: Replace with logged in username
    this.bitService.getBitsByUser("root").subscribe(bits => {
      this.bits = bits
    })

  }

}
