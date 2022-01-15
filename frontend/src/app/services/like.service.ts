import {Injectable} from '@angular/core';
import {Like} from "../../types";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) {
  }

  createLike(like: Like) {
    // TODO: current logged in user
    like.auth_user = 1;
    return this.http.post(`/api/likes/`, like);
  }

  deleteLike(like: Like) {
    return this.http.delete(`/api/likes/${like.id}/`);
  }
}
