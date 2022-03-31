import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api } from "src/environments/environment";
import { User } from "../models/User.model";
import { UserRegister } from "../models/UserRegister.model";

@Injectable()
export class RegistrationService {

  constructor(private http: HttpClient) {}

  registrationRequestLauncher(user: User): Observable<UserRegister> {
    const headers = {"Content-Type": "application/x-www-form-urlencoded"};
    const body = `username=${user.username}&password=${btoa(user.password)}`;
    return this.http.post<UserRegister>((api.rootUrl + api.registration), body, {headers: headers});
  }
}