import {Component, OnInit} from '@angular/core';
import {MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions} from '@angular/material/checkbox';
import {Router} from '@angular/router';
import {AppService} from 'src/app/services/app.service';
import {BitService} from 'src/app/services/bit.service';
import {CommentService} from 'src/app/services/comment.service';
import {UserService} from 'src/app/services/user.service';
import {Bit, Comment, User} from 'src/types';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  providers: [
    // By default, do nothing when clicking on checkboxes, only do what is specified in click event
    {provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: {clickAction: 'noop'} as MatCheckboxDefaultOptions}
  ]
})
export class AdminPageComponent implements OnInit {

  users: User[] = []
  bits: Bit[] = []
  comments: Comment[] = []

  userColumns = ["id", "username", "first_name", "last_name", "email", "is_superuser", "is_staff", "profile", "delete"]
  bitColumns = ["id", "user", "title", "content", "hashtags", "created_at", "view", "delete"]
  commentColumns = ["id", "bit", "user", "content", "created_at", "view", "delete"]

  constructor(
    private router: Router,
    private userService: UserService,
    private bitService: BitService,
    private commentService: CommentService,
    private appService: AppService,
  ) {
  }

  // TODO: Add authentication only for admins!

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      // Redirect to error, because adminGuard is not working (too late updated)
      // console.log({ adminPage: users })

      this.users = users

      // if (!user?.is_staff || !user?.is_superuser) {
      //   this.router.navigate(["**"], { skipLocationChange: true })
      // }

    })

    this.bitService.getBits().subscribe(bits => {
      this.bits = bits
    })

    this.commentService.getComments().subscribe(comments => {
      this.comments = comments
      // console.log({ comments })
    })

  }

  deleteUser(user: User) {
    if (!confirm(`Do you really want to delete user '${user.username}'?`)) {
      return
    }

    this.userService.deleteUser(user).subscribe(() => {
      this.users = this.users.filter(u => u.id !== user.id)
      this.appService.showSnackBar("User deleted sucessfully", "Hide")
    }, () => {
      // console.log({ err })
      this.appService.showSnackBar("Could not delete user", "Hide")
    })

  }

  deleteBit(bit: Bit) {
    if (!confirm(`Do you really want to delete bit ${bit.id}?`)) {
      return
    }

    this.bitService.deleteBit(bit).subscribe(() => {
      this.bits = this.bits.filter(b => b.id !== bit.id)
      this.appService.showSnackBar("Bit deleted sucessfully", "Hide")
    }, () => {
      // console.log({err})
      this.appService.showSnackBar("Could not delete bit", "Hide")
    })

  }

  deleteComment(comment: Comment) {
    if (!confirm(`Do you really want to delete bit ${comment.id}?`)) {
      return
    }

    this.commentService.deleteComment(comment.id!).subscribe(() => {
      this.comments = this.comments.filter(c => c.id !== comment.id)
      this.appService.showSnackBar("Comment deleted sucessfully", "Hide")
    }, () => {
      // console.log({err})
      this.appService.showSnackBar("Could not delete comment", "Hide")
    })

  }

}
