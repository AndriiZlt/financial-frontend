import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  // { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import("./core/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "finance",
    loadChildren: () =>
      import("./core/layout/pages.module").then((m) => m.PagesModule),
  },
  { path: "**", redirectTo: "/finance" },
  { path: "", pathMatch: "full", redirectTo: "/finance" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
