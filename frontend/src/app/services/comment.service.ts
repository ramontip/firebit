import {Injectable} from '@angular/core';
import {Comment} from "../../types";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private userService: UserService) {
  }

  createComment(comment: Comment) {
    comment.auth_user = this.userService.currentUser.value!.id;
    return this.http.post(`/api/comments/`, comment);
  }

  deleteComment(id: number) {
    return this.http.delete(`/api/comments/${id}/`);
  }
}
