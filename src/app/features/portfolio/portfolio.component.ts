import { Component, OnInit } from "@angular/core";
import { Stock } from "../models/Stock.model";
import { StockApiService } from "../services/stock.service";
import { StockToAdd } from "../models/StockToAdd.model";
import { StockStatus } from "../models/StockStatus.model";
import { BoardItemToAdd } from "../models/BoardItemToAdd.model";
import { BoardApiService } from "../services/board.service";
import { SpinnerComponent } from "src/app/shared/components/spinner/spinner.component";
import { User } from "src/app/core/auth/models/user.model";
import { UserService } from "src/app/core/auth/services/user.service";

@Component({
  selector: "app-portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.scss"],
})
export class PortfolioComponent extends SpinnerComponent implements OnInit {
  user: User;
  stockBallance: number;
  userBallance: string;
  stocks: Stock[] = [];
  stock: Stock;
  sellModalStock: Stock;
  isLoading: boolean = true;
  messageInput: string = "";
  idInput: string = "";
  buyModalOn: boolean = false;
  sellModalOn: boolean = false;
  selectedQty: number = 1;
  stocksToAdd: StockToAdd[] = [
    {
      symbol: "AAPL",
      name: "Apple Inc. Common Stock",
      cost_Basis: "380.4",
      qty: "5",
      status: StockStatus.Fixed,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc. Class A Common Stock",
      cost_Basis: "171.82",
      qty: "4",
      status: StockStatus.Fixed,
    },
    {
      symbol: "TSLA",
      name: "Tesla, Inc. Common Stock",
      cost_Basis: "519.18",
      qty: "3",
      status: StockStatus.Fixed,
    },
  ];

  constructor(
    private stockService: StockApiService,
    private boardService: BoardApiService,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit() {
    this.updatePage();
  }

  addStocks(): void {
    for (var stock of this.stocksToAdd) {
      let sub = this.stockService.addStock(stock).subscribe((res) => {
        sub.unsubscribe();
      });
    }

    console.log("Stocks were added successfully");
    setTimeout(() => this.updatePage(), 1000);
  }

  updatePage(): void {
    this.isLoading = true;
    this.user = JSON.parse(localStorage.getItem("UserObject"));

    let sub = this.stockService.getStocks().subscribe((res) => {
      this.stocks = [...res];
      console.log("STOCKS:", this.stocks);
      this.updateBallance();
      this.isLoading = false;
      sub.unsubscribe();
    });
  }

  updateBallance(): void {
    // Get user ballance
    this.userService.getUserBallance().subscribe((res) => {
      console.log("Updated ballance=", res);
      this.userBallance = res;
    });

    // Stock ballance
    let ballance = 0;
    this.stocks.map((s) => {
      ballance += Number(s.cost_Basis) * Number(s.qty);
    });
    this.stockBallance = ballance;
  }

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
      total_Price: (Number(stock.cost_Basis) * qty_to_sell)
        .toString()
        .substring(0, 8),
      status: StockStatus.For_Sale,
    };
    let sub = this.boardService
      .addItemToBoard(newBoardItemToAdd)
      .subscribe((res) => {
        sub.unsubscribe();
        this.updatePage();
      });
  }

  openBuyModal(event: any): void {
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

  closeModal(): void {
    this.sellModalOn = false;
    this.buyModalOn = false;
    this.updatePage();
  }
}
