import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Category} from 'src/types';
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit {

  category?: Category

  @Input()
  id?: number

  @Input()
  cssClass?: string

  constructor(public categoryService: CategoryService) {

  }

  ngOnInit(): void {
    if (this?.id) {
      this.categoryService.getCategory(this.id).subscribe(category => {
        this.category = category;
      })
    }
  }

}
