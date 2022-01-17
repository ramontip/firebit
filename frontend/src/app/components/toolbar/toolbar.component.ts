import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  searchForm = new FormControl("")

  profileImageUrl: string = ""

  constructor(
    public userService: UserService
  ) {
    userService.user.subscribe(user => {
      this.profileImageUrl = `https://avatars.dicebear.com/api/pixel-art/${user?.username ?? "firebit"}.svg?translateY=-5`
    })
  }

  ngOnInit(): void {
  }

  clearSearch() {
    this.searchForm.setValue("")
  }

}
