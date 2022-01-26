import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Category} from 'src/types';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit {

  @Input()
  category?: Category

  @Input()
  cssClass?: string

  constructor() {

  }

  ngOnInit(): void {
  }

}
