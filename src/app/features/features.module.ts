import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { BoardComponent } from "./board/board.component";
import { BoardItemComponent } from "./board/board-item/board-item.component";
import { BuyModalComponent } from "./portfolio/buy-modal/buy-modal.component";
import { PortfolioItemComponent } from "./portfolio/portfolio-item/portfolio-item.component";
import { SellModalComponent } from "./portfolio/sell-modal/sell-modal.component";
import { AlpacaTradingComponent } from "./alpaca/alpaca-trading.component";
import { MaterialModule } from "../shared/modules/material-module";

@NgModule({
  declarations: [
    PortfolioComponent,
    PortfolioItemComponent,
    BoardComponent,
    BoardItemComponent,
    BuyModalComponent,
    SellModalComponent,
    AlpacaTradingComponent,
  ],
  imports: [CommonModule, FormsModule, SharedModule],
  providers: [DatePipe],
})
export class FeaturesModule {}
