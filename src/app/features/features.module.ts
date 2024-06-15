import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PortfolioComponent } from "./my-assets/portfolio.component";
import { SharedModule } from "../shared/shared.module";
import { CardListComponent } from "./my-assets/card-list/card-list.component";
import { CardComponent } from "./my-assets/card/card.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [PortfolioComponent, CardListComponent, CardComponent],
  imports: [CommonModule, SharedModule, FormsModule],
})
export class FeaturesModule {}
