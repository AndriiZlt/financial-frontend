import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages/pages.component";
import { MyAssetsComponent } from "../my-assets/my-assets.component";
import { CoreModule } from "src/app/core/core.module";

@NgModule({
  declarations: [PagesComponent, MyAssetsComponent],
  imports: [CommonModule, PagesRoutingModule, CoreModule],
})
export class PagesModule {}
