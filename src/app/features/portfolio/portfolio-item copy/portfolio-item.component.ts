import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Stock } from "../models/Stock.model";
import { AlpacaService } from "src/app/features/services/alpaca.service";
import { SpinnerComponent } from "src/app/shared/components/spinner/spinner.component";

@Component({
  selector: "app-stock-card",
  templateUrl: "./portfolio-item.component.html",
  styleUrls: ["./portfolio-item.component.scss"],
})
export class PortfolioItemComponent extends SpinnerComponent implements OnInit {
  @Input() stock: Stock;
  @Input() index: number;
  @Output() sellStock: EventEmitter<any> = new EventEmitter<any>();
  positionName: string;
  currentPrice: string;
  nameIsLoading: boolean = true;
  priceIsLoading: boolean = true;
  status: string;

  constructor(private alpacaService: AlpacaService) {
    super();
  }

  ngOnInit(): void {
    switch (this.stock.status) {
      case 1:
        this.status = "Fixed";
        break;
      case 2:
        this.status = "For Sale";
        break;
      case 3:
        this.status = "For Purchase";
        break;
      default:
        console.log("Something wrong with the portfolio item status");
        this.status = "";
    }
    // console.log("Stock:", this.stock);
    // Getting full name of the order
    // let sub = this.alpacaService
    //   .getAssetById(this.stock.symbol)
    //   .subscribe((res) => {
    //     this.positionName = res.name;
    //     this.nameIsLoading = false;
    //     sub.unsubscribe();
    //   });
    // Getting current price of the asset
    // let sub2 = this.alpacaService
    //   .getLastTrades(this.stock.symbol)
    //   .subscribe((res) => {
    //     this.currentPrice = res["trade"].p;
    //     this.priceIsLoading = false;
    //     sub2.unsubscribe();
    //   });
  }

  onSellClick(event) {
    this.sellStock.emit(event.currentTarget.id);
    // this.sellStock.emit(this.stock.id);
  }

  onBeingSoldClick() {
    console.log("onBeingSoldClick");
  }

  onBuyOrderClick() {
    console.log("onBuyOrderClick");
  }
}
