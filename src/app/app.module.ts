// COMPONENTS
import { AppComponent } from './app.component';
// ROUTING MODULES
import { AppRoutingModule } from './app.routing.module';
// MODULES
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationModule } from './authentication/authentication.module';
import { RegistrationModule } from './registration/registration.module';
import { TouitsListModule } from './touits-list/touits-list.module';
// SERVICES 
import { AuthGuard } from './_services/auth-guard.service';
import { TokenService } from './_services/token.service';
import { RegistrationService } from './_services/registration.service';
import { AuthenticationService } from './_services/authentication.service';
import { MockRegistrationService } from './_mocks/mock-registration.service';
import { AuthenticationLauncherService } from './_services/authentication-launcher.service';
import { MockAuthenticationLauncherService } from './_mocks/mock-authentication-launcher.service';
import { TouitsService } from './_services/touits.service';
import { MockTouitService } from './_mocks/mock-touit.service';
import { InterceptorService } from './_services/interceptor.service';

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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    AuthGuard,
    TokenService,
    RegistrationService,
    //{ provide: RegistrationService, useClass: MockRegistrationService },
    AuthenticationService,
    AuthenticationLauncherService,
    //{ provide: AuthenticationLauncherService, useClass: MockAuthenticationLauncherService },
    TouitsService
    //{ provide: TouitsService, useClass: MockTouitService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
