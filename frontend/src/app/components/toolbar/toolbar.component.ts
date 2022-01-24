import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {User} from 'src/types';
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  searchForm = new FormControl("", Validators.minLength(3));
  user?: User

  constructor(
    public userService: UserService,
    private searchService: SearchService
  ) {
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.user = user ?? undefined
    })
  }

  clearSearch() {
    this.searchForm.setValue("")
  }

  search() {
    this.searchService.getSearchResults(this.searchForm.value)
  }

  handleKeyUp(e: { keyCode: number; }) {
    if (e.keyCode === 13) {
      this.search()
    }
  }

}
