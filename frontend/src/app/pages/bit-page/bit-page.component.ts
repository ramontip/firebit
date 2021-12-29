import { Component, Input, OnInit } from '@angular/core';
import { Bit, Comment } from 'src/types';

@Component({
  selector: 'app-bit-page',
  templateUrl: './bit-page.component.html',
  styleUrls: ['./bit-page.component.scss']
})
export class BitPageComponent implements OnInit {

  @Input()
  public bit: Bit | null = { title: "Hello world", author: "Basti", content: "Lorem ipsum dolor sit amet" }

  @Input()
  public comments: Comment[] = [
    { author: "Ramon", content: "Super sinnvoller Kommentar" },
    { author: "Chris", content: "Lorem ipsum dolor sit amet" },
    { author: "David", content: "Keine Ahnung was da noch hin soll als Text" },
  ]

  constructor() { }

  ngOnInit(): void { }

}
