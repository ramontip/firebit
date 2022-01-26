import {Component, OnInit} from '@angular/core';
import {Bit} from "../../../types";
import {ActivatedRoute} from "@angular/router";
import {BitService} from "../../services/bit.service";

@Component({
  selector: 'app-hashtag-page',
  templateUrl: './hashtag-page.component.html',
  styleUrls: ['./hashtag-page.component.scss']
})
export class HashtagPageComponent implements OnInit {

  hashtag?: String

  bits: Bit[] = []

  constructor(
    public route: ActivatedRoute,
    public bitService: BitService,
  ) {
  }

  async ngOnInit() {
    const hashtag: string = this.route.snapshot.params.hashtag
    this.hashtag = hashtag

    this.bits = await this.bitService.getBitsByHashtag(hashtag).toPromise()
  }

}
