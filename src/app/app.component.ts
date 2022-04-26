import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { TokenService } from './_services/token.service';
import { Authentication } from './_models/Authentication.model';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { TouitPublicationComponent } from './touit-publication/touit-publication.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

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
  dialogWidth!: string;
  
  constructor(
    private authenticationService: AuthenticationService, 
    private tokenService: TokenService, 
    private router: Router,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {}

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
    if (this.tokenService.getToken()) {
      if (this.tokenService.checkTokenValidity()) {
        this.authenticationService.loginViaBearerToken();
      }
    }
    this.setDialogWidth();
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

  onOpenDialog(): void {
    const matDialogConfig: MatDialogConfig = {
      maxWidth: this.dialogWidth,
      width: this.dialogWidth
    }
    const dialogRef = this.dialog.open(TouitPublicationComponent, matDialogConfig);
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
    //dialogRef.afterClosed().subscribe()
  }

  setDialogWidth(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Large,
    ]).subscribe( (state: BreakpointState) => {
      if (state.breakpoints[Breakpoints.XSmall]) {
        console.log('Matches XSmall viewport');
        this.dialogWidth = "90%";
      }
      if (state.breakpoints[Breakpoints.Small]) {
        console.log('Matches Small viewport');
        this.dialogWidth = "50%";
      }
      if (state.breakpoints[Breakpoints.Large]) {
        console.log('Matches Large viewport');
        this.dialogWidth = "35%";
      }
    });
  }

  logout(): void {
    this.isMenuOpen = false;
    this.authenticationService.logout();
    this.router.navigateByUrl("/login");
  }
}
