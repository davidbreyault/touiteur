import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TouitComponent } from "./touit.component";

@NgModule({
  declarations: [TouitComponent],
  imports: [CommonModule],
  exports: [TouitComponent]
})
export class TouitModule {}