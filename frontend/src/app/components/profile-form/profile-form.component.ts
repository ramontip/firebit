import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { emailValidator, userValidator } from 'src/app/validators/validators';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  profileFormGroup: FormGroup

  constructor(
    public userService: UserService,
    private appService: AppService,
    private router: Router,
  ) {
    this.profileFormGroup = new FormGroup({
      first_name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern(appService.NAME_PATTERN)]),
      last_name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern(appService.NAME_PATTERN)]),
      username: new FormControl("", [Validators.required, Validators.minLength(4), Validators.pattern(appService.USERNAME_PATTERN)], [userValidator(userService)]),
      email: new FormControl("", [Validators.required, Validators.email, Validators.pattern(appService.EMAIL_PATTERN)], [emailValidator(userService)]),
    })

  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      if (user)
        this.profileFormGroup.patchValue(user)
    })
  }

  updateProfile() {
    console.log({ submit: this.profileFormGroup.value })

    const user = this.userService.currentUser.value

    if (this.profileFormGroup.invalid) {
      return
    }

    if (!user) {
      return console.error(`Could not update profile, user is ${user}`)
    } else {

      this.userService.updateUser(user.id, this.profileFormGroup.value).subscribe(
        user => {
          this.profileFormGroup.patchValue(user)
          this.appService.showSnackBar("Profile updated successfully", "Hide")
          this.router.navigate(["/profile"])
        },
        err => { console.log({ err }) }
      )
    }

  }

  // Error messages

  firstnameErrorMessage() {
    const firstname = this.profileFormGroup.controls["first_name"]

    if (firstname.hasError('required'))
      return 'First name is required'

    if (firstname.hasError('pattern'))
      return 'May only contain letters'

    if (firstname.hasError('minlength'))
      return 'Must be at least 2 Characters longs'

    return ""
  }

  lastnameErrorMessage() {
    const lastname = this.profileFormGroup.controls["last_name"]

    if (lastname.hasError('required'))
      return 'First name is required'

    if (lastname.hasError('pattern'))
      return 'May only contain letters'

    if (lastname.hasError('minlength'))
      return 'Must be at least 2 Characters longs'

    return ""
  }

  usernameErrorMessage() {
    const username = this.profileFormGroup.controls["username"]

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
    const email = this.profileFormGroup.controls["email"]

    if (email.hasError('required'))
      return "Email is required"

    if (email.hasError('email') || email.hasError("pattern"))
      return 'You must enter a valid email';

    if (email.hasError('emailAlreadyExists'))
      return 'Email already taken';

    return ''
  }

}
