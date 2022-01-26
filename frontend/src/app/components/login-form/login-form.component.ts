import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {Router} from '@angular/router';
import {AppService} from 'src/app/services/app.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginFormGroup: FormGroup

  constructor(
    private http: HttpClient,
    public userService: UserService,
    private appService: AppService,
    private router: Router,
  ) {
    this.loginFormGroup = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
  }

  login() {
    // console.log("logging in...")
    this.userService.login(this.loginFormGroup.value).subscribe(
      res => {
        // console.log({loginFormResponse: res})

        this.appService.showSnackBar('Logged in successfully', 'Hide');

        this.router.navigate(["/bitmap"])
      },
      (err) => {
        this.appService.showSnackBar('Invalid username or password', 'Hide')
        this.loginFormGroup.controls["password"].setValue("")
        // console.log({loginError: err})
      }
    );
  }

  usernameErrorMessage() {
    return this.loginFormGroup.controls["username"].hasError('required') ? 'Username required' : '';
  }

  passwordErrorMessage() {
    return this.loginFormGroup.controls["password"].hasError('required') ? 'Password required' : '';
  }

}
