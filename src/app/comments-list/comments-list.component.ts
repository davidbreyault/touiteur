import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Comment, CommentsList } from '../_models/Comment';
import { CommentPost } from '../_models/CommentPost.model';
import { Touit } from '../_models/Touit.model';
import { AuthenticationService } from '../_services/authentication.service';
import { CommentsService } from '../_services/comments.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit, OnDestroy {

  comments: Comment[] = [];
  commentForm!: FormGroup;
  subscription: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {touit: Touit, isInTouitComments: boolean},
    private commentsDialogRef: MatDialogRef<CommentsListComponent>,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private commentsService: CommentsService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.createCommentForm();
    this.subscription.add(
      this.commentsService.getTouitComments(this.data.touit.id)
        .subscribe({
          next: (data: CommentsList) => this.comments = data.comments
        })
    );
  }

  createCommentForm(): void {
    this.commentForm = this.formBuilder.group({
      comment: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(256)]]
    })
  }

  onCloseDialogComments(): void {
    this.commentsDialogRef.close();
  }

  onSubmitCommentForm(): void {
    const comment = new CommentPost();
    comment.touitId = this.data.touit.id;
    comment.username = this.authenticationService.getAuthenticationData().username!;
    comment.commentMessage = this.commentForm.value["comment"];
    console.log(comment);

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
