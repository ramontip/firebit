import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import {User} from "../../../types";
import { HttpClient } from "@angular/common/http";

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
      first_name: new FormControl(""),
      last_name: new FormControl(""),
      username: new FormControl(""),
      email: new FormControl("",  Validators.email),
      aboutme: new FormControl(""),
    })

  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      if (user)
        this.profileFormGroup.patchValue(user)
    })
  }

  updateProfile() {
    console.log({ submit: this.profileFormGroup.controls })

    let user = this.userService.currentUser.value

    if (!user) {
      return console.error(`Could not update user, user is ${user}`)
    } else {
      user.first_name = this.profileFormGroup.controls.first_name.value
      user.last_name = this.profileFormGroup.controls.last_name.value
      user.username = this.profileFormGroup.controls.username.value
      user.email = this.profileFormGroup.controls.email.value
      console.log(user)

      this.userService.updateUser(user)
    }

  }

}
