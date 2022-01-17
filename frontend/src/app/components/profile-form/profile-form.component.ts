import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  profileFormGroup: FormGroup

  constructor(
    public userService: UserService
  ) {
    this.profileFormGroup = new FormGroup({
      first_name: new FormControl("", Validators.required),
      last_name: new FormControl(""),
      username: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      aboutme: new FormControl(""),
    })

  }

  ngOnInit(): void {

    const user = this.userService.currentUser.value
    console.log({profileForm: user})

    if (user) {
      this.profileFormGroup.patchValue(user)
    }
  }

  updateProfile() {
    console.log({submit: this.profileFormGroup.controls})

    let user = this.userService.currentUser.value

    if (!user) {
      console.error(`Could not update user, user is ${user}`)
      return
    }

    // TODO: Partial update on user -> "password is required" but not shown from API

  }

}
