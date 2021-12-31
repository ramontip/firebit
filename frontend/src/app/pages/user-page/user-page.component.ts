import { Component, OnInit } from '@angular/core';
import { BitService } from 'src/app/services/bit.service';
import { UserService } from 'src/app/services/user.service';
import { Bit } from 'src/types';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

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
