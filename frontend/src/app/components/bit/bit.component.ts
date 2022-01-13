import { Component, Input, OnInit } from '@angular/core';
import {Bit, Category, User} from 'src/types';
import {CategoryService} from "../../services/category.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-bit',
  templateUrl: './bit.component.html',
  styleUrls: ['./bit.component.scss']
})
export class BitComponent implements OnInit {

  user?: User

  @Input()
  bit?: any

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (this.bit.auth_user) {
      this.userService.getUser(this.bit.auth_user!).subscribe(user => {
        this.user = user;
      })
    }
  }

}
