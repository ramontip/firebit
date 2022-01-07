import { Injectable } from '@angular/core';
import {Bit, Category} from 'src/types';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  availableCategories: Category[] = []

  constructor(private http: HttpClient) {
    this.getCategories().subscribe(categories => this.availableCategories = categories);
  }

  getCategories() {
    return this.http.get<Category[]>('/api/categories/');
  }

  getCategory(id:number) {
    return this.http.get<Category>(`/api/categories/${id}/`);
  }

  // temporary tweak
  getCategoryTitles(bitCategories: number[]) {
    return this.availableCategories.filter(category => bitCategories.includes(category.id)).map(category => category.title).join(', ');
  }

}
