import { Component, Input, OnInit } from '@angular/core';
import { TouitsService } from '../_services/touits.service';
import { Touit } from '../_models/Touit.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-touit',
  templateUrl: './touit.component.html',
  styleUrls: ['./touit.component.scss']
})
export class TouitComponent {

  @Input() touit!: Touit;
  @Input() isTouitCommentsChild: boolean = false;

  constructor(private touitService: TouitsService, private commentsDialog: MatDialog, private alertService: AlertService) { }

  onLike(id: number): void {
    this.touitService.likeTouit(id).subscribe(() => this.touit.likes++);
  }

  onDislike(id: number): void {
    this.touitService.dislikeTouit(id).subscribe(() => this.touit.likes--);
  }

  openComments(): void {
    console.log("COMMENTS ON TOUIT N°" + this.touit.id);
  }

  onOpenCommentsDialog(): void {
    const matCommentsDialogConfig: MatDialogConfig = {
      width: "800px",
      minHeight: "max-content",
      maxHeight: "650px",
      panelClass: "comments-dialog-container",
      data: {
        touit: this.touit,
        isInTouitComments: true
      }
    }
    this.commentsDialog.open(CommentsListComponent, matCommentsDialogConfig);
    this.alertService.toggleAppComponentAlertVisibility();
  }
}
