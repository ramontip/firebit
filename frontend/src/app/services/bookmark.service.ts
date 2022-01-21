import {Injectable} from '@angular/core';
import {Bookmark} from "../../types";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {AppService} from "./app.service";

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private http: HttpClient, private appService: AppService, private userService: UserService) {
  }

  createBookmark(bookmark: Bookmark) {
    bookmark.auth_user = this.userService.currentUser.value!.id;
    return this.http.post(this.appService.baseUrl + `/bookmarks/`, bookmark);
  }

  deleteBookmark(bookmark: Bookmark) {
    return this.http.delete(this.appService.baseUrl + `/bookmarks/${bookmark.id}/`);
  }
}
