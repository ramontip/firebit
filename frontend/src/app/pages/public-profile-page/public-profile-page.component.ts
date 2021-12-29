import { Component, OnInit } from '@angular/core';
import { BitService } from 'src/app/services/bit.service';
import { UserService } from 'src/app/services/user.service';
import { Bit } from 'src/types';

@Component({
  selector: 'app-public-profile-page',
  templateUrl: './public-profile-page.component.html',
  styleUrls: ['./public-profile-page.component.scss']
})
export class PublicProfilePageComponent implements OnInit {

  bits: Bit[]

  isFriend = false

  constructor(
    public userService: UserService,
    public bitService: BitService,
  ) {
    this.bits = bitService.getBitsByUser()
  }

  ngOnInit(): void { }

}
