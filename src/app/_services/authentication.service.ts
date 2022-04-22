import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { Authentication } from "../_models/Authentication.model";
import { User } from "../_models/User.model";
import { UserLogin } from "../_models/UserLogin.model";
import { AuthenticationLauncherService } from "./authentication-launcher.service";
import { TokenService } from "./token.service";

@Injectable()
export class AuthenticationService {

  private authenticationData: Authentication = new Authentication();
  private authenticationDataSubject: Subject<Authentication> = new Subject<Authentication>();

  constructor(private authenticationLauncherService: AuthenticationLauncherService, private tokenService: TokenService) {
    this.authenticationData.isAuthenticated = false;
  }

  getAuthenticationData(): Authentication {
    return this.authenticationData;
  }

  getAuthenticationDataAsObservable(): Observable<Authentication> {
    return this.authenticationDataSubject.asObservable();
  }

  emitAuthenticationDataSubject(): void {
    this.authenticationDataSubject.next(this.authenticationData);
  }

  login(user: User): Observable<UserLogin> {
    return this.authenticationLauncherService.loginRequestLauncher(user)
      .pipe(tap({
        next: response => {
          // Changement de statut d'authentification
          this.authenticationData.isAuthenticated = true;
          this.authenticationData.bearerToken = response.access_token;
          this.authenticationData.username = this.tokenService.getUsernameFromJwt(response.access_token);
          // Stockage du token dans le session storage
          this.tokenService.setToken(this.authenticationData.bearerToken);
          this.emitAuthenticationDataSubject();
        }
      }))
  }

  loginViaBearerToken(): void {
    const bearerToken = this.tokenService.getToken()!;
    this.authenticationData.isAuthenticated = true;
    this.authenticationData.bearerToken = bearerToken;
    this.authenticationData.username = this.tokenService.getUsernameFromJwt(bearerToken);
    this.emitAuthenticationDataSubject();
  }

  logout(): void {
    this.authenticationData.isAuthenticated = false;
    this.emitAuthenticationDataSubject();
  }
}