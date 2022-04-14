import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Authentication } from './models/Authentication.model';
import { AuthenticationService } from './services/authentication.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  appTitle: string = "Touiteur";
  authenticationData!: Authentication;
  screenWidth: number = window.innerWidth;
  onLoginRoute!: boolean;
  onRegistrationRoute!: boolean;
  isMenuOpen: boolean = false;
  

  constructor(private authenticationService: AuthenticationService, private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .subscribe({
        next: value => {
          if (value instanceof NavigationEnd) {
            this.onLoginRoute = this.router.url === "/login" ? true : false;
            this.onRegistrationRoute = this.router.url === "/registration" ? true : false;
          }
        }
      })
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

  @HostListener("window: resize", ["$event"])
  onWindowResize(): void {
    this.screenWidth = window.innerWidth;
    if (window.innerWidth >= 1200) {
      this.isMenuOpen = false;
    }
  }

  onClickMenuButton(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.isMenuOpen = false;
    this.authenticationService.logout();
    this.router.navigateByUrl("/login");
  }
}
