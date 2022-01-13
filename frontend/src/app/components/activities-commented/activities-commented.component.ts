import { Component, OnInit } from '@angular/core';
import { BitService } from 'src/app/services/bit.service';
import { Bit } from 'src/types';

@Component({
  selector: 'app-activities-commented',
  templateUrl: './activities-commented.component.html',
  styleUrls: ['./activities-commented.component.scss']
})
export class ActivitiesCommentedComponent implements OnInit {

  commentedBits: Bit[] = []

  constructor(
    public bitService: BitService,
  ) { }

  ngOnInit(): void {
    this.bitService.getBits().subscribe(bits => this.commentedBits = bits.filter((b, i) => i % 2 !== 0))
  }

}
