import { Component, OnDestroy, OnInit } from '@angular/core';
import { TouitsService } from '../_services/touits.service';
import { Touit } from '../_models/Touit.model';
import { PageEvent } from '@angular/material/paginator';
import { interval, Observable, Subscription } from 'rxjs';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-touits-list',
  templateUrl: './touits-list.component.html',
  styleUrls: ['./touits-list.component.scss']
})
export class TouitsListComponent implements OnInit, OnDestroy {

  wheel!: boolean;
  touitsList!: Touit[];
  touitsListSliced!: Touit[];
  pageSize: number = 25;
  indexStart: number = 0;

  subscription!: Subscription;
  refreshInterval: Observable<number> = interval(1000);

  constructor(private touitsService: TouitsService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.wheel = true;
    this.subscription = this.refreshInterval
      .subscribe(() => {
          if (this.indexStart === 0) {
            this.getTouits();
          }
        }
      )
  }

  getTouits():void {
    this.touitsService.getAllTouits()
      .subscribe({
        next: response => {
          if (this.touitsService.getTs() === 0) {
            //console.log("TS A ZERO")
            this.touitsList = response.messages.reverse();
          } else {
            //console.log("TS SUPERIEUR A ZERO")
            const lastTouits = response.messages.filter(touit => touit.ts > this.touitsService.getTs());
            if (lastTouits.length > 0 && !this.touitsService.isMockService) {
              this.touitsList.unshift(...lastTouits);
            }
          }
          this.wheel = false;
          this.touitsService.setTs(response.ts);
          this.touitsListSliced = this.touitsList.slice(0, this.pageSize);
        },
        error: () => {
          this.wheel = false;
          this.subscription.unsubscribe();
          this.alertService.error("An error occurred, Touits not found !");
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
    this.touitsService.setTs(0);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}