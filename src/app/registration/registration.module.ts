import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { AlertModule } from "../alert/alert.module";
import { RegistrationComponent } from "./registration.component";
import { RegistrationRoutingModule } from "./registration.routing.module";

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    AlertModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RegistrationRoutingModule
  ]
})
export class RegistrationModule {}