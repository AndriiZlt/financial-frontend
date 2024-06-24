import { Component, Input, OnInit } from "@angular/core";
import { AlpacaService } from "../../services/alpaca.service";
import { Asset } from "../../models/Asset.model";
import { StockToAdd } from "../../models/StockToAdd.model";
import { StockApiService } from "../../services/stock.service";
import { Stock } from "../../models/Stock.model";

@Component({
  selector: "app-sell-modal",
  templateUrl: "./sell-modal.component.html",
  styleUrls: ["./sell-modal.component.scss"],
})
export class SellModalComponent implements OnInit {
  @Input() stock: Stock;
  nasdaq100: string[];
  selectedStock: Asset;
  maxPrice: number = 0;
  currentPrice: number = 0;
  selectedPrice: number = 0;
  selectedQty: number = 1;
  constructor(
    private alpacaService: AlpacaService,
    private stockService: StockApiService
  ) {}

  ngOnInit(): void {
    // this.nasdaq100 = [...nasdaq100.get()];
    console.log("Modal Stock:", this.stock);
    this.currentPrice = Number(this.stock.cost_Basis);
    // this.getCurrentStock();
    this.getCurrentPrice();
  }

  getCurrentStock() {
    let sub = this.alpacaService
      .getAssetById(this.stock.symbol)
      .subscribe((res) => {
        console.log("res:", res);
        if (res) {
          this.selectedStock = res;
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
      .getLastTrades(this.stock.symbol)
      .subscribe((res) => {
        console.log("getLastTrades res:", res);
        this.currentPrice = res["trade"].p;
        this.selectedPrice = this.currentPrice;
        // this.priceIsLoading = false;
        sub.unsubscribe();
      });
  }

  onPriceChange(value: number): void {
    this.selectedPrice = value;
  }

  onQtySelect(value: number): void {
    this.selectedQty = value;
  }

  onBuyPress(): void {
    let newStockToBuy: StockToAdd = {
      alpaca_Asset_Id: "sss",
      symbol: this.selectedStock.symbol,
      name: this.selectedStock.name,
      cost_Basis: this.selectedPrice.toString(),
      qty: this.selectedQty.toString(),
      exchange: "string",
      status: 3,
    };

    this.stockService.addStock(newStockToBuy).subscribe((res) => {
      console.log("BUY ok:", res);
    });
  }
}
