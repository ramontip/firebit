import { Component, OnInit } from '@angular/core';
import { BitService } from 'src/app/services/bit.service';
import { Bit } from 'src/types';

@Component({
  selector: 'app-bookmarks-page',
  templateUrl: './bookmarks-page.component.html',
  styleUrls: ['./bookmarks-page.component.scss']
})
export class BookmarksPageComponent implements OnInit {

  bookmarkedBits: Bit[] = []

  constructor(
    public bitService: BitService,
  ) {
    this.bitService.getBookmarkedBits().subscribe(bits => {
      this.bookmarkedBits = bits
    })
  }

  ngOnInit(): void {

  }

}
