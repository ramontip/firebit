import { Injectable } from '@angular/core';
import { Category } from 'src/types';
import { HttpClient } from "@angular/common/http";

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

  getCategory(id: number) {
    return this.http.get<Category>(`/api/categories/${id}/`);
  }

  // TODO: Clean up the type or what is coming from the API
  getCategoryByTitle(title: string) {
    return this.http.get<Category[]>(`/api/categories/?title=${title}`)
  }

  // temporary tweak
  getCategoryTitles(bitCategories: number[]) {
    return this.availableCategories.filter(category => bitCategories.includes(category.id)).map(category => category.title).join(', ');
  }

}
