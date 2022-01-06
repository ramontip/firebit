import { Injectable } from '@angular/core';
import { Bit, Comment } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class BitService {

  constructor() { }

  getBitsByUser(): Bit[] {
    return [
      { title: "Hello world", author: "Basti", content: "Lorem ipsum dolor sit amet" },
      { title: "Second title", author: "Chris", content: "some other content" },
      { title: "James Webb Telescope launch", author: "Ramon", content: "Third bit content" },
      { title: "New Matrix film", author: "David", content: "Aaaand another one" },
    ]
  }

  getBitById(id: number): Bit {
    return [
      { title: "Hello world", author: "Basti", content: "Lorem ipsum dolor sit amet" },
      { title: "Second title", author: "Chris", content: "some other content" },
      { title: "James Webb Telescope launch", author: "Ramon", content: "Third bit content" },
      { title: "New Matrix film", author: "David", content: "Aaaand another one" },
    ][id - 1]
  }

  getCommentsByBit(): Comment[] {
    return [
      { author: "Ramon", content: "Super sinnvoller Kommentar" },
      { author: "Chris", content: "Lorem ipsum dolor sit amet" },
      { author: "David", content: "Keine Ahnung was da noch hin soll als Text" },
    ]
  }

}
