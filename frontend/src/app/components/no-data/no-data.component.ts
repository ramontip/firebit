import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent implements OnInit {

  @Input()
  title = ""

  @Input()
  message = ""

  @Input()
  image = ""

  constructor() { }

  ngOnInit(): void { }

}
