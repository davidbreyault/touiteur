import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Authentication } from "../models/Authentication.model";

@Injectable()
export class AuthenticationService {

  private authenticationData: Authentication = new Authentication(false);
  private authenticationDataSubject: Subject<Authentication> = new Subject<Authentication>();

  constructor() {}

  getAuthenticationData(): Authentication {
    return this.authenticationData;
  }

  getAuthenticationDataAsObservable(): Observable<Authentication> {
    return this.authenticationDataSubject.asObservable();
  }

  emitAuthenticationDataSubject(): void {
    this.authenticationDataSubject.next(this.authenticationData);
  }
}