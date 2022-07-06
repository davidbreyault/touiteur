import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Comment, CommentsList } from '../_models/Comment';
import { CommentPost } from '../_models/CommentPost.model';
import { Touit } from '../_models/Touit.model';
import { AlertService } from '../_services/alert.service';
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
    private commentsService: CommentsService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.createCommentForm();
    this.loadTouitComments();
    this.commentsDialogRef.afterClosed()
      .subscribe(() => this.alertService.toggleAppComponentAlertVisibility());
  }

  loadTouitComments(): void {
    this.subscription.add(
      this.commentsService.getTouitComments(this.data.touit.id)
        .subscribe({
          next: (data: CommentsList) => this.comments = data.comments,
          error: () => this.alertService.error("Une erreur est survenue. Impossible de charger les commentaires.")
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
    if (this.commentForm?.valid) {
      this.subscription.add(
        this.commentsService.postTouitComment(comment)
          .subscribe({
            next: () => {
              this.loadTouitComments();
              this.alertService.success("Votre commentaire a bien été envoyé !");
            },
            error: () => this.alertService.error("Une erreur est survenue. Impossible de publier votre commentaire.")
          })
      )
    }
  }

  isCommentFormValid(): boolean {
    return this.commentForm?.valid;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
