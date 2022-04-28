import { Component, OnDestroy, OnInit } from '@angular/core';
import { TouitsService } from '../_services/touits.service';
import { Touit } from '../_models/Touit.model';
import { PageEvent } from '@angular/material/paginator';
import { last } from 'rxjs';

@Component({
  selector: 'app-touits-list',
  templateUrl: './touits-list.component.html',
  styleUrls: ['./touits-list.component.scss']
})
export class TouitsListComponent implements OnInit, OnDestroy {

  wheel!: boolean;
  touitsList!: Touit[];
  touitsListSliced!: Touit[];
  touitsError!: string;
  pageSize: number = 25;
  indexStart: number = 0;

  refreshInterval!: any;

  constructor(private touitsService: TouitsService) { }

  ngOnInit(): void {
    this.wheel = true;
    this.refreshInterval = setInterval(() => {
      if (this.indexStart === 0) {
        this.getTouits();
      }
    }, 1000);
  }

  getTouits():void {
    this.touitsService.getAllTouits()
      .subscribe({
        next: response => {
          if (this.touitsService.getTs() === 0) {
            console.log("TS A ZERO")
            this.touitsList = response.messages.reverse();
          } else {
            console.log("TS SUPERIEUR A ZERO")
            const lastTouits = response.messages.filter(touit => touit.ts > this.touitsService.getTs());
            if (lastTouits.length > 0) {
              this.touitsList.unshift(...lastTouits);
            }
          }
          this.wheel = false;
          this.touitsService.setTs(response.ts);
          this.touitsListSliced = this.touitsList.slice(0, this.pageSize);
        },
        error: response => {
          this.wheel = false;
          this.touitsError = response.status + " " + response.statusText + ". Une erreur est survenue.";
        }
      })
  }

  onPageChange(event: PageEvent) {
    let indexStart = event.pageIndex * event.pageSize;
    let indexEnd = indexStart + event.pageSize;
    this.indexStart = indexStart;
    this.pageSize = event.pageSize;
    this.touitsListSliced = this.touitsList.slice(indexStart, indexEnd);
  }

  ngOnDestroy(): void {
    clearInterval(this.refreshInterval);
    this.touitsService.setTs(0);
  }
}