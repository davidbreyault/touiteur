import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegistrationComponent } from "./registration.component";

const registrationRoute: Routes = [
  { path: "registration", component: RegistrationComponent }
]

@NgModule({
  imports: [RouterModule.forChild(registrationRoute)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {}