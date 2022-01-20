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
      first_name: new FormControl("", Validators.required),
      last_name: new FormControl(""),
      username: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
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


    console.log(user)

    if (!user) {
      return console.error(`Could not update user, user is ${user}`)
    } else {
      this.userService.updateUser(user)
    }


    // TODO: Partial update on user -> "password is required" but not shown from API


  }

}
