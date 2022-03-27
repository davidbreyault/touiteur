import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// COMPONENTS
import { AppComponent } from './app.component';
// ROUTING MODULES
import { AppRoutingModule } from './app.routing.module';
// MODULES

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Module global de gestion de route (à importer en dernier !)
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
