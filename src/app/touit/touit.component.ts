import { Component, Input, OnInit } from '@angular/core';
import { Touit } from '../models/Touit.model';
import { TouitsService } from '../services/touits.service';

@Component({
  selector: 'app-touit',
  templateUrl: './touit.component.html',
  styleUrls: ['./touit.component.scss']
})
export class TouitComponent {

  @Input() touit!: Touit;

  constructor(private touitService: TouitsService) { }

  like(id: number): void {
    this.touitService.likeTouit(id).subscribe(() => this.touit.likes++);
  }

  dislike(id: number): void {
    this.touitService.dislikeTouit(id).subscribe(() => this.touit.likes--);
  }
}
