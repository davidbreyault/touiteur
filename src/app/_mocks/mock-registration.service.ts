import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { UserRegister } from "../_models/UserRegister.model";

@Injectable()
export class MockRegistrationService {

  errorMode: boolean = false;

  registrationSuccessResponse: UserRegister = {
    expiration: "2022-05-31 14:28:58.568392",
    success: true,
    username: "John_Doe"
  };

  registrationErrorResponse: HttpErrorResponse = new HttpErrorResponse({
    error: {
      error: "Username is already taken !"
    },
    status: 400,
    statusText: "Not Found"
  });

  registrationRequestLauncher(): Observable<UserRegister> {
    return this.errorMode 
      ? throwError(() => this.registrationErrorResponse)
      : of(this.registrationSuccessResponse);
  }
}