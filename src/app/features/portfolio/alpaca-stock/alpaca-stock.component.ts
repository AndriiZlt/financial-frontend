import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Stock } from "../../models/Stock.model";
import { AlpacaService } from "src/app/features/services/alpaca.service";
import { SpinnerComponent } from "src/app/shared/components/spinner/spinner.component";
import { Position } from "../../models/Positions.model";

@Component({
  selector: "app-alpaca-stock",
  templateUrl: "./alpaca-stock.component.html",
  styleUrls: ["./alpaca-stock.component.scss"],
})
export class AlpacaStockComponent extends SpinnerComponent implements OnInit {
  @Input() position: Position;
  @Input() index: number;
  positionName: string;
  currentPrice: string;
  nameIsLoading: boolean = true;
  priceIsLoading: boolean = true;
  status: string;

  constructor(private alpacaService: AlpacaService) {
    super();
  }

  ngOnInit(): void {
    this.status = "Alpaca";
  }

  onSellClick(event: any): void {
    console.log("Sell position empty event:", event);
  }

  onBeingSoldClick(): void {
    console.log("onBeingSoldClick");
  }

  onBuyOrderClick(): void {
    console.log("onBuyOrderClick");
  }
}
