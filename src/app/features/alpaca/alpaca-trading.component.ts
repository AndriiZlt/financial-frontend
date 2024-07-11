import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { AlpacaService } from "../services/alpaca.service";
import * as nasdaq100 from "./assets/nasdaq100";
import { AssetToBuy } from "../models/AssetToBuy.model";
import { Asset } from "../models/Asset.model";
import { AlpacaTransaction } from "../models/AlpacaTransaction.model";
import { Order } from "../models/Order.model";

@Component({
  selector: "app-alpaca-trading",
  templateUrl: "./alpaca-trading.component.html",
  styleUrls: ["./alpaca-trading.component.scss"],
})
export class AlpacaTradingComponent implements OnInit {
  mainUserId: string = "d986b6ed-afda-464b-afb7-07e6fa9d7227";
  clientId: string = "d6a7ad49-7d27-47f8-99de-b87f61b6b024";
  orders: Order[] = [];
  transactions: AlpacaTransaction[] = [];
  assets: Asset[] = [];
  nasdaq100: string[];
  filteredAssets: string[];
  selectedAsset = new Object();
  selectedPrice: number;
  quantity: number = 1;
  inputValue: string;
  myControl = new FormControl();
  buttonDisabled: boolean = true;
  inputDisabled: boolean = true;

  constructor(private alpacaService: AlpacaService, private http: HttpClient) {
    this.nasdaq100 = nasdaq100.get();
  }

  ngOnInit(): void {
    this.updatePage();

    let subscription = this.alpacaService.getAssets().subscribe((data) => {
      for (const item in data) {
        if (this.nasdaq100.includes(data[item].symbol)) {
          this.assets.push(data[item]);
        }
      }

      this.filteredAssets = this.assets.map((asset) => asset.name);
      console.log("filteredAssets:", this.filteredAssets);
      subscription.unsubscribe();
    });

    let subscription2 = this.alpacaService.getAccount().subscribe((acc) => {
      console.log("Alpaca account:", acc.id);
      subscription2.unsubscribe();
    });
  }

  updatePage() {
    this.orders = [];
    let subscription = this.alpacaService.getOrders().subscribe((res) => {
      for (const item in res) {
        this.orders.push(res[item]);
      }
      subscription.unsubscribe();
    });

    this.transactions = [];
    let subscription2 = this.alpacaService.getActivity().subscribe((res) => {
      for (const item in res) {
        if (res[item].activity_type === "FILL") {
          this.transactions.push(res[item]);
        }
      }
      subscription2.unsubscribe();
    });
  }

  onSelectionChange(event: any): void {
    this.selectedAsset = this.assets.filter(
      (a) => a.name == event.option.value
    )[0];

    this.buttonDisabled = false;

    let subscriprion = this.alpacaService
      .getLastTrades(this.selectedAsset["symbol"])
      .subscribe((res) => {
        this.selectedPrice = Number(parseFloat(res["trade"].p).toFixed(2));
        subscriprion.unsubscribe();
      });
  }

  onInputChange(event: string): void {
    this.inputValue = event;
    this.filteredAssets = this.assets
      .filter(
        (a) =>
          a.name.toLowerCase().includes(event.toLowerCase()) ||
          a.symbol.toLowerCase().includes(event.toLowerCase())
      )
      .map((asset) => asset.name);
  }

  clearSelect(): void {
    this.inputValue = "";
    this.selectedPrice = null;
    this.selectedAsset = null;
    this.buttonDisabled = true;
    this.filteredAssets = this.assets.map((asset) => asset.name);
  }

  buyAsset() {
    let orderToCreate: AssetToBuy = {
      symbol: this.selectedAsset["symbol"],
      qty: this.quantity.toString(),
      side: "buy",
      type: "limit",
      limit_Price: this.selectedPrice.toString(),
      time_In_Force: "gtc",
    };

    let subscription = this.alpacaService
      .createOrder(orderToCreate)
      .subscribe((res) => {
        this.clearSelect();
        this.updatePage();
        subscription.unsubscribe();
      });
  }

  closeOrder(order_id: any) {
    let subscription = this.alpacaService
      .closeOrder(order_id)
      .subscribe((res) => {
        setTimeout(() => this.updatePage(), 500);
        subscription.unsubscribe();
      });
  }
}
