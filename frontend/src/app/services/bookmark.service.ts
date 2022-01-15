import {Injectable} from '@angular/core';
import {Bookmark} from "../../types";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private http: HttpClient) {
  }

  createBookmark(bookmark: Bookmark) {
    // TODO: current logged in user
    bookmark.auth_user = 1;
    return this.http.post(`/api/bookmarks/`, bookmark);
  }

  deleteBookmark(bookmark: Bookmark) {
    return this.http.delete(`/api/bookmarks/${bookmark.id}/`);
  }
}
