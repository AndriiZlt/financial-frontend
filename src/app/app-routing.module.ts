import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainLayoutComponent } from "./core/main-layout/main-layout.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { ContentGuard } from "./features/guards/content.guard";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./core/auth/auth.module").then((m) => m.AuthModule),
    canActivate: [AuthGuard],
  },
  {
    path: "finapp",
    component: MainLayoutComponent,
    loadChildren: () =>
      import("./core/main-layout/layout.module").then((m) => m.PagesModule),
    canActivate: [ContentGuard],
  },
  { path: "**", redirectTo: "finapp" },
  { path: "", pathMatch: "full", redirectTo: "finapp" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
