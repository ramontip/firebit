import {Component, Input, OnInit} from '@angular/core';
import {Bit, User} from 'src/types';
import {UserService} from "../../services/user.service";
import {BitService} from "../../services/bit.service";

@Component({
  selector: 'app-bit',
  templateUrl: './bit.component.html',
  styleUrls: ['./bit.component.scss']
})
export class BitComponent implements OnInit {

  user?: User;

  commentsCount = 0;

  @Input()
  bit?: Bit

  constructor(private userService: UserService, public bitService: BitService) {
  }

  ngOnInit(): void {
    if (this.bit?.auth_user) {
      this.userService.getUser(this.bit.auth_user).subscribe(user => {
        this.user = user;
      })
    }

    this.bitService.getBitComments(this.bit?.id!).subscribe(comments => {
      this.commentsCount = comments.length
    })
  }

}
