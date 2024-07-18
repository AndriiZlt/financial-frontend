import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesRoutingModule } from "./layout-routing.module";
import { MainLayoutComponent } from "./main-layout.component";
import { CoreModule } from "src/app/core/core.module";

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [CommonModule, PagesRoutingModule, CoreModule],
})
export class MainLayoutModule {}
