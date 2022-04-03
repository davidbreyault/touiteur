import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TouitsListComponent } from "./touits-list.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 

@NgModule({
  declarations: [TouitsListComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class TouitsListModule {}