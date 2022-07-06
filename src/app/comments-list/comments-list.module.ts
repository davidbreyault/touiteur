import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AlertModule } from "../alert/alert.module";
import { CommentModule } from "../comment/comment.module";
import { TouitModule } from "../touit/touit.module";
import { CommentsListComponent } from "./comments-list.component";

@NgModule({
  declarations: [CommentsListComponent],
  imports: [
    CommonModule,
    TouitModule,
    CommentModule,
    AlertModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [CommentsListComponent]
})
export class CommentsListModule {}