import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlpacaStockComponent } from "./alpaca-stock/alpaca-stock.component";
import { BuyModalComponent } from "./buy-modal/buy-modal.component";
import { PortfolioStockComponent } from "./portfolio-stock/portfolio-stock.component";
import { SellModalComponent } from "./sell-modal/sell-modal.component";
import { PortfolioComponent } from "./portfolio.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    AlpacaStockComponent,
    BuyModalComponent,
    PortfolioStockComponent,
    SellModalComponent,
    PortfolioComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class PortfolioModule {}
