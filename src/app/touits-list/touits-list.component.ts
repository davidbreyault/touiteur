import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TouitsService } from '../_services/touits.service';
import { Touit } from '../_models/Touit.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-touits-list',
  templateUrl: './touits-list.component.html',
  styleUrls: ['./touits-list.component.scss']
})
export class TouitsListComponent implements OnInit {

  wheel!: boolean;
  touitsList!: Touit[];
  touitsListSliced!: Touit[];
  touitsError!: string;

  constructor(private touitsService: TouitsService) { }

  ngOnInit(): void {
    this.wheel = true;
    this.touitsService.getAllTouits()
      .subscribe({
        next: response => {
          this.touitsList = response.messages.reverse();
          this.touitsListSliced = this.touitsList.slice(0, 25);
        },
        error: response => {
          this.wheel = false;
          this.touitsError = response.status + " " + response.statusText + ". Une erreur est survenue.";
        },
        complete: () => this.wheel = false
      })
  }

  onPageChange(event: PageEvent) {
    //console.log(event);
    let indexStart = event.pageIndex * event.pageSize;
    let indexEnd = indexStart + event.pageSize;
    this.touitsListSliced = this.touitsList.slice(indexStart, indexEnd);
  }
}