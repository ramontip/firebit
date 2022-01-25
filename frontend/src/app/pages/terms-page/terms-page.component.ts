import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-terms-page',
  templateUrl: './terms-page.component.html',
  styleUrls: ['./terms-page.component.scss']
})
export class TermsPageComponent implements OnInit {

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    window.history.back()
  }

}
