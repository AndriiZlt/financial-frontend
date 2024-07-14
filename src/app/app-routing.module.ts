import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainLayoutComponent } from "./core/main-layout/main-layout.component";

const routes: Routes = [
  // { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import("./core/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "finapp",
    component: MainLayoutComponent,
    loadChildren: () =>
      import("./core/main-layout/layout.module").then((m) => m.PagesModule),
  },
  { path: "**", redirectTo: "finapp" },
  { path: "", pathMatch: "full", redirectTo: "finapp" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
