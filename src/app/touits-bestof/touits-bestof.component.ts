import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomErrors } from 'src/shared/custom-errors';
import { Touit } from '../_models/Touit.model';
import { AlertService } from '../_services/alert.service';
import { TouitsService } from '../_services/touits.service';

@Component({
  selector: 'app-touits-bestof',
  templateUrl: './touits-bestof.component.html',
  styleUrls: ['./touits-bestof.component.scss']
})
export class TouitsBestofComponent implements OnInit, OnDestroy {

  bestTouits!: Touit[];
  subscription: Subscription = new Subscription();

  constructor(private touitsService: TouitsService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.touitsService.getBestTouits()
        .subscribe({
          next: touits => this.bestTouits = touits.top,
          error: response => this.alertService.error(CustomErrors.deduceMessageWithStatusCode(response.status))
        })
    )
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.alertService.clearAlerts();
  }
}
