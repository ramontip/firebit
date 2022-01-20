import {Injectable} from '@angular/core';
import {Bit, Bookmark, Comment, Like} from 'src/types';
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {AppService} from "./app.service";

@Injectable({
  providedIn: 'root'
})
export class BitService {

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private userService: UserService
  ) {

  }

  // Bit

  getBits() {
    return this.http.get<Bit[]>(this.appService.baseUrl + `/bits/?order_by=-created_at`);
  }

  getBit(id: number) {
    return this.http.get<Bit>(this.appService.baseUrl + `/bits/${id}/`);
  }

  createBit(bit: Bit) {
    bit.auth_user = this.userService.currentUser.value!.id;
    return this.http.post(this.appService.baseUrl + `/bits/`, bit);
  }

  updateBit(bit: Bit) {
    bit.auth_user = this.userService.currentUser.value!.id;
    return this.http.put(this.appService.baseUrl + `/bits/${bit.id}/`, bit);
  }

  deleteBit(bit: Bit) {
    return this.http.delete(this.appService.baseUrl + `/bits/${bit.id}/`);
  }

  getBitsByUser(username: string) {
    return this.http.get<Bit[]>(this.appService.baseUrl + `/bits/?auth_user=${username}`)
  }

  getBitComments(id: number) {
    return this.http.get<Comment[]>(this.appService.baseUrl + `/bits/${id}/comments/?order_by=-created_at`);
  }

  getBitsByCategory(title: string) {
    return this.http.get<Bit[]>(this.appService.baseUrl + `/bits/?category=${title}&order_by=-created_at`)
  }

  getBitsByHashtag(hashtag: string) {
    return this.http.get<Bit[]>(this.appService.baseUrl + `/bits/?hashtag=${hashtag}&order_by=-created_at`)
  }

  getBitLikes(id: number) {
    return this.http.get<Like[]>(this.appService.baseUrl + `/bits/${id}/likes/`);
  }

  getBitBookmarks(id: number) {
    return this.http.get<Bookmark[]>(this.appService.baseUrl + `/bits/${id}/bookmarks/`);
  }

  // Bit Image

  createImage(formData: any) {
    return this.http.post(this.appService.baseUrl + `/images/`, formData);
  }

  deleteImage(imageId: number) {
    return this.http.delete(this.appService.baseUrl + `/images/${imageId}/`);
  }

  // From current user

  getLikedBits() {
    // /bits/?liked_by=2
    return this.http.get<Bit[]>(this.appService.baseUrl + `/users/${this.userService.currentUser.value?.id ?? -1}/liked_bits/?order_by=-created_at`)
  }

  getCommentedBits() {
    return this.http.get<Bit[]>(this.appService.baseUrl + `/users/${this.userService.currentUser.value?.id ?? -1}/commented_bits/?order_by=-created_at`)
  }

  getBookmarkedBits() {
    return this.http.get<Bit[]>(this.appService.baseUrl + `/users/${this.userService.currentUser.value?.id ?? -1}/bookmarks/?order_by=-created_at`)
  }

}
