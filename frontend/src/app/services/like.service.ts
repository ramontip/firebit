import { Injectable } from '@angular/core';
import { Like } from "../../types";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";
import { AppService } from "./app.service";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient, private appService: AppService, private userService: UserService) {
  }

  createLike(like: Like) {
    like.auth_user = this.userService.currentUser.value!.id;
    return this.http.post<Like>(this.appService.baseUrl + `/likes/`, like);
  }

  deleteLike(like: Like) {
    return this.http.delete(this.appService.baseUrl + `/likes/${like.id}/`);
  }
}
