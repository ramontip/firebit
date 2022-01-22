import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/types';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  searchForm = new FormControl("")
  user?: User

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.user = user ?? undefined
    })
  }

  clearSearch() {
    this.searchForm.setValue("")
  }

  search() {
    console.log(this.searchForm.value)
  }

  handleKeyUp(e: { keyCode: number; }) {
    if (e.keyCode === 13) {
      this.search()
    }
  }

}
