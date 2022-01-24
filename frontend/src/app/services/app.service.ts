import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  baseUrl = '/api';

  // minLength part: (?=.{8,})
  readonly PASSWORD_PATTERN = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/
  readonly USERNAME_PATTERN = /^\w+$/ // \w -> [A-Za-z0-9_]
  readonly NAME_PATTERN = /^[A-ZÄÖÜÁÀÉÈÍÌÓÒÚÙa-zäöüäáàéèíìóòúùß]+$/
  readonly EMAIL_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

  readonly HASHTAG_PATTERN = /\s#([A-Za-z0-9]+)/g
  readonly USERTAG_PATTERN = /\s@([A-Za-z0-9_]+)/g

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
  }

  refreshRoute() {
    const currentRoute = this.router.url

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
    });
  }

  showSnackBar(message: string, action: string, duration: number = 3000) {
    // Add class to snackbar: panelClass: ["mat-toolbar"]
    this.snackBar.open(message, action, { duration: duration });
  }

  generateUniqueString(length: number): string {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  replaceTags(content: string) {
    const classes = "text-accent fw-medium"

    content = this.escapeHtml(content)
    content = content.replace(this.HASHTAG_PATTERN, ` <a class="${classes}" href="/hashtag/$1">#$1</a>`)
    content = content.replace(this.USERTAG_PATTERN, ` <a class="${classes}" href="/user/$1">@$1</a>`)
    return content
  }

  escapeHtml(content: string) {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
    // TODO: new line doesnt work
    // .replace(/\n/g, "<br>")
  }
}

