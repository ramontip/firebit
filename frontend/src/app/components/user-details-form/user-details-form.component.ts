import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../services/app.service";
import { UserDetails } from "../../../types";
import { UserService } from "../../services/user.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.scss']
})
export class UserDetailsFormComponent implements OnInit {

  userDetails?: UserDetails;
  userDetailsFormGroup: FormGroup;
  file?: File;
  imageField = '';

  constructor(public userService: UserService, private http: HttpClient, private router: Router, private route: ActivatedRoute, private appService: AppService) {
    this.userDetailsFormGroup = new FormGroup({
      about: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      if (user?.userdetails) {
        this.userDetails = user.userdetails;
        this.userDetailsFormGroup.setValue({ about: user.userdetails.about });
      }
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.imageField = this.file?.name + ' added';
  }

  createOrUpdateUserDetails() {
    const formData = new FormData();
    formData.append('auth_user', this.userService.currentUser.value!.id.toString());
    formData.append('about', this.userDetailsFormGroup.value.about);

    if (this.file) {
      const uniqueFileName = 'user-' + this.userService.currentUser.value?.id + '-' + this.appService.generateUniqueString(16) + '.' + this.file.name.split('.').pop();
      formData.append('file', this.file, uniqueFileName);
    }

    if (this.userDetails) {
      console.log(formData.get('file'))
      this.userService.updateUserDetails(this.userDetails.auth_user!, formData).subscribe(details => {
        console.log("Details updated");
        console.log({ details });

        this.appService.showSnackBar("Profile updated successfully", "Hide")

        this.userDetailsFormGroup.controls["about"].setValue(details.about)

        // this.appService.refreshRoute()
      })
    } else {
      this.userService.createUserDetails(formData).subscribe(details => {
        console.log("Details created", { details });
        this.appService.showSnackBar("Details created successfully", "Hide")

        this.userDetailsFormGroup.controls["about"].setValue(details.about)

        // TODO: Update profile image in top toolbar without refresh?
        this.appService.refreshRoute()
      })
    }
    // this.goToProfile();
  }

  deleteThumbnail() {
    if (this.userDetails?.file) {
      const formData = new FormData();
      formData.append('auth_user', this.userService.currentUser.value!.id.toString());
      formData.append('about', this.userDetailsFormGroup.value.about);
      formData.append('file', '');
      this.userService.updateUserDetails(this.userDetails.auth_user!, formData).subscribe(() => {
        console.log("Thumbnail deleted");
        this.appService.showSnackBar("Profile image deleted successfully", "Hide")
        this.appService.refreshRoute()
        // this.goToProfile();
      })
    }
  }

  goToProfile() {
    this.appService.showSnackBar('Your profile was updated successfully.', 'Hide');
    // TODO: Refresh not working properly
    this.router.navigate(['/profile']);
  }

}
