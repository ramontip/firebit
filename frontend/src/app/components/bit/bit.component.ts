import { Component, Input, OnInit } from '@angular/core';
import { Bit } from 'src/types';

@Component({
  selector: 'app-bit',
  templateUrl: './bit.component.html',
  styleUrls: ['./bit.component.scss']
})
export class BitComponent implements OnInit {


  @Input()
  bit: Bit | null = null

  constructor() { }

  ngOnInit(): void { }

}
