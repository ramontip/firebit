import {Injectable} from '@angular/core';
import {Comment} from "../../types";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  createComment(comment: Comment) {
    // TODO: current logged in user
    comment.auth_user = 1;
    return this.http.post(`/api/comments/`, comment);
  }

  deleteComment(id: number) {
    return this.http.delete(`/api/comments/${id}/`);
  }
}
