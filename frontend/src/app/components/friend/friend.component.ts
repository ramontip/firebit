import { Component, Input, OnInit } from '@angular/core';
import { Friendship } from 'src/types';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  @Input()
  friendship?: Friendship

  constructor() { }

  ngOnInit(): void { }

}
