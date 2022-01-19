import {Injectable} from '@angular/core';
import {Bit, Bookmark, Comment, Image, Like} from 'src/types';
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class BitService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {

  }

  getBits() {
    return this.http.get<Bit[]>(`/api/bits/?order_by=-created_at`);
  }

  getBit(id: number) {
    return this.http.get<Bit>(`/api/bits/${id}/`);
  }

  createBit(bit: Bit) {
    bit.auth_user = this.userService.currentUser.value!.id;
    return this.http.post(`/api/bits/`, bit);
  }

  updateBit(bit: Bit) {
    bit.auth_user = this.userService.currentUser.value!.id;
    return this.http.put(`/api/bits/${bit.id}/`, bit);
  }

  deleteBit(bit: Bit) {
    return this.http.delete(`/api/bits/${bit.id}/`);
  }

  getBitsByUser(username: string) {
    return this.http.get<Bit[]>(`/api/bits/?auth_user=${username}`)
  }

  getBitComments(id: number) {
    return this.http.get<Comment[]>(`/api/bits/${id}/comments/?order_by=-created_at`);
  }

  getBitsByCategory(title: string) {
    return this.http.get<Bit[]>(`/api/bits/?category=${title}&order_by=-created_at`)
  }

  getBitsByHashtag(hashtag: string) {
    return this.http.get<Bit[]>(`/api/bits/?hashtag=${hashtag}&order_by=-created_at`)
  }

  getBitLikes(id: number) {
    return this.http.get<Like[]>(`/api/bits/${id}/likes/`);
  }

  getBitBookmarks(id: number) {
    return this.http.get<Bookmark[]>(`/api/bits/${id}/bookmarks/`);
  }

  // Image

  createImage(image: Image) {
    return this.http.post(`/api/images/`, image);
  }

  // From current user

  getLikedBits() {
    // /bits/?liked_by=2
    return this.http.get<Bit[]>(`/api/users/${this.userService.currentUser.value?.id ?? -1}/liked_bits/?order_by=-created_at`)
  }

  getCommentedBits() {
    return this.http.get<Bit[]>(`/api/users/${this.userService.currentUser.value?.id ?? -1}/commented_bits/?order_by=-created_at`)
  }

  getBookmarkedBits() {
    return this.http.get<Bit[]>(`/api/users/${this.userService.currentUser.value?.id ?? -1}/bookmarks/?order_by=-created_at`)
  }

}
