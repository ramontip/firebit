import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  searchForm = new FormControl("")

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {

  }

  clearSearch() {
    this.searchForm.setValue("")
  }

}
