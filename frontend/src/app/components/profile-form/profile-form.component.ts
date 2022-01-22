import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/services/app.service';

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
  ) {
    this.profileFormGroup = new FormGroup({
      first_name: new FormControl(""),
      last_name: new FormControl(""),
      username: new FormControl(""),
      email: new FormControl("", Validators.email),
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
    console.log({ submit: this.profileFormGroup.value })

    const user = this.userService.currentUser.value

    if (!user) {
      return console.error(`Could not update user, user is ${user}`)
    } else {
      // user.first_name = this.profileFormGroup.controls.first_name.value
      // user.last_name = this.profileFormGroup.controls.last_name.value
      // user.username = this.profileFormGroup.controls.username.value
      // user.email = this.profileFormGroup.controls.email.value

      this.userService.updateUser(user.id, this.profileFormGroup.value).subscribe(
        user => {
          this.profileFormGroup.patchValue(user)
          this.appService.showSnackBar("User updated successfully", "Hide")
        },
        err => { console.log({ err }) }
      )
    }

  }

}
