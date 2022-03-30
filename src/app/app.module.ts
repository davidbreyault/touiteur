// COMPONENTS
import { AppComponent } from './app.component';
// ROUTING MODULES
import { AppRoutingModule } from './app.routing.module';
// MODULES
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './authentication/authentication.module';
import { RegistrationModule } from './registration/registration.module';
// SERVICES 
import { AuthGuard } from './services/auth-guard.service';
import { TokenService } from './services/token.service';
import { RegistrationService } from './services/registration.service';
import { AuthenticationService } from './services/authentication.service';
import { MockRegistrationService } from './mocks/mock-registration.service';
import { AuthenticationLauncherService } from './services/authentication-launcher.service';
import { MockAuthenticationLauncherService } from './mocks/mock-authentication-launcher.service';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    AuthenticationModule,
    RegistrationModule,
    // Module global de gestion de route (à importer en dernier !)
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    TokenService,
    RegistrationService,
    //{ provide: RegistrationService, useClass: MockRegistrationService },
    AuthenticationService,
    AuthenticationLauncherService,
    //{ provide: AuthenticationLauncherService, useClass: MockAuthenticationLauncherService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
