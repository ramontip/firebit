import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BitService } from 'src/app/services/bit.service';
import { UserService } from 'src/app/services/user.service';
import { Bit } from 'src/types';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  bits: Bit[] = []

  isFriend = false

  constructor(
    public userService: UserService,
    public bitService: BitService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    const username: string = this.route.snapshot.params.username

    this.bitService.getBitsByUser(username).subscribe(bits => {
      this.bits = bits
    })

  }

}
