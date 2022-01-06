import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BitService } from 'src/app/services/bit.service';
import { Bit, Comment } from 'src/types';

@Component({
  selector: 'app-bit-page',
  templateUrl: './bit-page.component.html',
  styleUrls: ['./bit-page.component.scss']
})
export class BitPageComponent implements OnInit {

  bit: any;

  comments: Comment[]

  constructor(
    public route: ActivatedRoute,
    public bitService: BitService,
  ) {
    this.comments = bitService.getCommentsByBit()
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.params.id)
    this.bitService.getBit(id).subscribe(bit => {
      this.bit = bit
    })
  }

}
