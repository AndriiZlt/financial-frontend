import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { SharedModule } from "../shared/shared.module";
import { CardComponent } from "./portfolio/card/card.component";
import { FormsModule } from "@angular/forms";
import { BoardComponent } from "./board/board.component";
import { BoardItemComponent } from "./board/board-item/board-item.component";
import { BuyModalComponent } from './portfolio/buy-modal/buy-modal.component';

@NgModule({
  declarations: [
    PortfolioComponent,
    CardComponent,
    BoardComponent,
    BoardItemComponent,
    BuyModalComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule],
})
export class FeaturesModule {}
