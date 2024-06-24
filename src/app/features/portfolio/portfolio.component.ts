import { Component, OnInit } from "@angular/core";
import { Stock } from "../models/Stock.model";
import { StockApiService } from "../services/stock.service";
import { StockToAdd } from "../models/StockToAdd.model";
import { StockStatus } from "../models/StockStatus.model";
import { BoardItemToAdd } from "../models/BoardItemToAdd.model";
import { BoardApiService } from "../services/board.service";

@Component({
  selector: "app-portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.scss"],
})
export class PortfolioComponent implements OnInit {
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
      alpaca_Asset_Id: "b0b6dd9d-8b9b-48a9-ba46-b9d54906e415",
      exchange: "NASDAQ",
      symbol: "AAPL",
      name: "Stock name",
      cost_Basis: "380.4",
      qty: "2",
      status: StockStatus.Fixed,
    },
    {
      alpaca_Asset_Id: "2ac633b5-b3a7-4ba6-975d-f0f1e12dd1e4",
      exchange: "NASDAQ",
      symbol: "ADBE",
      name: "Stock name",
      cost_Basis: "478.87",
      qty: "1",
      status: StockStatus.Fixed,
    },
    {
      alpaca_Asset_Id: "3302e560-6d33-4ad5-a429-4d573e26962c",
      exchange: "NASDAQ",
      symbol: "CPRT",
      name: "Stock name",
      cost_Basis: "53.36",
      qty: "1",
      status: StockStatus.Fixed,
    },
    {
      alpaca_Asset_Id: "21a5e17d-c566-4f1b-8c25-0a505ba37478",
      exchange: "NASDAQ",
      symbol: "EXC",
      name: "Stock name",
      cost_Basis: "37.17",
      qty: "1",
      status: StockStatus.Fixed,
    },
    {
      alpaca_Asset_Id: "69b15845-7c63-4586-b274-1cfdfe9df3d8",
      exchange: "NASDAQ",
      symbol: "GOOGL",
      name: "Stock name",
      cost_Basis: "171.82",
      qty: "1",
      status: StockStatus.Fixed,
    },
    {
      alpaca_Asset_Id: "8ccae427-5dd0-45b3-b5fe-7ba5e422c766",
      exchange: "NASDAQ",
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
  ) {}

  ngOnInit() {
    this.updatePage();
  }

  // sendMessage() {
  //   console.log("Id:", this.idInput, "Message:", this.messageInput);
  //   this.signalrService.sendMessage(this.idInput, this.messageInput);
  // }

  addStocks() {
    for (var stock of this.stocksToAdd) {
      let sub = this.stockService.addStock(stock).subscribe((res) => {
        console.log("Added:", res);
        sub.unsubscribe();
      });
    }

    // let stock: StockToAdd = {
    //   alpaca_Asset_Id: "69b15845-7c63-4586-b274-1cfdfe9df3d8",
    //   exchange: "NASDAQ",
    //   symbol: "GOOGL",
    //   name: "Stock name",
    //   cost_Basis: "171.82",
    //   qty: "1",
    //   status: StockStatus.Fixed,
    // };

    // let sub = this.stockService.addStock(stock).subscribe((res) => {
    //   console.log("Added:", res);
    //   sub.unsubscribe();
    // });
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
      user_Id: stock.userId,
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
      });
  }

  openBuyModal() {
    this.buyModalOn = this.buyModalOn === true ? false : true;
  }

  openSellModal(stock_id: string) {
    console.log(stock_id);

    console.log(
      "filtered stock to modal:",
      this.stocks.filter((s) => s.id.toString() === stock_id)[0]
    );
    this.sellModalStock = this.stocks.filter(
      (s) => s.id.toString() === stock_id
    )[0];
    this.sellModalOn = true;
  }
}
