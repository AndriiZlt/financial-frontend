import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages/pages.component";
import { PortfolioComponent } from "src/app/features/my-assets/portfolio.component";

const routes: Routes = [
  {
    path: "portfolio",
    component: PortfolioComponent,
  },
  {
    path: "board",
    component: PortfolioComponent,
  },
  {
    path: "alpaca",
    component: PortfolioComponent,
  },
  { path: "", redirectTo: "portfolio", pathMatch: "full" },
  { path: " ", redirectTo: "portfolio", pathMatch: "full" },
  { path: "**", redirectTo: "portfolio" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
