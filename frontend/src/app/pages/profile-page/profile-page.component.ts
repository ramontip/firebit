import { Component, OnInit } from '@angular/core';
import { Bit, User } from 'src/types';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  user: User = { name: "Jane Doe", username: "jane", aboutme: "Lorem ipsum dolor sit amet doctetur" }

  bits: Bit[] = [
    { title: "Hello world", author: "Basti", content: "Lorem ipsum dolor sit amet" },
    { title: "Second title", author: "Chris", content: "some other content" },
    { title: "James Webb Telescope launch", author: "Ramon", content: "Third bit content" },
    { title: "New Matrix film", author: "David", content: "Aaaand another one" },
  ]

  constructor() { }

  ngOnInit(): void { }

}
