import { Component, OnInit } from "@angular/core";
import { Stock } from "./models/Stock.model";
import { StockApiService } from "./services/stock.service";
import { StockToAdd } from "./models/StockToAdd.model";
import { StockStatus } from "./models/StockStatus.model";
import { BoardItemToAdd } from "../board/models/BoardItemToAdd.model";
import { BoardApiService } from "../board/services/board.service";
import { SpinnerComponent } from "src/app/shared/components/spinner/spinner.component";
import { User } from "src/app/core/auth/models/user.model";
import { UserService } from "src/app/core/auth/services/user.service";
import { Position } from "../alpaca/models/Positions.model";
import { AlpacaService } from "../alpaca/services/alpaca.service";
import { StocksService } from "src/app/core/components/side-nav/services/stocks.service";

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
  filteredeStocks: Stock[] = [];
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
  positions: Position[];

  constructor(
    private stockService: StockApiService,
    private boardService: BoardApiService,
    private userService: UserService,
    private alpacaService: AlpacaService,
    private stocksService: StocksService
  ) {
    super();
  }

  ngOnInit() {
    this.updatePage();
  }

  updatePage(): void {
    this.isLoading = true;
    let user = localStorage.getItem("UserObject");
    if (user) {
      this.user = JSON.parse(user);
    }

    let sub = this.stockService.getStocks().subscribe((res) => {
      this.stocks = <Stock[]>res;
      this.filteredeStocks = this.stocks.filter((s) => Number(s.qty) > 0);

      let sub2 = this.alpacaService.getPositions().subscribe((res) => {
        this.positions = <Position[]>res;
        this.isLoading = false;
        this.updateBallance();
        this.stocksService.triggerEvent(
          this.filteredeStocks.length + this.positions.length
        );
        sub2.unsubscribe();
      });
      sub.unsubscribe();
    });
  }

  addStocks(): void {
    for (var stock of this.stocksToAdd) {
      let sub = this.stockService.addStock(stock).subscribe((res) => {
        sub.unsubscribe();
      });
    }
    setTimeout(() => this.updatePage(), 1000);
  }

  updateBallance(): void {
    // Get user ballance
    this.userService.getUserBallance().subscribe((res) => {
      this.userBallance = res;
    });

    // Stock ballance
    let newStockBallance = 0;
    this.stocks.map(
      (s) => (newStockBallance += Number(s.cost_Basis) * Number(s.qty))
    );
    this.positions.map(
      (pos) => (newStockBallance += Number(pos.cost_Basis) * Number(pos.qty))
    );

    this.stockBallance = newStockBallance;
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
