import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BitService } from 'src/app/services/bit.service';
import { Bit } from 'src/types';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bits?: Bit[]

  // Masonry options for bitmap
  masonryOptions: NgxMasonryOptions = {
    itemSelector: ".masonry-item",
    columnWidth: ".masonry-item",
    gutter: ".masonry-gutter",
    percentPosition: true,
    // I feel like ordered = true and horizontalOrder dont go well together
    // horizontalOrder: true,
  }

  constructor(
    private http: HttpClient,
    public bitService: BitService,
  ) { }

  ngOnInit(): void {
    this.bitService.getBits().subscribe(bits => {
      this.bits = bits
    })
  }

}
