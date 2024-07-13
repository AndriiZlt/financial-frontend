import { Component, Input, OnInit } from "@angular/core";
import { AlpacaService } from "../services/alpaca.service";
import { SpinnerComponent } from "src/app/shared/components/spinner/spinner.component";

import { AlpacaTransaction } from "../models/AlpacaTransaction.model";

@Component({
  selector: "app-transaction-card",
  templateUrl: "./transaction-card.component.html",
  styleUrls: ["./transaction-card.component.scss"],
})
export class TransactionComponent extends SpinnerComponent implements OnInit {
  @Input() transaction: AlpacaTransaction;
  name: string;
  currentPrice: string;
  date: string;
  isLoading: boolean = true;

  constructor(private alpacaService: AlpacaService) {
    super();
  }

  ngOnInit(): void {
    let date = new Date(this.transaction.transaction_Time);
    let dateUTC = date.toUTCString();
    this.date = dateUTC.substring(0, dateUTC.length - 4);
    // Getting full name of the asset
    let sub = this.alpacaService
      .getAssetById(this.transaction.symbol)
      .subscribe((res) => {
        this.isLoading = false;
        this.name = res["name"];
        sub.unsubscribe();
      });

    // Getting current price of the stock
    let sub2 = this.alpacaService
      .getLastTrades(this.transaction.symbol)
      .subscribe((res) => {
        this.currentPrice = res["trade"].p;
        sub2.unsubscribe();
      });
  }
}
