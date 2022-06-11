import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../_services/auth-guard.service";
import { TouitsBestofComponent } from "./touits-bestof.component";

const touitsBestofRoutes: Routes = [
  { path: "bestof", canActivate: [AuthGuard], component: TouitsBestofComponent }
]

@NgModule({
  imports: [RouterModule.forChild(touitsBestofRoutes)],
  exports: [RouterModule]
})
export class TouitsBestofRoutingModule {}