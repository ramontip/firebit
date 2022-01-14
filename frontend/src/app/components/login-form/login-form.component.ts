import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginFormGroup: FormGroup

  constructor() {
    this.loginFormGroup = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    })
  }

  ngOnInit(): void { }

  login() {

  }

}
