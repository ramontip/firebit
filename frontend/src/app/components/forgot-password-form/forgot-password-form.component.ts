import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {AppService} from "../../services/app.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss'],
  providers: [UserService]
})
export class ForgotPasswordFormComponent implements OnInit {

  resetPasswordFormGroup: FormGroup
  token: string | null = null;


  constructor(private userService: UserService, private appService: AppService, private route: ActivatedRoute) {
    this.resetPasswordFormGroup = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    })
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }


  resetPassword() {
    this.userService.resetUserPassword(this.resetPasswordFormGroup.controls["email"].value).subscribe(
      (data) => {
        this.appService.showSnackBar("Password reset email sent", "Hide")
      },
      (error) => {
        console.log(error)
      }
    )

  }

  getEmailErrorMessage() {
    if (this.resetPasswordFormGroup.controls["email"].hasError('email')) {
      return 'You must enter a valid email';
    }
    if (this.resetPasswordFormGroup.controls["email"].hasError('pattern')) {
      return 'You must enter a valid email';
    }
    return this.resetPasswordFormGroup.controls["email"].hasError('required') ? 'Email required' : '';
  }

}
