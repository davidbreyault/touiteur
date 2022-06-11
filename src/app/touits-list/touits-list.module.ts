import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TouitModule } from "../touit/touit.module";
import { TouitsListComponent } from "./touits-list.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator'; 
import { customPaginatorConfiguration } from "src/shared/custom-paginator-config";
import { TouitsListRoutingModule } from "./touits-list.routing.module";

@NgModule({
  declarations: [TouitsListComponent],
  imports: [
    CommonModule,
    TouitModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    TouitsListRoutingModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: customPaginatorConfiguration() }
  ]
})
export class TouitsListModule {}