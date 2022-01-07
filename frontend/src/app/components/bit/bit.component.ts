import { Component, Input, OnInit } from '@angular/core';
import { Bit } from 'src/types';
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-bit',
  templateUrl: './bit.component.html',
  styleUrls: ['./bit.component.scss']
})
export class BitComponent implements OnInit {

  @Input()
  bit?: any

  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void { }

}
