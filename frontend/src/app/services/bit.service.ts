import {Injectable} from '@angular/core';
import {Bit, Comment} from 'src/types';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BitService {

  constructor(private http: HttpClient) { }

  // List all Bits just for testing purposes
  getBits() {
    return this.http.get<Bit[]>(`/api/bit/`);
  }

  getBit(id:number) {
    return this.http.get<Bit>(`/api/bit/${id}/`);
  }

  createBit(bit:Bit) {
    // current user
    bit.auth_user = 1;
    return this.http.post(`/api/bit/`, bit);
  }

  updateBit(bit:Bit) {
    bit.auth_user = 1;
    return this.http.put(`/api/bit/${bit.id}/`, bit);
  }

  deleteBit(bit:Bit) {
    return this.http.delete(`/api/bit/${bit.id}/`);
  }

  getBitsByUser(): Bit[] {
    return [];
  }

  getCommentsByBit(): Comment[] {
    return [];
  }
}
