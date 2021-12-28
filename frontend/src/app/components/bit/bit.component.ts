import { Component, Input, OnInit } from '@angular/core';
import { Bit } from 'src/types';

@Component({
  selector: 'app-bit',
  templateUrl: './bit.component.html',
  styleUrls: ['./bit.component.scss']
})
export class BitComponent implements OnInit {


  @Input()
  public bit: Bit | null = null // { title: "Hello world", author: "Xeeija", content: "Lorem ipsum dolor sit amet and some other content" }

  constructor() { }

  ngOnInit(): void { }

}
