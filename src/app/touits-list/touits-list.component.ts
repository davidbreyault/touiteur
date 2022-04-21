import { Component, Input, OnInit } from '@angular/core';
import { Touit } from '../models/Touit.model';
import { TouitsService } from '../services/touits.service';

@Component({
  selector: 'app-touits-list',
  templateUrl: './touits-list.component.html',
  styleUrls: ['./touits-list.component.scss']
})
export class TouitsListComponent implements OnInit {

  wheel!: boolean;
  touitsList!: Touit[];
  touitsError!: string;

  constructor(private touitsService: TouitsService) { }

  ngOnInit(): void {
    this.wheel = true;
    this.touitsService.getAllTouits()
      .subscribe({
        next: response => {
          this.touitsList = response.messages.reverse();
          //console.log(this.touitsList)
        },
        error: response => {
          this.wheel = false;
          this.touitsError = response.status + " " + response.statusText + ". Une erreur est survenue.";
        },
        complete: () => this.wheel = false
      })
  }
}