import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BitService } from 'src/app/services/bit.service';
import { UserService } from 'src/app/services/user.service';
import { Bit } from 'src/types';

@Component({
  selector: 'app-bit-edit',
  templateUrl: './bit-edit.component.html',
  styleUrls: ['./bit-edit.component.scss']
})
export class BitEditComponent implements OnInit {

  bit?: Bit

  constructor(
    public bitService: BitService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bitService.getBit(this.route.snapshot.params.id).subscribe(
      bit => {
        this.userService.currentUser.subscribe(currentUser => {
          if (bit.user_details?.id !== currentUser?.id) {
            this.router.navigate(["**"], { skipLocationChange: true })
            return
          }

          this.bit = bit
        })
      },
      err => {
        console.log({ err })
        this.router.navigate(["**"], { skipLocationChange: true })
      }
    )
  }

}
