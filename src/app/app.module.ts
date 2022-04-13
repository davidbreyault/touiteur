// COMPONENTS
import { AppComponent } from './app.component';
// ROUTING MODULES
import { AppRoutingModule } from './app.routing.module';
// MODULES
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationModule } from './authentication/authentication.module';
import { RegistrationModule } from './registration/registration.module';
import { TouitsListModule } from './touits-list/touits-list.module';
// SERVICES 
import { AuthGuard } from './services/auth-guard.service';
import { TokenService } from './services/token.service';
import { RegistrationService } from './services/registration.service';
import { AuthenticationService } from './services/authentication.service';
import { MockRegistrationService } from './mocks/mock-registration.service';
import { AuthenticationLauncherService } from './services/authentication-launcher.service';
import { MockAuthenticationLauncherService } from './mocks/mock-authentication-launcher.service';
import { TouitsService } from './services/touits.service';
import { MockTouitService } from './mocks/mock-touit.service';

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
    TouitsListModule,
    // Module global de gestion de route (à importer en dernier !)
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    TokenService,
    //RegistrationService,
    { provide: RegistrationService, useClass: MockRegistrationService },
    AuthenticationService,
    //AuthenticationLauncherService,
    { provide: AuthenticationLauncherService, useClass: MockAuthenticationLauncherService },
    TouitsService
    //{ provide: TouitsService, useClass: MockTouitService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
