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

  bit?: Bit

  comments: Comment[] = []

  constructor(
    public route: ActivatedRoute,
    public bitService: BitService,
  ) { }

  ngOnInit(): void {
    this.comments = this.bitService.getCommentsByBit();

    const id = parseInt(this.route.snapshot.params.id)

    console.log({ id })

    this.bitService.getBit(id).subscribe(bit => {
      console.log({ bit })
      this.bit = bit
    })
  }

}
