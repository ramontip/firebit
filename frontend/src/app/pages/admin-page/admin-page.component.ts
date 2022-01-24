import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BitService } from 'src/app/services/bit.service';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { Bit, Comment, User } from 'src/types';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  users: User[] = []
  bits: Bit[] = []
  comments: Comment[] = []

  userColumns = ["id", "username", "first_name", "last_name", "email", "is_superuser", "is_staff"]

  constructor(
    private router: Router,
    private userService: UserService,
    private bitService: BitService,
    private commentService: CommentService,
  ) { }

  // TODO: Add authentication only for admins!

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      // Redirect to error, because adminGuard is not working (too late updated)
      console.log({ adminPage: users })

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
    })

  }

}
