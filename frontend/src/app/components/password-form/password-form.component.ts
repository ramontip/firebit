import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { matchValidator } from 'src/app/validators/validators';
import { UserService } from "../../services/user.service"

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {

  passwordFormGroup: FormGroup

  readonly passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/
  // minLength part: (?=.{8,})

  constructor(
    private userService: UserService,
    private appService: AppService,
  ) {
    this.passwordFormGroup = new FormGroup({
      oldPassword: new FormControl("", Validators.required),
      newPassword: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]),
      confirmPassword: new FormControl("", [Validators.required, matchValidator("newPassword")]),
    })
  }

  ngOnInit(): void { }

  updatePassword() {
    const password = this.passwordFormGroup.controls["oldPassword"].value
    const confirmPassword = this.passwordFormGroup.controls["confirmPassword"].value
    const newPassword: string = this.passwordFormGroup.controls["newPassword"].value

    if (!this.passwordFormGroup.valid) {
      return
    }

    const userId = this.userService.currentUser.value?.id

    if (!userId) {
      console.log(`user id is ${userId}`)
      return
    }

    this.userService.updateUser(userId, { password: newPassword }).subscribe(user => {
      console.log({ userPassword: user })

      // Reset all passwords
      this.passwordFormGroup.reset()

      this.appService.showSnackBar("Password updated successfully", "Hide")
    })

  }

  oldPasswordValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return new Observable<null>()
    }
  }

}
