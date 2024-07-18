import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import * as nasdaq100 from "src/assets/nasdaq100";
import { AlpacaService } from "@alpaca/services/alpaca.service";
import { Asset } from "@alpaca/models/Asset.model";
import { StockToAdd } from "@portfolio/models/StockToAdd.model";
import { StockApiService } from "@portfolio/services/stock.service";
import { StockStatus } from "@portfolio/models/StockStatus.model";
import { BoardApiService } from "@board/services/board.service";
import { BoardItemToAdd } from "@board/models/BoardItemToAdd.model";

@Component({
  selector: "app-buy-modal",
  templateUrl: "./buy-modal.component.html",
  styleUrls: ["./buy-modal.component.scss"],
})
export class BuyModalComponent implements OnInit {
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  nasdaq100: string[];
  selectedStock: Asset;
  isSelected: boolean = false;
  maxPrice: number = 0;
  currentPrice: number;
  selectedPrice: number;
  selectedQty: number = 1;
  isLoaded: boolean = false;
  constructor(
    private alpacaService: AlpacaService,
    private stockService: StockApiService,
    private boardService: BoardApiService
  ) {}

  ngOnInit(): void {
    this.nasdaq100 = [...nasdaq100.get()];
  }

  onStockSelect(symbol: string): void {
    this.isLoaded = false;
    let sub = this.alpacaService.getAssetById(symbol).subscribe((res) => {
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
        this.currentPrice = res["trade"].p;
        this.selectedPrice = this.currentPrice;
        this.isLoaded = true;
        sub.unsubscribe();
      });
  }

  onPriceChange(value: number): void {
    this.selectedPrice = value;
  }

  onQtySelect(value: number): void {
    this.selectedQty = value;
  }

  addBuyToBoard(): void {
    let newStockToBuy: StockToAdd = {
      symbol: this.selectedStock.symbol,
      name: this.selectedStock.name,
      cost_Basis: "0",
      qty: "0",
      status: StockStatus.For_Purchase,
    };

    this.stockService.addEmptyStock(newStockToBuy).subscribe((addedStock) => {
      let boardItemToAdd: BoardItemToAdd = {
        stock_Id: addedStock.id,
        user_Id: addedStock.user_Id,
        symbol: addedStock.symbol,
        name: addedStock.name,
        cost_Basis: this.selectedPrice.toString(),
        qty: this.selectedQty.toString(),
        max_Qty: addedStock.qty,
        status: StockStatus.For_Purchase,
        total_Price: (this.selectedPrice * this.selectedQty).toString(),
      };
      this.boardService.addItemToBoard(boardItemToAdd).subscribe((res) => {
        this.closeModal.emit("close");
      });
    });
  }
}
