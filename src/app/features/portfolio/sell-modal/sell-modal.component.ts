import { Component, Input, OnInit, Output } from "@angular/core";
import { AlpacaService } from "../../services/alpaca.service";
import { Asset } from "../../models/Asset.model";
import { StockToAdd } from "../../models/StockToAdd.model";
import { StockApiService } from "../../services/stock.service";
import { Stock } from "../../models/Stock.model";
import { BoardItemToAdd } from "../../models/BoardItemToAdd.model";
import { StockStatus } from "../../models/StockStatus.model";
import { BoardApiService } from "../../services/board.service";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-sell-modal",
  templateUrl: "./sell-modal.component.html",
  styleUrls: ["./sell-modal.component.scss"],
})
export class SellModalComponent implements OnInit {
  @Input() stock: Stock;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  nasdaq100: string[];
  selectedStock: Asset;
  maxPrice: number = 0;
  currentPrice: number = 0;
  selectedPrice: number = 0;
  selectedQty: number = 1;
  qtyArray: number[] = [];
  constructor(
    private alpacaService: AlpacaService,
    private stockService: StockApiService,
    private boardService: BoardApiService
  ) {}

  ngOnInit(): void {
    // this.nasdaq100 = [...nasdaq100.get()];
    console.log("Modal Stock:", this.stock);
    this.currentPrice = Number(this.stock.cost_Basis);
    this.selectedQty = Number(this.stock.qty);
    this.createQtyArray();
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

  createQtyArray() {
    this.qtyArray = [];
    for (let i = 1; i <= Number(this.stock.qty); i++) {
      if (i !== this.selectedQty) {
        this.qtyArray.push(i);
      }
    }
  }

  getCurrentPrice(): void {
    // Getting current price of the asset
    let sub = this.alpacaService
      .getLastTrades(this.stock.symbol)
      .subscribe((res) => {
        this.currentPrice = res["trade"].p;
        this.selectedPrice = this.currentPrice;
        sub.unsubscribe();
      });
  }

  onPriceChange(value: number): void {
    this.selectedPrice = value;
  }

  onQtySelect(value: number): void {
    this.selectedQty = Number(value);
    this.createQtyArray();
  }

  sendSellToBoard(): void {
    let newBoardItem: BoardItemToAdd = {
      stock_Id: this.stock.id,
      user_Id: this.stock.user_Id,
      symbol: this.stock.symbol,
      name: this.stock.name,
      cost_Basis: this.selectedPrice.toString(),
      qty: this.selectedQty.toString(),
      max_Qty: this.stock.qty,
      status: StockStatus.For_Sale,
      total_Price: (
        Number(this.selectedPrice) * Number(this.selectedQty)
      ).toString(),
    };

    console.log("New Board Item:", newBoardItem);

    this.boardService.addItemToBoard(newBoardItem).subscribe((res) => {
      console.log("Sell ok:", res);
      this.closeModal.emit("close");
    });
  }
}
