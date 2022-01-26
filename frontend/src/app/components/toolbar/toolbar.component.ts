import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {User} from 'src/types';
import {Router} from "@angular/router";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  searchForm = new FormControl("", [Validators.required, Validators.minLength(3)]);
  user?: User

  thumbnailPath = ""

  constructor(
    public userService: UserService,
    private router: Router,
    private appService: AppService,
  ) {
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.user = user ?? undefined
      if (this.user?.userdetails?.file) {
        this.thumbnailPath = this.appService.baseUrl + this.user.userdetails.file;
      } else {
        this.thumbnailPath = `https://avatars.dicebear.com/api/pixel-art/${this.user?.username ?? "firebit"}.svg?translateY=-5`;
      }
    })
  }

  clearSearch() {
    this.searchForm.setValue("")
  }

  search() {
    if (this.searchForm.valid) {
      this.router.navigate(['/search/' + this.searchForm.value])
    } else {
      this.appService.showSnackBar("Search term must be at least 3 characters long", "Hide")
    }
  }

  handleKeyUp(e: { keyCode: number; }) {
    if (e.keyCode === 13) {
      this.search()
    }
  }

  blurSearch() {
    if (!this.searchForm.value) {
      this.searchForm.reset()
    }
  }

}
