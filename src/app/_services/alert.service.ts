import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Alert, AlertType } from "../_models/Alert.model";

@Injectable()
export class AlertService {

  private alerts: Alert[] = [];
  private isPrintedOnAppComponent: boolean = true;
  alertSubject = new Subject<Alert[]>();
  isPrintedOnAppComponentSubject = new Subject<boolean>();

  addAlert(message: string, type: AlertType) {
    const alert = new Alert();
    alert.id = this.alerts.length === 0 ? 1 : this.alerts[this.alerts.length - 1].id + 1;
    alert.message = message;
    alert.type = type;
    this.alerts.push(alert);
    setTimeout(() => this.removeAlert(alert), 4500);
    this.emitAlertSubject();
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(a => a !== alert);
    this.emitAlertSubject();
  }

  clearAlerts(): void {
    this.alerts = [];
    this.emitAlertSubject();
  }

  success(message: string): void {
    this.addAlert(message, AlertType.success);
  }

  error(message: string): void {
    this.addAlert(message, AlertType.error);
  }

  toggleAppComponentAlertVisibility(): void {
    this.isPrintedOnAppComponent = !this.isPrintedOnAppComponent;
    this.emitIsPrintedOnAppComponentSubject();
  }

  emitAlertSubject(): void {
    this.alertSubject.next(this.alerts);
  }

  emitIsPrintedOnAppComponentSubject(): void {
    this.isPrintedOnAppComponentSubject.next(this.isPrintedOnAppComponent);
  }
 }