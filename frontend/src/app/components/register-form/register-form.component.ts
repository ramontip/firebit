import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  registerFormGroup: FormGroup

  constructor() {
    this.registerFormGroup = new FormGroup({
      username: new FormControl("", Validators.required),
      displayname: new FormControl(""),
      email: new FormControl("", [Validators.email]),
      password: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", Validators.required),
      acceptTos: new FormControl(false, Validators.required),
    })
  }

  ngOnInit(): void {
  }

  register() {
    console.log("registered")
  }

}