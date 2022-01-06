import {Injectable} from '@angular/core';
import {Bit, Comment} from 'src/types';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BitService {

  constructor(private http: HttpClient) { }

  // Just for testing purposes
  getBits() {
    return this.http.get<Bit[]>(`/api/bit/`);
  }

  getBitsByUser(): Bit[] {
    return [];
  }

  getBitById(id: number): Bit | null {
    return null;
  }

  getCommentsByBit(): Comment[] {
    return [];
  }

}
