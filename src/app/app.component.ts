import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Authentication } from './models/Authentication.model';
import { AuthenticationService } from './services/authentication.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  appTitle: string = "touiteur";
  authenticationData!: Authentication;
  subscription!: Subscription;

  constructor(private authenticationService: AuthenticationService, private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {
    this.subscription =
      this.authenticationService.getAuthenticationDataAsObservable()
        .subscribe({
          next: (authData: Authentication) => this.authenticationData = authData
        })
    // S'il y a un token dans le session storage et qu'il est encore valide
    if (sessionStorage.getItem("token")) {
      if (this.tokenService.checkTokenValidity()) {
        this.authenticationService.loginViaBearerToken();
      }
    }
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl("/login");
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
