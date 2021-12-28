import { Component, OnInit } from '@angular/core';
import { Bit } from 'src/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bits: Bit[] = [
    { title: "Hello world", author: "Basti", content: "Lorem ipsum dolor sit amet" },
    { title: "Second title", author: "Chris", content: "some other content" },
    { title: "James Webb Telescope launch", author: "Ramon", content: "Third bit content" },
    { title: "New Matrix film", author: "David", content: "Aaaand another one" },
  ]

  constructor() { }

  ngOnInit(): void { }

}
