import { Component, OnInit } from '@angular/core';
import { MatCheckboxDefaultOptions, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { AppService } from 'src/app/services/app.service';
import { BitService } from 'src/app/services/bit.service';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { Bit, Comment, Stat, User } from 'src/types';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  providers: [
    // By default, do nothing when clicking on checkboxes, only do what is specified in click event
    { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions }
  ]
})
export class AdminPageComponent implements OnInit {

  currentUser?: User

  users: User[] = []
  bits: Bit[] = []
  comments: Comment[] = []

  userColumns = ["id", "username", "first_name", "last_name", "email", "is_superuser", "is_staff", "profile", "delete"]
  bitColumns = ["id", "user", "title", "content", "hashtags", "created_at", "view", "delete"]
  commentColumns = ["id", "bit", "user", "content", "created_at", "view", "delete"]

  stats: Stat[] = [
    { description: a => `${a} total user${a !== 1 ? "s" : ""}`, amount: 0, icon: "people" },
    { description: a => `${a} total bit${a !== 1 ? "s" : ""}`, amount: 0, icon: "article" },
    { description: a => `${a} total comment${a !== 1 ? "s" : ""}`, amount: 0, icon: "forum" },
    // { description: a => `${a} like${a !== 1 ? "s" : ""}`, amount: 0, icon: "local_fire_department" },
    // { description: a => `${a} bookmark${a !== 1 ? "s" : ""}`, amount: 0, icon: "bookmark" },
  ]

  constructor(
    public userService: UserService,
    private bitService: BitService,
    private commentService: CommentService,
    private appService: AppService,
  ) {
  }

  // TODO: Add authentication only for admins!

  ngOnInit(): void {

    this.userService.currentUser.subscribe(user => {
      if (user)
        this.currentUser = user
    })

    this.userService.getAllUsers().subscribe(users => {
      this.users = users
      this.stats[0].amount = users.length
    })

    this.bitService.getBits({ all: true }).subscribe(bits => {
      this.bits = bits
      this.stats[1].amount = bits.length
    })

    this.commentService.getComments().subscribe(comments => {
      this.comments = comments
      this.stats[2].amount = comments.length
    })

  }

  updateStaffStatus(user: User) {

    if (!this.currentUser?.is_superuser) {
      return
    }

    this.userService.updateUser(user.id, { is_staff: !user.is_staff }).subscribe(user => {
      this.users = this.users.map(u => u.id === user.id ? user : u)

      const message = user.is_staff ? `Promoted ${user.username} to staff member` : `Removed ${user.username} from staff`
      this.appService.showSnackBar(message, "Hide")
    },
      err => {
        // console.log({ err })
        this.appService.showSnackBar("Could not update user", "Hide")
      }
    )
  }

  deleteUser(user: User) {
    if ((user.id === this.currentUser?.id) || // dont delete self
      (!this.currentUser?.is_superuser && (user.is_staff || user.is_superuser)) || // only delete staff if admin
      !confirm(`Do you really want to delete user '${user.username}'?`)) {
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
    if (!confirm(`Do you really want to delete bit ${bit.id} and all its comments?`)) {
      return
    }

    this.bitService.deleteBit(bit).subscribe(() => {
      this.bits = this.bits.filter(b => b.id !== bit.id)
      this.comments = this.comments.filter(c => c.bit !== bit.id)
      this.appService.showSnackBar("Bit deleted sucessfully", "Hide")
    }, () => {
      // console.log({err})
      this.appService.showSnackBar("Could not delete bit", "Hide")
    })

  }

  deleteComment(comment: Comment) {
    if (!confirm(`Do you really want to delete comment ${comment.id}?`)) {
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
