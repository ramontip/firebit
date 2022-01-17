import {Component, Input, OnInit} from '@angular/core';
import {Comment, User} from 'src/types';
import {UserService} from "../../services/user.service";
import {CommentService} from "../../services/comment.service";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-bit-comment',
  templateUrl: './bit-comment.component.html',
  styleUrls: ['./bit-comment.component.scss']
})
export class BitCommentComponent implements OnInit {

  user?: User

  @Input()
  comment?: Comment

  constructor(private userService: UserService, private commentService: CommentService, private appService: AppService) {
  }

  ngOnInit(): void {
    if (this.comment?.auth_user) {
      this.userService.getUser(this.comment.auth_user).subscribe(user => {
        this.user = user;
      })
    }
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
