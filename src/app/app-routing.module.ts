import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./core/layout/pages/pages.component";

const routes: Routes = [
  // { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import("./core/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "finapp",
    component: PagesComponent,
    loadChildren: () =>
      import("./core/layout/pages.module").then((m) => m.PagesModule),
  },
  { path: "**", redirectTo: "finapp" },
  { path: "", pathMatch: "full", redirectTo: "finapp" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
