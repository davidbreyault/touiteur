import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api } from "src/environments/environment";
import { User } from "../_models/User.model";
import { UserRegister } from "../_models/UserRegister.model";

@Injectable()
export class RegistrationService {

  constructor(private http: HttpClient) {}

  registrationRequestLauncher(user: User): Observable<UserRegister> {
    const body = `username=${user.username}&password=${btoa(user.password)}`;
    return this.http.post<UserRegister>((api.rootUrl + api.registration), body);
  }
}