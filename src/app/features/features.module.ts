import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BoardComponent } from "./board/board.component";
import { BoardItemComponent } from "./board/board-item/board-item.component";
import { BuyModalComponent } from "./portfolio/buy-modal/buy-modal.component";
import { PortfolioStockComponent } from "./portfolio/portfolio-stock/portfolio-stock.component";
import { SellModalComponent } from "./portfolio/sell-modal/sell-modal.component";
import { AlpacaTradingComponent } from "./alpaca/alpaca-trading.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../shared/modules/material-module";
import { TestComponent } from "./test/test.component";
import { OrderCardComponent } from "./alpaca/order-card/order-card.component";
import { TransactionComponent } from "./alpaca/transaction-card/transaction-card.component";
import { AlpacaStockComponent } from "./portfolio/alpaca-stock/alpaca-stock.component";

@NgModule({
  declarations: [
    PortfolioComponent,
    PortfolioStockComponent,
    BoardComponent,
    BoardItemComponent,
    BuyModalComponent,
    SellModalComponent,
    AlpacaTradingComponent,
    TestComponent,
    OrderCardComponent,
    TransactionComponent,
    AlpacaStockComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [DatePipe],
})
export class FeaturesModule {}
