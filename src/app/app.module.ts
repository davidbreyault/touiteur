import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// COMPONENTS
import { AppComponent } from './app.component';
// ROUTING MODULES
import { AppRoutingModule } from './app.routing.module';
// MODULES
import { AuthenticationModule } from './authentication/authentication.module';
// SERVICES 
import { AuthGuard } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    // Module global de gestion de route (à importer en dernier !)
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
