import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss']
})
export class ForgotPasswordFormComponent implements OnInit {

  resetPasswordFormGroup: FormGroup

  constructor() {
    this.resetPasswordFormGroup = new FormGroup({
      email: new FormControl("", [Validators.email])
    })
  }

  ngOnInit(): void { }


  resetPassword() {

  }

}
