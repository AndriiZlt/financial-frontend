import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Stock } from "../../models/Stock.model";
import { AlpacaService } from "src/app/features/services/alpaca.service";
import { SpinnerComponent } from "src/app/shared/components/spinner/spinner.component";

@Component({
  selector: "app-board-item",
  templateUrl: "./board-item.component.html",
  styleUrls: ["./board-item.component.scss"],
})
export class BoardItemComponent extends SpinnerComponent implements OnInit {
  @Input() item: Stock;
  @Input() index: number;
  @Output() sellStock: EventEmitter<any> = new EventEmitter<any>();
  positionName: string;
  currentPrice: string;
  nameIsLoading: boolean = true;
  priceIsLoading: boolean = true;
  userId: number;
  status: string;

  constructor(private alpacaService: AlpacaService) {
    super();
  }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("User"));
    console.log("Item", this.item, this.item.userId, this.userId);

    switch (this.item.status) {
      case 2:
        this.status = "For Sale";
        break;
      case 3:
        this.status = "For Purchase";
        break;
      default:
        console.log("Something wrong with the board item status")
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

  sendToBoard() {
    this.sellStock.emit(this.item);
  }
}
