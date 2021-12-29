import { Injectable } from '@angular/core';
import { Category } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(): Category[] {
    return [
      { name: "Movies" },
      { name: "Travelling" },
      { name: "Food" },
      { name: "Games" },
    ]
  }

  getCategory(name: string): Category | undefined {
    return this.getCategories().find(c => c.name.toLowerCase() === name.toLowerCase())
  }

}
