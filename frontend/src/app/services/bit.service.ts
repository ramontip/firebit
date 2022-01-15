import { Injectable } from '@angular/core';
import { Bit, Comment } from 'src/types';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BitService {

  constructor(private http: HttpClient) {
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

  // From current user

  getLikedBits() {
    // /bits/?liked_by=2
    return this.http.get<Bit[]>(`/api/users/2/liked_bits/`)
  }

  getCommentedBits() {
    return this.http.get<Bit[]>(`/api/users/1/commented_bits/`)
  }

  getBookmarkedBits() {
    return this.http.get<Bit[]>(`/api/users/2/bookmarks/`)
  }

}
