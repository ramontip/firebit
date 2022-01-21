import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  bits: Bit[] = []

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public categoryService: CategoryService,
    public bitService: BitService,
  ) { }

  async ngOnInit() {

    const categoryTitle: string = this.route.snapshot.params.name

    const cat = await this.categoryService.getCategoryByTitle(categoryTitle).toPromise()

    if (!cat) {
      this.router.navigate(["**"], { skipLocationChange: true })
    }

    this.category = cat

    this.bits = await this.bitService.getBitsByCategory(categoryTitle).toPromise()

    // this.categoryService.getCategoryByTitle(categoryTitle ?? "").subscribe(cat => {
    //   // TODO: Clean this up
    //   this.category = cat

    //   // if (!this.category)
    //   //   alert("Error no category")
    // })

    // this.bitService.getBitsByCategory(categoryTitle).subscribe(bits => {
    //   this.bits = bits
    // })

  }

}
