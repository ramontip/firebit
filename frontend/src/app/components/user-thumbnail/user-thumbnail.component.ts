import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../types";
import {UserService} from "../../services/user.service";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-user-thumbnail',
  templateUrl: './user-thumbnail.component.html',
  styleUrls: ['./user-thumbnail.component.scss']
})
export class UserThumbnailComponent implements OnInit {

  @Input()
  user?: User

  thumbnailPath = ""

  constructor(
    private userService: UserService,
    private appService: AppService
  ) {
  }

  ngOnInit(): void {
    if (this.user?.userdetails?.file) {
      this.thumbnailPath = this.appService.baseUrl + this.user.userdetails.file;
    } else {
      this.thumbnailPath = `https://avatars.dicebear.com/api/pixel-art/${this.user?.username ?? "firebit"}.svg?translateY=-5`;
    }
  }

}
