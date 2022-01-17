import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
  }

  refreshRoute() {
    const currentRoute = this.router.url

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
    });
  }

  showSnackBar(message: string, action: string, duration: number = 3000) {
    // Add class to snackbar: panelClass: ["mat-toolbar"]
    this.snackBar.open(message, action, {duration: duration});
  }
}
