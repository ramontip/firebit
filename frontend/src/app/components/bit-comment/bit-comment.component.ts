import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/types';

@Component({
  selector: 'app-bit-comment',
  templateUrl: './bit-comment.component.html',
  styleUrls: ['./bit-comment.component.scss']
})
export class BitCommentComponent implements OnInit {

  @Input()
  public comment: Comment | null = null

  constructor() { }

  ngOnInit(): void { }

}
