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
      email: new FormControl("", [Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")], [this.emailValidator()]),
    })
  }

  ngOnInit(): void {
  }


  resetPassword() {

  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.userService.getAllUsers().pipe(map(users => {
        const currentEmail = this.resetPasswordFormGroup.controls['email'].value;
        const existingEmail = users.find(user => user.email === currentEmail);
        return existingEmail ? {emailAlreadyExists: true} : null
      }))
    }
  }

  getEmailErrorMessage() {
    if (this.resetPasswordFormGroup.controls["email"].hasError('emailAlreadyExists')) {
      return 'Email already taken';
    }
    if (this.resetPasswordFormGroup.controls["email"].hasError('email')) {
      return 'You must enter a valid email';
    }
    if (this.resetPasswordFormGroup.controls["email"].hasError('pattern')) {
      return 'You must enter a valid email';
    }
    return this.resetPasswordFormGroup.controls["email"].hasError('required') ? 'Email required' : '';
  }

}
