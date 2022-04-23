import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api } from "src/environments/environment";
import { User } from "../_models/User.model";
import { UserLogin } from "../_models/UserLogin.model";

@Injectable()
export class AuthenticationLauncherService {

  constructor(private http: HttpClient) {}

  loginRequestLauncher(user: User): Observable<UserLogin> {
    const body = `username=${user.username}&password=${btoa(user.password)}`;
    return this.http.post<UserLogin>((api.rootUrl + api.authentication), body);
  }
}