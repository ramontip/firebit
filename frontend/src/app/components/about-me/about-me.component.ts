import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/types';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  @Input()
  public user: User | null = null

  constructor() { }

  ngOnInit(): void { }

}
