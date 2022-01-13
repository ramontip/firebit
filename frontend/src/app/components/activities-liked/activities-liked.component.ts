import { Component, OnInit } from '@angular/core';
import { BitService } from 'src/app/services/bit.service';
import { Bit } from 'src/types';

@Component({
  selector: 'app-activities-liked',
  templateUrl: './activities-liked.component.html',
  styleUrls: ['./activities-liked.component.scss']
})
export class ActivitiesLikedComponent implements OnInit {

  likedBits: Bit[] = []

  constructor(
    public bitService: BitService,
  ) { }

  ngOnInit(): void {
    this.bitService.getBits().subscribe(bits => this.likedBits = bits.filter((b, i) => i % 2 === 0))
  }

}
