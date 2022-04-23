import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./_services/auth-guard.service";
import { TouitsListComponent } from "./touits-list/touits-list.component";

const appRoutes: Routes = [
    { path: "", canActivate: [AuthGuard], component: TouitsListComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }