import {Injectable} from '@angular/core';
import {Bookmark} from "../../types";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private http: HttpClient, private userService: UserService) {
  }

  createBookmark(bookmark: Bookmark) {
    bookmark.auth_user = this.userService.currentUser.value!.id;
    return this.http.post(`/api/bookmarks/`, bookmark);
  }

  deleteBookmark(bookmark: Bookmark) {
    return this.http.delete(`/api/bookmarks/${bookmark.id}/`);
  }
}
