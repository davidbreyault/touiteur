import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TouitsListComponent } from "./touits-list.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TouitModule } from "../touit/touit.module";

@NgModule({
  declarations: [TouitsListComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    TouitModule
  ]
})
export class TouitsListModule {}