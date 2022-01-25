import {Component, Input, OnInit} from '@angular/core';
import {Comment} from 'src/types';
import {UserService} from "../../services/user.service";
import {CommentService} from "../../services/comment.service";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-bit-comment',
  templateUrl: './bit-comment.component.html',
  styleUrls: ['./bit-comment.component.scss']
})
export class BitCommentComponent implements OnInit {

  @Input()
  comment?: Comment

  constructor(
    public userService: UserService,
    private commentService: CommentService,
    private appService: AppService) {
  }

  ngOnInit(): void {
  }

  deleteComment(id: number) {
    if (confirm("Are you sure to delete this comment?")) {
      this.commentService.deleteComment(id).subscribe(() => {
        this.appService.showSnackBar('Comment deleted successfully!', 'Hide');
      })
    }
    this.appService.refreshRoute();
  }

}
