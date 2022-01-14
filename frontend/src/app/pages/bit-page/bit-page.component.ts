import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BitService} from 'src/app/services/bit.service';
import {Bit, Comment} from 'src/types';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../../services/comment.service";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-bit-page',
  templateUrl: './bit-page.component.html',
  styleUrls: ['./bit-page.component.scss']
})
export class BitPageComponent implements OnInit {

  bit?: Bit;
  comments: Comment[] = [];
  commentFormGroup: FormGroup;

  constructor(
    public route: ActivatedRoute,
    public bitService: BitService,
    public commentService: CommentService,
    private AppService: AppService
  ) {
    this.commentFormGroup = new FormGroup({
      content: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.params.id)
    console.log({id})

    this.bitService.getBit(id).subscribe(bit => {
      console.log({bit})
      this.bit = bit
    })

    this.bitService.getBitComments(id).subscribe(comments => {
      console.log({comments})
      this.comments = comments
    })
    console.log(this.comments)
  }

  createComment() {
    const comment = this.commentFormGroup.value;
    comment.bit = this.bit?.id
    this.commentService.createComment(this.commentFormGroup.value).subscribe(() => {
      this.AppService.refreshRoute();
      this.AppService.showSnackBar('Component created successfully!', 'hide');
    })
  }

  deleteComment(id: number) {
    if (confirm("Are you sure to delete this comment?")) {
      this.commentService.deleteComment(id).subscribe(() => {
        this.AppService.showSnackBar('Comment deleted successfully!', 'hide');
      })
    }
  }

}
