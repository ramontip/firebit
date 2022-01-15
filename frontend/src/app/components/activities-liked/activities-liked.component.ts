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

  async ngOnInit() {
    // TODO: Does this really work? xD
    this.likedBits = await this.bitService.getLikedBits().toPromise()
  }

}
