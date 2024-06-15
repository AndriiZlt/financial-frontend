import { Component, OnInit } from "@angular/core";
import { Stock } from "../models/Stock.model";
import { AlpacaService } from "../services/alpaca.service";
import { HubConnectionService } from "src/app/core/services/hub-connection.service";
import { StockApiService } from "../services/stock.service";
import { StockToAdd } from "../models/StockToAdd.model";

@Component({
  selector: "app-portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.scss"],
})
export class PortfolioComponent implements OnInit {
  stocks: Stock[] = [];
  stock: Stock;
  isLoading: boolean = true;
  messageInput: string = "";
  idInput: string = "";

  constructor(
    private stockService: StockApiService,
    private signalrService: HubConnectionService
  ) {}

  ngOnInit() {
    this.updatePage();
    // this.addStock();
  }

  // sendMessage() {
  //   console.log("Id:", this.idInput, "Message:", this.messageInput);
  //   this.signalrService.sendMessage(this.idInput, this.messageInput);
  // }

  addStock() {
    let stockToAdd: StockToAdd = {
      alpaca_Asset_Id: "b0b6dd9d-8b9b-48a9-ba46-b9d54906e415",
      exchange: "NASDAQ",
      symbol: "AAPL",
      name: "Stock name",
      cost_Basis: "380.4",
      qty: "2",
      status: "none",
    };

    let sub = this.stockService.addStock(stockToAdd).subscribe((res) => {
      console.log("Add res:", res);
      sub.unsubscribe();
    });
  }

  // changeMessage(value: string) {
  //   console.log("Message change event:", value);
  //   this.messageInput = value;
  // }

  // changeId(value: string) {
  //   console.log("id change event:", value);
  //   this.idInput = value;
  // }

  updatePage(): void {
    this.isLoading = true;
    let sub = this.stockService.getStocks().subscribe((res) => {
      console.log("STOCKS:", res);
      // for (const item in res) {
      //   this.stocks.push(res[item]);
      // }
      // this.isLoading = false;
      // sub.unsubscribe();
    });
  }

  sellAsset(asset_id: string): void {
    // let stock:Stock
    // let sub = this.stockService.deleteStock(stok).subscribe((res) => {
    //   setTimeout(() => {
    //     this.updatePage();
    //     sub.unsubscribe();
    //   }, 500);
    // });
  }
}

// {
//   asset_Id: "b0b6dd9d-8b9b-48a9-ba46-b9d54906e415",
//   exchange: "NASDAQ",
//   symbol: "AAPL",
//   name: null,
//   cost_Basis: "380.4",
//   qty: "2",
// },
// {
//   asset_Id: "2ac633b5-b3a7-4ba6-975d-f0f1e12dd1e4",
//   exchange: "NASDAQ",
//   symbol: "ADBE",
//   name: null,
//   cost_Basis: "478.87",
//   qty: "1",
// },
// {
//   asset_Id: "e72fbd29-be6b-43c2-80c6-b6e80d5b23db",
//   exchange: "NASDAQ",
//   symbol: "ADI",
//   name: null,
//   cost_Basis: "231.78",
//   qty: "1",
// },
// {
//   asset_Id: "3302e560-6d33-4ad5-a429-4d573e26962c",
//   exchange: "NASDAQ",
//   symbol: "CPRT",
//   name: null,
//   cost_Basis: "53.36",
//   qty: "1",
// },
// {
//   asset_Id: "21a5e17d-c566-4f1b-8c25-0a505ba37478",
//   exchange: "NASDAQ",
//   symbol: "EXC",
//   name: null,
//   cost_Basis: "37.17",
//   qty: "1",
// },
// {
//   asset_Id: "2b7d41ee-36a4-4c7e-b783-896568c61ed0",
//   exchange: "NASDAQ",
//   symbol: "FTNT",
//   name: null,
//   cost_Basis: "59.33",
//   qty: "1",
// },
// {
//   asset_Id: "f30d734c-2806-4d0d-b145-f9fade61432b",
//   exchange: "NASDAQ",
//   symbol: "GOOG",
//   name: null,
//   cost_Basis: "174.79",
//   qty: "1",
// },
// {
//   asset_Id: "69b15845-7c63-4586-b274-1cfdfe9df3d8",
//   exchange: "NASDAQ",
//   symbol: "GOOGL",
//   name: null,
//   cost_Basis: "171.82",
//   qty: "1",
// },
// {
//   asset_Id: "0cf42aa3-9816-4f1f-aa84-6482ac9303e9",
//   exchange: "NASDAQ",
//   symbol: "INTC",
//   name: null,
//   cost_Basis: "29.97",
//   qty: "1",
// },
// {
//   asset_Id: "8ccae427-5dd0-45b3-b5fe-7ba5e422c766",
//   exchange: "NASDAQ",
//   symbol: "TSLA",
//   name: null,
//   cost_Basis: "519.18",
//   qty: "3",
// },
