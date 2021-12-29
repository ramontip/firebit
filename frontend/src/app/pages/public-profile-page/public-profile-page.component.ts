import { Component, OnInit } from '@angular/core';
import { Bit, User } from 'src/types';

@Component({
  selector: 'app-public-profile-page',
  templateUrl: './public-profile-page.component.html',
  styleUrls: ['./public-profile-page.component.scss']
})
export class PublicProfilePageComponent implements OnInit {

  user: User = { name: "Jane Doe", username: "jane", aboutme: "Lorem ipsum dolor sit amet doctetur" }

  bits: Bit[] = [
    { title: "Hello world", author: "Basti", content: "Lorem ipsum dolor sit amet" },
    { title: "Second title", author: "Chris", content: "some other content" },
    { title: "James Webb Telescope launch", author: "Ramon", content: "Third bit content" },
    { title: "New Matrix film", author: "David", content: "Aaaand another one" },
  ]

  isFriend = false

  constructor() { }

  ngOnInit(): void { }

}
