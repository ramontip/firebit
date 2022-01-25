import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BitService} from 'src/app/services/bit.service';
import {Bit} from 'src/types';

@Component({
  selector: 'app-bit-edit',
  templateUrl: './bit-edit.component.html',
  styleUrls: ['./bit-edit.component.scss']
})
export class BitEditComponent implements OnInit {

  bit?: Bit

  constructor(
    public bitService: BitService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.bitService.getBit(this.route.snapshot.params.id).subscribe(
      bit => this.bit = bit,
      () => {
        // console.log({ err })
        this.router.navigate(["**"], {skipLocationChange: true})
      }
    )
  }

}
