import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AppService} from "../../services/app.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {matchValidator} from "../../validators/validators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.scss']
})
export class PasswordResetFormComponent implements OnInit {

  passwordResetFormGroup: FormGroup
  readonly passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/
  tokenIsValid? = false
  @Input()
  token = ''

  constructor(
    private userService: UserService,
    private appService: AppService,
    private router: Router,
  ) {
    this.passwordResetFormGroup = new FormGroup({
      newPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.passwordPattern),
      ]),
      confirmPassword: new FormControl("", [Validators.required, matchValidator("newPassword")]),
    })
  }

  ngOnInit(): void {
    this.userService.validateResetToken(this.token).subscribe(res => {
      if (res.status !== 'OK') {
        this.tokenIsValid = false
        this.appService.showSnackBar("This token is not valid!", "Hide")
      }
      this.tokenIsValid = true
    })
  }

  updatePassword() {
    const password: string = this.passwordResetFormGroup.controls["newPassword"].value

    // Doesnt seem to be triggered?
    this.passwordResetFormGroup.updateValueAndValidity()

    if (this.passwordResetFormGroup.invalid) {
      return
    }

    const newPassword = this.passwordResetFormGroup.controls["newPassword"].value

    this.userService.confirmResetUser(this.token, newPassword).subscribe(res => {
      if (res.status === 'OK') {
        this.appService.showSnackBar('Password reset successful', 'Hide')
        this.router.navigate(['/login'])
      } else {
        this.appService.showSnackBar('Password reset failed', 'Hide')
      }

      // Reset all passwords
      this.passwordResetFormGroup.reset()

      this.appService.showSnackBar("Password updated successfully", "Hide")
    })

  }

  updateConfirmPassword() {
    if (this.passwordResetFormGroup.controls['confirmPassword'].value !== "")
      this.passwordResetFormGroup.controls['confirmPassword'].updateValueAndValidity()
  }

}
