import {Injectable} from '@angular/core';
import {Comment} from "../../types";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {AppService} from "./app.service";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private appService: AppService, private userService: UserService) {
  }

  createComment(comment: Comment) {
    comment.auth_user = this.userService.currentUser.value?.id!;
    return this.http.post(this.appService.baseUrl + `/comments/`, comment);
  }

  deleteComment(id: number) {
    return this.http.delete(this.appService.baseUrl + `/comments/${id}/`);
  }
}
