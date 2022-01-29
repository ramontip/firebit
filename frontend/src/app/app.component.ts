import {Component} from '@angular/core';
import { AppService } from './services/app.service';
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    // set the class "darkmode" based on the value of the field "isDarkmode"
    // TODO: Could also be used for toggling sidebar etc.
    "[class.darkmode]": "isDarkmode"
  }
})
export class AppComponent {
  title = 'frontend';
  isDarkmode: boolean

  constructor(public userService: UserService, appService: AppService) {
    // Set initial darkmode and update the class whenever darkmode is changed
    this.isDarkmode = localStorage.getItem(appService.DARKMODE_KEY) === "true"
    appService.isDarkmode.subscribe(darkmode => this.isDarkmode = darkmode)
  }
}
