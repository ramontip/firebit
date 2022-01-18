import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {AppService} from "../../services/app.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  providers: [UserService]
})
export class RegisterFormComponent implements OnInit {

  registerFormGroup: FormGroup

  constructor(private userService: UserService, private appService: AppService, private fb: FormBuilder) {
    this.registerFormGroup = new FormGroup({
      username: new FormControl("", Validators.required, [this.userValidator()]),
      first_name: new FormControl("", Validators.required),
      last_name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.email], [this.emailValidator()]),
      password: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", Validators.required),
      acceptTos: new FormControl(false, Validators.required),
    })
  }

  ngOnInit(): void {

  }

  registerUser() {
    this.userService.registerUser(this.registerFormGroup.value).subscribe(() => {
      this.appService.showSnackBar('Registered successfully', 'Hide', 3000);
      this.userService.isLoggedIn.next(true);
    }, (error) => {
      console.log(error);
    });
  };

  userValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.userService.getAllUsers().pipe(map(users => {
        const currentUsername = this.registerFormGroup.controls['username'].value;
        const existingUser = users.find(user => user.username === currentUsername);
        return existingUser ? {userAlreadyExists: true} : null
      }))
    }
  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.userService.getAllUsers().pipe(map(users => {
        const currentEmail = this.registerFormGroup.controls['email'].value;
        const existingEmail = users.find(user => user.email === currentEmail);
        return existingEmail ? {emailAlreadyExists: true} : null
      }))
    }
  }

  // passwordMatchValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const password = this.registerFormGroup.controls['password'].value;
  //     const confirmPassword = this.registerFormGroup.controls['confirmPassword'].value;
  //     return password === confirmPassword ? null : {passwordMismatch: true}
  //   }
  // }


}
