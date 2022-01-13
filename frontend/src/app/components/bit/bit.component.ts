import { Component, Input, OnInit } from '@angular/core';
import { Bit, User } from 'src/types';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-bit',
  templateUrl: './bit.component.html',
  styleUrls: ['./bit.component.scss']
})
export class BitComponent implements OnInit {

  user?: User

  @Input()
  bit?: Bit

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (this.bit?.auth_user) {
      this.userService.getUser(this.bit.auth_user).subscribe(user => {
        this.user = user;
      })
    }
  }

}
