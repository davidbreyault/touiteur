import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../_models/Comment';
import { Touit } from '../_models/Touit.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment!: Comment;
  @Input() touit!: Touit;

  constructor() { }

  ngOnInit(): void {
  }

}
