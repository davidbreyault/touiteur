import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Authentication } from './models/Authentication.model';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  appTitle: string = "touiteur";
  authenticationData!: Authentication;
  subscription: Subscription = new Subscription();

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authenticationService.getAuthenticationDataAsObservable()
        .subscribe((authData: Authentication) => this.authenticationData = authData)
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
