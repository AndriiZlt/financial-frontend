import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { StatusComponent } from "./components/status/status.component";
import { BuyButtonComponent } from "./components/buy-button/buy-button.component";
import { MaterialModule } from "./modules/material-module";

@NgModule({
  declarations: [SpinnerComponent, StatusComponent, BuyButtonComponent],
  imports: [CommonModule, MaterialModule],
  exports: [SpinnerComponent, StatusComponent, MaterialModule],
})
export class SharedModule {}
