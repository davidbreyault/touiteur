import { Component, OnDestroy, OnInit } from '@angular/core';
import { Alert, AlertType } from '../_models/Alert.model';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  alerts: Alert[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.alertSubject
      .subscribe(alerts => {
        this.alerts = alerts;
      })
  }

  removeAlert(alert: Alert): void {
    this.alertService.removeAlert(alert);
  }

  setStyleClasses(alert: Alert): string {
    const classes = ["notification"];
    const alertTypeClasses = {
      [AlertType.success]: "notification__success",
      [AlertType.error]: "notification__error"
    }
    classes.push(alertTypeClasses[alert.type]);
    return classes.join(" ");
  }

  setStyleButton(alert: Alert): string {
    const alertTypeClasses = {
      [AlertType.success]: "success",
      [AlertType.error]: "error"
    }
    return alertTypeClasses[alert.type];
  }

  ngOnDestroy(): void {
    this.alertService.clearAlerts();
  }
}
