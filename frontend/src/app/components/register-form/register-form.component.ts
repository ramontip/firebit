import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {AppService} from "../../services/app.service";
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
// import { JWTToken } from 'src/types';
import {emailValidator, matchValidator, userValidator} from 'src/app/validators/validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})

export class RegisterFormComponent implements OnInit {

  registerFormGroup: FormGroup
  hidePassword = true;

  constructor(
    private userService: UserService,
    private appService: AppService,
    private router: Router,
    private jwtHelperService: JwtHelperService,
  ) {
    this.registerFormGroup = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.minLength(4), Validators.pattern(appService.USERNAME_PATTERN)], [userValidator(userService)]),
      first_name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern(appService.NAME_PATTERN)]),
      last_name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern(appService.NAME_PATTERN)]),
      email: new FormControl("", [Validators.required, Validators.email, Validators.pattern(this.appService.EMAIL_PATTERN)], [emailValidator(userService)]),
      password: new FormControl("", [Validators.required, Validators.pattern(this.appService.PASSWORD_PATTERN)]),
      confirmPassword: new FormControl("", [Validators.required, matchValidator("password")]),
      acceptTos: new FormControl(false, Validators.requiredTrue)
    })
  }

  ngOnInit(): void {

  }

  registerUser() {

    if (this.registerFormGroup.invalid) {
      return
    }

    this.userService.registerUser(this.registerFormGroup.value).subscribe((user) => {
      // console.log(user);

      // console.log(this.registerFormGroup.controls["password"].value);
      this.userService.login({
        username: user.username,
        password: this.registerFormGroup.controls["password"].value
      })
        // .subscribe(res => {
        //   console.log({ registerLoginResponse: res })

        //   const decodedToken = this.jwtHelperService.decodeToken<JWTToken>(res.token)

        //   this.userService.getUser(decodedToken.user_id).subscribe(user => {
        //     this.userService.currentUser.next(user)
        //     console.log("finally set currentUser", { user })

        //     this.appService.showSnackBar('Registered successfully', 'Hide');

        //     this.router.navigate(["/bitmap"])
        //   })

        // })
        .subscribe(() => {
          this.appService.showSnackBar('Registered successfully', 'Hide');
          this.router.navigate(["/bitmap"])
        })

    }, () => {
      this.appService.showSnackBar("An error occured while registering", "Hide")
      // console.log(error);
      this.registerFormGroup.controls["password"].setValue("")
      this.registerFormGroup.controls["confirmPassword"].setValue("")
    })
  };

  updateConfirmPassword() {
    if (this.registerFormGroup.controls['confirmPassword'].value !== "")
      this.registerFormGroup.controls['confirmPassword'].updateValueAndValidity()
  }

  // Error messages

  firstnameErrorMessage() {
    const firstname = this.registerFormGroup.controls["first_name"]

    if (firstname.hasError('required'))
      return 'First name is required'

    if (firstname.hasError('minlength'))
      return 'Must be at least 2 Characters longs'

    if (firstname.hasError('pattern'))
      return 'May only contain letters'

    return ""
  }

  lastnameErrorMessage() {
    const lastname = this.registerFormGroup.controls["last_name"]

    if (lastname.hasError('required'))
      return 'First name is required'

    if (lastname.hasError('minlength'))
      return 'Must be at least 2 Characters longs'

    if (lastname.hasError('pattern'))
      return 'May only contain letters'

    return ""
  }

  passwordErrorMessage() {
    const password = this.registerFormGroup.controls["password"]
    if (password.hasError('required'))
      return 'Password required'

    if (password.hasError('minlength'))
      return 'Password must be at least 8 characters long'

    if (password.hasError('pattern'))
      return 'Must contain at least one lowercase, uppercase, special character and digit'

    return ""
  }

  passwordConfirmErrorMessage() {
    const confirmPassword = this.registerFormGroup.controls["confirmPassword"]

    if (confirmPassword.hasError('required'))
      return 'Password required'

    if (confirmPassword.hasError('match_password'))
      return "Must match password"

    return '';
  }

  acceptTosErrorMessage() {
    return this.registerFormGroup.controls["acceptTos"].hasError('required') ? 'You must accept the terms of service' : '';
  }

  usernameErrorMessage() {
    const username = this.registerFormGroup.controls["username"]

    if (username.hasError('required'))
      return 'Username is required'

    if (username.hasError('minlength'))
      return 'Must be at least 4 characters long'

    if (username.hasError('pattern'))
      return 'May only contain letters, digits and underline (_)'

    if (username.hasError('userAlreadyExists'))
      return 'Username already taken';

    return ''
  }

  emailErrorMessage() {
    const email = this.registerFormGroup.controls["email"]

    if (email.hasError('required'))
      return "Email is required"

    if (email.hasError('email') || email.hasError("pattern"))
      return 'You must enter a valid email';

    if (email.hasError('emailAlreadyExists'))
      return 'Email already taken';

    return ''
  }

}
