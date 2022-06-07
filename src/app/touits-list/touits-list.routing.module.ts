import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../_services/auth-guard.service";
import { TouitsListComponent } from "./touits-list.component";

const touitsListRoutes: Routes = [
  { path: "list", canActivate: [AuthGuard], component: TouitsListComponent }
]

@NgModule({
  imports: [RouterModule.forChild(touitsListRoutes)],
  exports: [RouterModule]
})
export class TouitsListRoutingModule {}