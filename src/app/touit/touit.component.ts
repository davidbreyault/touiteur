import { Component, Input, OnInit } from '@angular/core';
import { TouitsService } from '../_services/touits.service';
import { Touit } from '../_models/Touit.model';

@Component({
  selector: 'app-touit',
  templateUrl: './touit.component.html',
  styleUrls: ['./touit.component.scss']
})
export class TouitComponent {

  @Input() touit!: Touit;

  constructor(private touitService: TouitsService) { }

  onLike(id: number): void {
    this.touitService.likeTouit(id).subscribe(() => this.touit.likes++);
  }

  onDislike(id: number): void {
    this.touitService.dislikeTouit(id).subscribe(() => this.touit.likes--);
  }
}
