import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/types';

type Action = "none" | "edit" | "friend"

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  @Input()
  user: User | null = null

  @Input()
  action: Action = "none"

  @Input()
  isFriend = false

  constructor() { }

  ngOnInit(): void { }

}
