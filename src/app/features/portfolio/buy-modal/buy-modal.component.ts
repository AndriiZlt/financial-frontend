import { Component, OnInit } from "@angular/core";
import * as nasdaq100 from "../../../../assets/nasdaq100";
import { AlpacaService } from "../../services/alpaca.service";
import { Asset } from "../../models/Asset.model";
import { StockToAdd } from "../../models/StockToAdd.model";
import { StockApiService } from "../../services/stock.service";

@Component({
  selector: "app-buy-modal",
  templateUrl: "./buy-modal.component.html",
  styleUrls: ["./buy-modal.component.scss"],
})
export class BuyModalComponent implements OnInit {
  nasdaq100: string[];
  selectedStock: Asset;
  isSelected: boolean = false;
  maxPrice: number = 0;
  currentPrice: number = 0;
  selectedValue: number = 0;
  selectedQty: number = 1;
  constructor(
    private alpacaService: AlpacaService,
    private stockService: StockApiService
  ) {}

  ngOnInit(): void {
    this.nasdaq100 = [...nasdaq100.get()];
  }

  onStockSelect(symbol: string): void {
    let sub = this.alpacaService.getAssetById(symbol).subscribe((res) => {
      console.log("res:", res);
      if (res) {
        this.selectedStock = res;
        this.isSelected = true;
        this.getCurrentPrice();
      } else {
        console.log("Error in fetching Asset by symbol");
      }

      sub.unsubscribe();
    });
  }

  getCurrentPrice(): void {
    // Getting current price of the asset
    let sub = this.alpacaService
      .getLastTrades(this.selectedStock.symbol)
      .subscribe((res) => {
        console.log("getLastTrades res:", res);
        this.currentPrice = res["trade"].p;
        this.selectedValue = this.currentPrice;
        // this.priceIsLoading = false;
        sub.unsubscribe();
      });
  }

  onPriceChange(value: number): void {
    this.selectedValue = value;
  }

  onQtySelect(value: number): void {
    this.selectedQty = value;
  }

  onBuyPress(): void {
    let newStockToBuy: StockToAdd = {
      alpaca_Asset_Id: "sss",
      symbol: this.selectedStock.symbol,
      name: this.selectedStock.name,
      cost_Basis: this.selectedValue.toString(),
      qty: this.selectedQty.toString(),
      exchange: "string",
      status: 3,
    };

    this.stockService.addStock(newStockToBuy).subscribe((res) => {
      console.log("BUY ok:", res);
    });
  }
}
