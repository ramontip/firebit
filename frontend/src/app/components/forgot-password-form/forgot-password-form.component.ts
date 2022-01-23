import {Component, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss'],
  providers: [UserService]
})
export class ForgotPasswordFormComponent implements OnInit {

  resetPasswordFormGroup: FormGroup

  constructor(private userService: UserService) {
    this.resetPasswordFormGroup = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    })
  }

  ngOnInit(): void {
  }


  resetPassword() {
    this.userService.resetUserPassword(this.resetPasswordFormGroup.controls["email"].value).subscribe(
      (data) => {
        console.log(data)
      },
      (error) => {
        console.log(error)
      }
    )

  }

  getEmailErrorMessage() {
    if (this.resetPasswordFormGroup.controls["email"].hasError('email')) {
      return 'You must enter a valid email';
    }
    if (this.resetPasswordFormGroup.controls["email"].hasError('pattern')) {
      return 'You must enter a valid email';
    }
    return this.resetPasswordFormGroup.controls["email"].hasError('required') ? 'Email required' : '';
  }

}
