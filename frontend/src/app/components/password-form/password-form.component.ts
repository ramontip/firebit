import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
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
      oldPassword: new FormControl("", [Validators.required, Validators.minLength(8)], [this.passwordValidator()]),
      newPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.passwordPattern),
        matchValidator("oldPassword", { not: true }),
      ]),
      confirmPassword: new FormControl("", [Validators.required, matchValidator("newPassword")]),
    })
  }

  ngOnInit(): void { }

  updatePassword() {
    const password: string = this.passwordFormGroup.controls["newPassword"].value

    // Doesnt seem to be triggered?
    this.passwordFormGroup.updateValueAndValidity()

    if (this.passwordFormGroup.invalid) {
      return
    }

    const userId = this.userService.currentUser.value?.id

    if (!userId) {
      console.log(`user id is ${userId}`)
      return
    }

    this.userService.updateUser(userId, { password }).subscribe(user => {
      // console.log({ userPassword: user })

      // Reset all passwords
      this.passwordFormGroup.reset()

      this.appService.showSnackBar("Password updated successfully", "Hide")
    })

  }

  updateConfirmPassword() {
    if (this.passwordFormGroup.controls['confirmPassword'].value !== "")
      this.passwordFormGroup.controls['confirmPassword'].updateValueAndValidity()
  }

  passwordValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

      // User shouldnt be null anyway
      const username = this.userService.currentUser.value?.username
      if (!username) {
        console.log(`username is ${username}`)
        return new Observable<null>()
      }

      return from([control.value]).pipe(
        delay(500),
        switchMap<string, Observable<ValidationErrors | null>>(password => {
          return this.userService.checkPassword({ username, password }).pipe(
            map(res => {
              return res.error ? { password: true } : null
            }),

            // catch error response
            catchError((err: HttpErrorResponse) => {
              console.log({ passwordError: err })
              return from([{ passwordError: true }])
            })
          )
        }
        )
      )

    }
  }

}
