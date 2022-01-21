import {Component, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginFormGroup: FormGroup

  constructor(private http: HttpClient, public userService: UserService) {
    this.loginFormGroup = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.userService.login(this.loginFormGroup.value);
  }

  usernameErrorMessage() {
    return this.loginFormGroup.controls["username"].hasError('required') ? 'Username required' : '';
  }

  passwordErrorMessage() {
    return this.loginFormGroup.controls["password"].hasError('required') ? 'Password required' : '';
  }

}
