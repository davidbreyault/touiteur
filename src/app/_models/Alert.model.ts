export class Alert {
  id!: number;
  message!: string;
  type!: AlertType;
}

export enum AlertType {
  success,
  error
}