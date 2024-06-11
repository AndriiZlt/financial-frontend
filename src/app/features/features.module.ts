import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyAssetsComponent } from "./my-assets/my-assets.component";
import { SharedModule } from "../shared/shared.module";
import { AssetCardComponent } from "./my-assets/asset-card/asset-card.component";

@NgModule({
  declarations: [MyAssetsComponent, AssetCardComponent],
  imports: [CommonModule, SharedModule],
})
export class FeaturesModule {}
