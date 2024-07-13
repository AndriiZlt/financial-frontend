import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesRoutingModule } from "./layout-routing.module";
import { PagesComponent } from "./layout.component";
import { CoreModule } from "src/app/core/core.module";

@NgModule({
  declarations: [PagesComponent],
  imports: [CommonModule, PagesRoutingModule, CoreModule],
})
export class PagesModule {}
