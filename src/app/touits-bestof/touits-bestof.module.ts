import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TouitModule } from "../touit/touit.module";
import { TouitsBestofComponent } from "./touits-bestof.component";
import { TouitsBestofRoutingModule } from "./touits-bestof.routing.module";

@NgModule({
  declarations: [TouitsBestofComponent],
  imports: [
    CommonModule,
    TouitModule,
    TouitsBestofRoutingModule
  ],
  exports: [TouitsBestofComponent]
})
export class TouitsBestofModule {}