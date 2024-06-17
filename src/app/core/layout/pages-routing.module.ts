import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages/pages.component";
import { PortfolioComponent } from "src/app/features/portfolio/portfolio.component";
import { BoardComponent } from "src/app/features/board/board.component";

const routes: Routes = [
  {
    path: "portfolio",
    component: PortfolioComponent,
  },
  {
    path: "board",
    component: BoardComponent,
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
