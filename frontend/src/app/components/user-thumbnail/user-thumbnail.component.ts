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

  constructor(private userService: UserService, private appService: AppService) {
    userService.currentUser.subscribe(user => {
      if (user?.userdetails?.file) {
        this.thumbnailPath = appService.baseUrl + user.userdetails.file;
      } else {
        this.thumbnailPath = `https://avatars.dicebear.com/api/pixel-art/${user?.username ?? "firebit"}.svg?translateY=-5`;
      }
    })
  }

  ngOnInit(): void {
  }

}
