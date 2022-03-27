import { NgModule } from "@angular/core";
import { AuthenticationComponent } from "./authentication.component";
import { AuthenticationRoutingModule } from "./authentication.routing.module";

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [AuthenticationRoutingModule]
})
export class AuthenticationModule {}