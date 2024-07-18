import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AlpacaService } from "@alpaca/services/alpaca.service";
import { SpinnerComponent } from "src/app/shared/components/spinner/spinner.component";
import { Position } from "@alpaca/models/Positions.model";

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
    let sub = this.alpacaService
      .getAssetById(this.position.asset_Id)
      .subscribe((res) => {
        this.position.name = res.name;
        sub.unsubscribe();
      });
  }
}
