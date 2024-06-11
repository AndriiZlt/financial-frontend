import { Component, OnInit } from "@angular/core";
import { Stock } from "../models/Stock.model";
import { AlpacaService } from "../services/alpaca.service";

@Component({
  selector: "app-my-assets",
  templateUrl: "./my-assets.component.html",
  styleUrls: ["./my-assets.component.scss"],
})
export class MyAssetsComponent implements OnInit {
  stocks: Stock[] = [
    {
      asset_Id: "1",
      name: "stock_1",
      cost_Basis: "123.45",
      exchange: "asasas",
      qty: "1",
      symbol: "AAA",
    },
    {
      asset_Id: "2",
      name: "stock_2",
      cost_Basis: "123.45",
      exchange: "asasas",
      qty: "1",
      symbol: "BBB",
    },
    {
      asset_Id: "3",
      name: "stock_3",
      cost_Basis: "123.45",
      exchange: "asasas",
      qty: "1",
      symbol: "CCC",
    },
  ];
  stock: Stock;
  isLoading: boolean = true;

  constructor(private alpacaService: AlpacaService) {}

  ngOnInit() {
    this.updatePage();
  }

  updatePage(): void {
    this.isLoading = true;
    this.stocks = [];
    let sub = this.alpacaService.getPositions().subscribe((res) => {
      for (const item in res) {
        this.stocks.push(res[item]);
      }
      this.isLoading = false;
      sub.unsubscribe();
    });
  }

  sellAsset(asset_id: string): void {
    let sub = this.alpacaService.closePosition(asset_id).subscribe((res) => {
      setTimeout(() => {
        this.updatePage();
        sub.unsubscribe();
      }, 500);
    });
  }
}
