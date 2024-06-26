import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages/pages.component";
import { PortfolioComponent } from "src/app/features/portfolio/portfolio.component";
import { BoardComponent } from "src/app/features/board/board.component";
import { BuyModalComponent } from "src/app/features/portfolio/buy-modal/buy-modal.component";

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
  {
    path: "buy-modal",
    component: BuyModalComponent,
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
