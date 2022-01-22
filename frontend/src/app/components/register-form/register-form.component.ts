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
  hide = true;

  constructor(private userService: UserService, private appService: AppService, private fb: FormBuilder) {
    this.registerFormGroup = new FormGroup({
      username: new FormControl("", Validators.required, [this.userValidator()]),
      first_name: new FormControl("", Validators.required),
      last_name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")], [this.emailValidator()]),
      password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      confirmPassword: new FormControl("", Validators.required),
      acceptTos: new FormControl(false, Validators.requiredTrue)
    })
  }

  ngOnInit(): void {

  }

  registerUser() {
    if (this.registerFormGroup.controls["password"].value === this.registerFormGroup.controls["confirmPassword"].value && this.registerFormGroup.controls["acceptTos"].value === true) {
      this.userService.registerUser(this.registerFormGroup.value).subscribe((user: any) => {
        this.appService.showSnackBar('Registered successfully', 'Hide', 3000);
        console.log(user);
        console.log(this.registerFormGroup.controls["password"].value);
        this.userService.login({username: user.username, password: this.registerFormGroup.controls["password"].value})
      }, (error) => {
        console.log(error);
      })
    } else if (this.registerFormGroup.controls["password"].value !== this.registerFormGroup.controls["confirmPassword"].value) {
      this.registerFormGroup.controls["confirmPassword"].setErrors({'mismatch': true});
    } else if (this.registerFormGroup.controls["acceptTos"].value === false) {
      this.appService.showSnackBar('You must accept the terms of service', 'Hide', 3000);
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
        return existingUser ? {userAlreadyExists: true} : null
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
        return existingEmail ? {emailAlreadyExists: true} : null
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
