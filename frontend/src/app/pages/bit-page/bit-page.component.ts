import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BitService} from 'src/app/services/bit.service';
import {Bit, Comment} from 'src/types';
import {FormControl, FormGroup} from "@angular/forms";
import {CommentService} from "../../services/comment.service";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-bit-page',
  templateUrl: './bit-page.component.html',
  styleUrls: ['./bit-page.component.scss']
})
export class BitPageComponent implements OnInit {

  bit?: Bit;
  commentFormGroup: FormGroup;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public bitService: BitService,
    public commentService: CommentService,
    private appService: AppService
  ) {
    this.commentFormGroup = new FormGroup({
      content: new FormControl(''),
    })
  }

  ngOnInit(): void {

    const id = parseInt(this.route.snapshot.params.id)
    // console.log({id})

    this.bitService.getBit(id).subscribe(
      bit => {
        // console.log({bit})
        this.bit = bit
      },
      err => {
        this.router.navigate(["**"], {skipLocationChange: true})
      }
    )
  }

  createComment() {
    const comment: Comment = this.commentFormGroup.value;
    // this.commentFormGroup.controls['content'].value

    if (!comment) {
      return
    }

    comment.bit = this.bit?.id

    this.commentService.createComment(this.commentFormGroup.value).subscribe(() => {
      this.appService.showSnackBar('Comment created successfully!', 'Hide');
      this.appService.refreshRoute();
    })
  }

}
