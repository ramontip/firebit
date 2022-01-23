import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { UserService } from "../../services/user.service";
import { AppService } from "../../services/app.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JWTToken } from 'src/types';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  // providers: [UserService]
})

export class RegisterFormComponent implements OnInit {

  registerFormGroup: FormGroup
  hide = true;

  readonly passwordPattern = /(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/
  readonly emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

  constructor(
    private userService: UserService,
    private appService: AppService,
    private fb: FormBuilder,
    private router: Router,
    private jwtHelperService: JwtHelperService,
  ) {
    this.registerFormGroup = new FormGroup({
      username: new FormControl("", Validators.required, [this.userValidator()]),
      first_name: new FormControl("", Validators.required),
      last_name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email, Validators.pattern(this.emailPattern)], [this.emailValidator()]),
      password: new FormControl("", [Validators.required, Validators.pattern(this.passwordPattern)]),
      confirmPassword: new FormControl("", Validators.required),
      acceptTos: new FormControl(false, Validators.requiredTrue)
    })
  }

  ngOnInit(): void {

  }

  registerUser() {

    const password = this.registerFormGroup.controls["password"].value
    const confirmPassword = this.registerFormGroup.controls["confirmPassword"].value
    const acceptTos = this.registerFormGroup.controls["acceptTos"].value

    if (password === confirmPassword && acceptTos === true) {
      this.userService.registerUser(this.registerFormGroup.value).subscribe((user) => {
        console.log(user);

        // console.log(this.registerFormGroup.controls["password"].value);
        this.userService.login({
          username: user.username,
          password: this.registerFormGroup.controls["password"].value
        }).subscribe(res => {
          console.log({ registerLoginResponse: res })

          const decodedToken = this.jwtHelperService.decodeToken<JWTToken>(res.token)

          this.userService.getUser(decodedToken.user_id).subscribe(user => {
            this.userService.currentUser.next(user)
            console.log("finally set currentUser", { user })

            this.appService.showSnackBar('Registered successfully', 'Hide');

            this.router.navigate(["/bitmap"])
          })

        })

      }, (error) => {
        console.log(error);
        this.registerFormGroup.controls["password"].setValue("")
        this.registerFormGroup.controls["confirmPassword"].setValue("")
      })
    } else if (password === confirmPassword) {
      this.registerFormGroup.controls["confirmPassword"].setErrors({ 'mismatch': true });
    } else if (acceptTos === false) {
      this.appService.showSnackBar('You must accept the terms of service', 'Hide');
    }
  };

  firstnameErrorMessage() {
    return this.registerFormGroup.controls["first_name"].hasError('required') ? 'Firstname required' : '';
  }

  lastnameErrorMessage() {
    return this.registerFormGroup.controls["last_name"].hasError('required') ? 'Lastname required' : '';
  }

  passwordErrorMessage() {
    return this.registerFormGroup.controls["password"].hasError('required') ? 'Password required' :
      this.registerFormGroup.controls["password"].hasError('minlength') ? 'Password must be at least 6 characters long' :
        this.registerFormGroup.controls["password"].hasError('maxlength') ? 'Password must be at most 20 characters long' :
          this.registerFormGroup.controls["password"].hasError('passwordMismatch') ? 'Passwords do not match' : '';
  }

  passwordConfirmErrorMessage() {
    return this.registerFormGroup.controls["confirmPassword"].hasError('required') ? 'Password required' :
      this.registerFormGroup.controls["confirmPassword"].hasError('mismatch') ? 'Passwords do not match' : '';
  }

  acceptTosErrorMessage() {
    return this.registerFormGroup.controls["acceptTos"].hasError('required') ? 'You must accept the terms of service' : '';
  }


  userValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.userService.getAllUsers().pipe(map(users => {
        const currentUsername = this.registerFormGroup.controls['username'].value;
        const existingUser = users.find(user => user.username === currentUsername);
        return existingUser ? { userAlreadyExists: true } : null
      }))
    }
  }

  getUserErrorMessage() {
    if (this.registerFormGroup.controls["username"].hasError('userAlreadyExists')) {
      return 'Username already taken';
    }
    return this.registerFormGroup.controls["username"].hasError('required') ? 'Username required' : '';
  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.userService.getAllUsers().pipe(map(users => {
        const currentEmail = this.registerFormGroup.controls['email'].value;
        const existingEmail = users.find(user => user.email === currentEmail);
        return existingEmail ? { emailAlreadyExists: true } : null
      }))
    }
  }

  getEmailErrorMessage() {
    if (this.registerFormGroup.controls["email"].hasError('emailAlreadyExists')) {
      return 'Email already taken';
    }
    if (this.registerFormGroup.controls["email"].hasError('email')) {
      return 'You must enter a valid email';
    }
    if (this.registerFormGroup.controls["email"].hasError('pattern')) {
      return 'You must enter a valid email';
    }
    return this.registerFormGroup.controls["email"].hasError('required') ? 'Email required' : '';
  }


}
