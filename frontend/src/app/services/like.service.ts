import {Injectable} from '@angular/core';
import {Like} from "../../types";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient, private userService: UserService) {
  }

  createLike(like: Like) {
    like.auth_user = this.userService.currentUser.value!.id;
    return this.http.post(`/api/likes/`, like);
  }

  deleteLike(like: Like) {
    return this.http.delete(`/api/likes/${like.id}/`);
  }
}
