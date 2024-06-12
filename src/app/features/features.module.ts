import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyAssetsComponent } from "./my-assets/my-assets.component";
import { SharedModule } from "../shared/shared.module";
import { AssetCardComponent } from "./my-assets/asset-card/asset-card.component";
import { CardListComponent } from "./my-assets/card-list/card-list.component";
import { CardComponent } from './my-assets/card-list/card/card.component';

@NgModule({
  declarations: [MyAssetsComponent, AssetCardComponent, CardListComponent, CardComponent],
  imports: [CommonModule, SharedModule],
})
export class FeaturesModule {}
