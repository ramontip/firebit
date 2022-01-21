import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BitService } from 'src/app/services/bit.service';
import { Bit } from 'src/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bits?: Bit[]

  constructor(
    private http: HttpClient,
    public bitService: BitService,
  ) { }

  ngOnInit(): void {
    this.bitService.getBits().subscribe(bits => {
      this.bits = bits
    })
  }

}
