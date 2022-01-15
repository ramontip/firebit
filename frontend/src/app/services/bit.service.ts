import {Injectable} from '@angular/core';
import {Bit, Bookmark, Comment, Like} from 'src/types';
import {HttpClient} from "@angular/common/http";

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

  getBitsByUser(): Bit[] {
    return [];
  }

  getBitComments(id: number) {
    return this.http.get<Comment[]>(`/api/bits/${id}/comments/`);
  }

  getBitLikes(id: number) {
    return this.http.get<Like[]>(`/api/bits/${id}/likes/`);
  }

  getBitBookmarks(id: number) {
    return this.http.get<Bookmark[]>(`/api/bits/${id}/bookmarks/`);
  }
}
