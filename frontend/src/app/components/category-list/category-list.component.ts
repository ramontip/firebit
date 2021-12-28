import { Component, OnInit } from '@angular/core';
import { Category } from 'src/types';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  public categories: Category[] = [
    { name: "Movies" },
    { name: "Travelling" },
    { name: "Food" },
    { name: "Games" },
  ]

  constructor() { }

  ngOnInit(): void { }

}
