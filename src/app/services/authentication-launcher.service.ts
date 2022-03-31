import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api } from "src/environments/environment";
import { User } from "../models/User.model";
import { UserLogin } from "../models/UserLogin.model";

@Injectable()
export class AuthenticationLauncherService {

  constructor(private http: HttpClient) {}

  loginRequestLauncher(user: User): Observable<UserLogin> {
    const headers = {"Content-Type": "application/x-www-form-urlencoded"};
    const body = `username=${user.username}&password=${btoa(user.password)}`;
    return this.http.post<UserLogin>((api.rootUrl + api.authentication), body, {headers: headers});
  }
}