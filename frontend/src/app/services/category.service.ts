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

}
