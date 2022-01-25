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

  likes: Like[] = [];
  likedByCurrentUser = false;
  createdByCurrentUser = false;
  bookmarks: Bookmark[] = [];
  bookmarkedByCurrentUser = false;
  contentFormatted?: String

  @Input()
  bit?: Bit

  constructor(public userService: UserService, public appService: AppService, private bitService: BitService, private likeService: LikeService, private bookmarkService: BookmarkService) {
  }

  ngOnInit(): void {
    // get current user
    let currentUser = this.userService.currentUser.value!;

    // check if created by currentUser
    if (this.bit?.auth_user === currentUser.id) {
      this.createdByCurrentUser = true;
    }

    // check if liked
    this.likes = this.bit?.likes ?? []
    this.likedByCurrentUser = this.likes?.find(like => like.auth_user == currentUser.id) != null;

    // check if bookmarked
    this.bookmarks = this.bit?.bookmarks ?? []
    this.bookmarkedByCurrentUser = this.likes?.find(bookmark => bookmark.auth_user == currentUser.id) != null;

    // manage hashtags and @

    // console.log({ content: this.bit?.content })

    this.contentFormatted = this.appService.replaceTags(this.bit?.content ?? "")

    // console.log({ formatted: this.contentFormatted })

    // const classes = "text-accent fw-medium"
    // this.contentFormatted = this.bit?.content.replace(this.appService.HASHTAG_PATTERN, ` <a class="${classes}" href="/hashtag/$1">#$1</a>`)
    // this.contentFormatted = this.contentFormatted?.replace(this.appService.USERTAG_PATTERN, ` <a class="${classes}" href="/user/$1">@$1</a>`)

  }

  createOrDeleteLike() {
    let auth_user = this.userService.currentUser.value!.id;

    let like = this.likes?.find(like => like.auth_user == auth_user)

    // check if bit was already liked
    if (like) {
      this.likeService.deleteLike(like).subscribe(() => {
        this.appService.showSnackBar('Bit has been unliked!', 'Hide');
        this.likedByCurrentUser = false;
        this.likes = this.likes.filter(l => l.id !== like?.id)
      })
    } else {
      like = {
        bit: this.bit?.id,
        auth_user: auth_user
      }

      this.likeService.createLike(like).subscribe(l => {
        this.appService.showSnackBar('Bit has been liked!', 'Hide');
        this.likedByCurrentUser = true;
        this.likes.push(l)
      })
    }
  }

  createOrDeleteBookmark() {
    let auth_user = this.userService.currentUser.value!.id;

    let bookmark = this.bookmarks.find(bookmark => bookmark.auth_user == auth_user)

    // check if bit was already bookmarked
    if (bookmark) {
      this.bookmarkService.deleteBookmark(bookmark).subscribe(() => {
        this.appService.showSnackBar('Bookmark has been removed!', 'Hide');
        this.bookmarkedByCurrentUser = false;
        this.bookmarks = this.bookmarks.filter(b => b.id !== bookmark?.id)
      })
    } else {
      bookmark = {
        bit: this.bit?.id,
        auth_user: auth_user
      }
      this.bookmarkService.createBookmark(bookmark).subscribe(b => {
        this.appService.showSnackBar('Bit has been bookmarked!', 'Hide');
        this.bookmarkedByCurrentUser = true;
        this.bookmarks.push(b)
      })
    }
  }
}
