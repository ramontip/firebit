import { Injectable } from '@angular/core';
import { User } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  user: User = { name: "Jane Doe", username: "jane", aboutme: "Lorem ipsum dolor sit amet doctetur" }

}
