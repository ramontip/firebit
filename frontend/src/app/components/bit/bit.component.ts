import {Component, Input, OnInit} from '@angular/core';
import {Bit, Bookmark, Like, User} from 'src/types';
import {UserService} from "../../services/user.service";
import {BitService} from "../../services/bit.service";
import {AppService} from "../../services/app.service";
import {LikeService} from "../../services/like.service";
import {BookmarkService} from "../../services/bookmark.service";

@Component({
  selector: 'app-bit',
  templateUrl: './bit.component.html',
  styleUrls: ['./bit.component.scss']
})
export class BitComponent implements OnInit {

  user?: User;

  commentsCount = 0;
  likes: Like[] = [];
  likedByAuthUser = false;
  bookmarks: Bookmark[] = [];
  bookmarkedByAuthUser = false;


  @Input()
  bit?: Bit

  constructor(private userService: UserService, private appService: AppService, private bitService: BitService, private likeService: LikeService, private bookmarkService: BookmarkService) {
  }

  ngOnInit(): void {
    // get user
    if (this.bit?.auth_user) {
      this.userService.getUser(this.bit.auth_user).subscribe(user => {
        this.user = user;
      })
    }

    // get comments
    this.bitService.getBitComments(this.bit?.id!).subscribe(comments => {
      this.commentsCount = comments.length
    })

    let auth_user = this.userService.currentUser.value!.id;

    // get likes and handle button style
    this.bitService.getBitLikes(this.bit?.id!).subscribe(likes => {
      this.likes = likes;
      this.likedByAuthUser = this.likes.find(like => like.auth_user == auth_user) != null;
    })

    // get bookmarks and handle button style
    this.bitService.getBitBookmarks(this.bit?.id!).subscribe(bookmarks => {
      this.bookmarks = bookmarks;
      this.bookmarkedByAuthUser = this.bookmarks.find(bookmarks => bookmarks.auth_user == auth_user) != null;
    })
  }

  createOrDeleteLike() {
    let auth_user = this.userService.currentUser.value!.id;

    let like = this.likes.find(like => like.auth_user == auth_user)

    // check if bit was already liked
    if (like != null) {
      this.likeService.deleteLike(like).subscribe(() => {
        this.appService.showSnackBar('Bit has been unliked!', 'Hide');
        this.likedByAuthUser = false;
      })
    } else {
      let like: Like = {
        bit: this.bit?.id,
        auth_user: auth_user
      }
      this.likeService.createLike(like).subscribe(() => {
        this.appService.showSnackBar('Bit has been liked!', 'Hide');
        this.likedByAuthUser = true;
      })
    }

    // TODO: refresh likes without refreshing route (issues with subscribe)
    // this.ngOnInit()
    this.appService.refreshRoute();
  }

  createOrDeleteBookmark() {
    let auth_user = this.userService.currentUser.value!.id;

    let bookmark = this.bookmarks.find(bookmark => bookmark.auth_user == auth_user)

    // check if bit was already bookmarked
    if (bookmark != null) {
      this.bookmarkService.deleteBookmark(bookmark).subscribe(() => {
        this.appService.showSnackBar('Bookmark has been removed!', 'Hide');
        this.bookmarkedByAuthUser = false;
      })
    } else {
      let bookmark: Bookmark = {
        bit: this.bit?.id,
        auth_user: auth_user
      }
      this.bookmarkService.createBookmark(bookmark).subscribe(() => {
        this.appService.showSnackBar('Bit has been bookmarked!', 'Hide');
        this.bookmarkedByAuthUser = true;
      })
    }

    // TODO: refresh bookmarks without refreshing route (issues with subscribe)
    // this.ngOnInit()
    this.appService.refreshRoute();
  }
}
