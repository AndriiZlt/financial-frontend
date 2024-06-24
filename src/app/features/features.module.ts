import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { BoardComponent } from "./board/board.component";
import { BoardItemComponent } from "./board/board-item/board-item.component";
import { BuyModalComponent } from "./portfolio/buy-modal/buy-modal.component";
import { PortfolioItemComponent } from "./portfolio/portfolio-item/portfolio-item.component";
import { SellModalComponent } from "./portfolio/sell-modal/sell-modal.component";

@NgModule({
  declarations: [
    PortfolioComponent,
    PortfolioItemComponent,
    BoardComponent,
    BoardItemComponent,
    BuyModalComponent,
    SellModalComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule],
})
export class FeaturesModule {}
