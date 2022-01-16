import { Injectable } from '@angular/core';
import { Bit, Bookmark, Comment, Like } from 'src/types';
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";

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
    return this.http.get<Bit[]>(`/api/bits/`);
  }

  getBit(id: number) {
    return this.http.get<Bit>(`/api/bits/${id}/`);
  }

  createBit(bit: Bit) {
    // TODO: current logged in user
    bit.auth_user = 1;
    return this.http.post(`/api/bits/`, bit);
  }

  updateBit(bit: Bit) {
    // TODO: current logged in user
    bit.auth_user = 1;
    return this.http.put(`/api/bits/${bit.id}/`, bit);
  }

  deleteBit(bit: Bit) {
    return this.http.delete(`/api/bits/${bit.id}/`);
  }

  getBitsByUser(username: string) {
    return this.http.get<Bit[]>(`/api/bits/?auth_user=${username}`)
  }

  getBitComments(id: number) {
    return this.http.get<Comment[]>(`/api/bits/${id}/comments/`);
  }

  getBitsByCategory(title: string) {
    return this.http.get<Bit[]>(`/api/bits/?category=${title}`)
  }

  getBitLikes(id: number) {
    return this.http.get<Like[]>(`/api/bits/${id}/likes/`);
  }

  getBitBookmarks(id: number) {
    return this.http.get<Bookmark[]>(`/api/bits/${id}/bookmarks/`);
  }

  // From current user

  getLikedBits() {
    // /bits/?liked_by=2
    return this.http.get<Bit[]>(`/api/users/${this.userService.user.value?.id ?? -1}/liked_bits/`)
  }

  getCommentedBits() {
    return this.http.get<Bit[]>(`/api/users/${this.userService.user.value?.id ?? -1}/commented_bits/`)
  }

  getBookmarkedBits() {
    return this.http.get<Bit[]>(`/api/users/${this.userService.user.value?.id ?? -1}/bookmarks/`)
  }

}
