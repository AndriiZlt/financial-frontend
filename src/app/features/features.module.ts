import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BoardComponent } from "@features/board/board.component";
import { BoardItemComponent } from "@features/board/board-item/board-item.component";
import { AlpacaTradingComponent } from "@features/alpaca/alpaca-trading.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "@shared/modules/material-module";
import { OrderCardComponent } from "@alpaca/order-card/order-card.component";
import { TransactionComponent } from "@alpaca/transaction-card/transaction-card.component";
import { PortfolioModule } from "@portfolio/portfolio.module";

@NgModule({
  declarations: [
    BoardComponent,
    BoardItemComponent,
    AlpacaTradingComponent,
    OrderCardComponent,
    TransactionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    PortfolioModule,
  ],
  providers: [DatePipe],
})
export class FeaturesModule {}
