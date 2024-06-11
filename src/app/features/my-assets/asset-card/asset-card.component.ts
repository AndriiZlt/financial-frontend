import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AlpacaService } from "../../services/alpaca.service";
import { Stock } from "../../models/Stock.model";
import { SpinnerComponent } from "src/app/shared/components/spinner/spinner.component";

@Component({
  selector: "app-asset-card",
  templateUrl: "./asset-card.component.html",
  styleUrls: ["./asset-card.component.scss"],
})
export class AssetCardComponent extends SpinnerComponent implements OnInit {
  @Input() stock: Stock;
  @Input() index: number;
  @Output() sellAsset: EventEmitter<any> = new EventEmitter<any>();
  positionName: string;
  currentPrice: string;
  nameIsLoading: boolean = true;
  priceIsLoading: boolean = true;

  constructor(private alpacaService: AlpacaService) {
    super();
  }

  ngOnInit(): void {
    // Getting full name of the order
    let sub = this.alpacaService
      .getAssetById(this.stock.symbol)
      .subscribe((res) => {
        this.positionName = res.name;
        this.nameIsLoading = false;
        sub.unsubscribe();
      });

    // Getting current price of the asset
    let sub2 = this.alpacaService
      .getLastTrades(this.stock.symbol)
      .subscribe((res) => {
        this.currentPrice = res["trade"].p;
        this.priceIsLoading = false;
        sub2.unsubscribe();
      });
  }

  sellPosition() {
    this.sellAsset.emit(this.stock.asset_Id);
  }
}
