import { Component, OnInit } from "@angular/core";
import { Stock } from "../models/Stock.model";
import { StockApiService } from "../services/stock.service";
import { StockToAdd } from "../models/StockToAdd.model";
import { StockStatus } from "../models/StockStatus.model";
import { BoardItemToAdd } from "../models/BoardItemToAdd.model";
import { BoardApiService } from "../services/board.service";
import { SpinnerComponent } from "src/app/shared/components/spinner/spinner.component";

@Component({
  selector: "app-portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.scss"],
})
export class PortfolioComponent extends SpinnerComponent implements OnInit {
  stocks: Stock[] = [];
  stock: Stock;
  sellModalStock: Stock;
  isLoading: boolean = false;
  messageInput: string = "";
  idInput: string = "";
  buyModalOn: boolean = false;
  sellModalOn: boolean = false;
  selectedQty: number = 1;
  stocksToAdd: StockToAdd[] = [
    {
      symbol: "AAPL",
      name: "Stock name",
      cost_Basis: "380.4",
      qty: "5",
      status: StockStatus.Fixed,
    },
    {
      symbol: "GOOGL",
      name: "Stock name",
      cost_Basis: "171.82",
      qty: "4",
      status: StockStatus.Fixed,
    },
    {
      symbol: "TSLA",
      name: "Stock name",
      cost_Basis: "519.18",
      qty: "3",
      status: StockStatus.Fixed,
    },
  ];

  constructor(
    private stockService: StockApiService,
    private boardService: BoardApiService
  ) {
    super();
  }

  ngOnInit() {
    this.updatePage();
  }

  addStocks() {
    for (var stock of this.stocksToAdd) {
      let sub = this.stockService.addStock(stock).subscribe((res) => {
        console.log("Added:", res);
        sub.unsubscribe();
      });
    }
  }

  updatePage(): void {
    this.isLoading = true;
    let sub = this.stockService.getStocks().subscribe((res) => {
      this.stocks = [...res];

      console.log("STOCKS:", this.stocks);
      this.isLoading = false;
      sub.unsubscribe();
    });
  }

  // create buy modal and implement add item to board and then invoke sellStock

  sellStock(stock_id: number, qty_to_sell: number): void {
    let stock: Stock = this.stocks.filter((s) => s.id === stock_id)[0];
    let newBoardItemToAdd: BoardItemToAdd = {
      stock_Id: stock.id,
      user_Id: stock.user_Id,
      symbol: stock.symbol,
      name: stock.name,
      cost_Basis: stock.cost_Basis,
      qty: qty_to_sell.toString(),
      max_Qty: stock.qty,
      status: StockStatus.For_Sale,
    };
    let sub = this.boardService
      .addSellToBoard(newBoardItemToAdd)
      .subscribe((res) => {
        console.log("addSellToBoard res:", res);
        // setTimeout(() => {
        //   this.updatePage();
        //   sub.unsubscribe();
        // }, 500);
        sub.unsubscribe();
        this.updatePage();
      });
  }

  openBuyModal(event) {
    if (event.target.innerHTML.includes("Close")) {
      this.buyModalOn = false;
      this.sellModalOn = false;
    } else {
      this.buyModalOn = true;
    }
  }

  openSellModal(stock_id: string) {
    this.sellModalStock = this.stocks.filter(
      (s) => s.id.toString() === stock_id
    )[0];
    this.sellModalOn = true;
  }

  closeModal() {
    this.sellModalOn = false;
    this.buyModalOn = false;
    this.updatePage();
  }
}
