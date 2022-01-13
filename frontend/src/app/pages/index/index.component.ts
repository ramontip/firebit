import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  navigationVisible = false;

  path = ""

  constructor(
    public activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.path = this.activeRoute.snapshot.url[0].path
  }

}
