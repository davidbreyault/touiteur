import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { UserLogin } from "../models/UserLogin.model";

@Injectable()
export class MockAuthenticationLauncherService {

  errorMode: boolean = false;

  authenticationSuccessResponse: UserLogin = {
    access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0ODY3MDc0OCwianRpIjoiYTM4OTQ4N2EtY2VlZC00M2MxLWFmMGYtMjhjZTM0NzFmNDZmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJuYW1lIjoiSmVhbkxvdWRvIiwiZXhwaXJhdGlvbiI6IjIwMjItMDMtMzAgMjI6NTk6NTUuOTg3MTIyIn0sIm5iZiI6MTY0ODY3MDc0OCwiZXhwIjoxNjQ4NjcxNjQ4fQ.wrY9JMlHSoxrQzKIGhNHBuwT9iBUEpcMUYegwC_xrkQ"
  };

  authenticationErrorResponse: HttpErrorResponse = new HttpErrorResponse({
    status: 404,
    statusText: "NOT FOUND"
  });

  loginRequestLauncher(): Observable<UserLogin> {
    return this.errorMode
      ? throwError(() => this.authenticationErrorResponse)
      : of(this.authenticationSuccessResponse);
  }
}