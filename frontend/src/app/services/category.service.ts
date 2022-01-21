import {Injectable} from '@angular/core';
import {Category} from 'src/types';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators"
import {AppService} from "./app.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  availableCategories: Category[] = []

  constructor(private http: HttpClient, private appService: AppService,) {
    this.getCategories().subscribe(categories => this.availableCategories = categories);
  }

  getCategories() {
    return this.http.get<Category[]>(this.appService.baseUrl + `/categories/`);
  }

  getCategory(id: number) {
    return this.http.get<Category>(this.appService.baseUrl + `/categories/${id}/`);
  }

  // TODO: Clean up the type or what is coming from the API
  getCategoryByTitle(title: string) {
    return this.http.get<Category[]>(this.appService.baseUrl + `/categories/?title=${title}`).pipe(
      map(categories => categories.length ? categories[0] : undefined)
    )
  }

  // temporary tweak
  getCategoryTitles(bitCategories: number[]) {
    return this.availableCategories.filter(category => bitCategories.includes(category.id)).map(category => category.title).join(', ');
  }

}
