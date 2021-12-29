import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { BitService } from 'src/app/services/bit.service';
import { Bit, Category } from 'src/types';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

  category?: Category

  bits: Bit[]

  constructor(
    public route: ActivatedRoute,
    public categoryService: CategoryService,
    public bitService: BitService,
  ) {

    const name: string = this.route.snapshot.params.name
    this.category = categoryService.getCategory(name)

    this.bits = bitService.getBitsByUser()
  }

  ngOnInit(): void { }

}
