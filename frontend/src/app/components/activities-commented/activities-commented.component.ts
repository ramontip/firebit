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

  async ngOnInit() {
    this.commentedBits = await this.bitService.getCommentedBits().toPromise()
  }

}
