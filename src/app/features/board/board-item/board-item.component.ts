import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SpinnerComponent } from "src/app/shared/components/spinner/spinner.component";
import { BoardItem } from "../../models/BoardItem.model";
import { TransactionToAdd } from "../../models/TransactionToAdd.model";
import { StockStatus } from "../../models/StockStatus.model";
import { DatePipe } from "@angular/common";
import { TransactionApiService } from "../../services/transaction.service";

@Component({
  selector: "app-board-item",
  templateUrl: "./board-item.component.html",
  styleUrls: ["./board-item.component.scss"],
})
export class BoardItemComponent extends SpinnerComponent implements OnInit {
  @Input() boardItem: BoardItem;
  @Input() index: number;
  @Output() reloadPage: EventEmitter<any> = new EventEmitter<any>();
  positionName: string;
  currentPrice: string;
  nameIsLoading: boolean = true;
  priceIsLoading: boolean = true;
  user_Id: number;
  status: string = "";

  constructor(
    private transactionService: TransactionApiService,
    private datePipe: DatePipe
  ) {
    super();
  }

  ngOnInit(): void {
    this.user_Id = Number(localStorage.getItem("User"));

    switch (this.boardItem.status) {
      case 2:
        this.status = "For Sale";
        break;
      case 3:
        this.status = "For Purchase";
        break;
      default:
        console.log(
          "Something wrong with the board item status",
          this.boardItem.status
        );
    }
  }

  onBuyClick(event: any): void {
    if (
      event.target.innerHTML.includes("Buy") ||
      event.target.innerHTML.includes("Sell")
    ) {
      let currentUserId: string = localStorage.getItem("User");
      let transaction: TransactionToAdd = {
        stock_Id: this.boardItem.stock_Id,
        symbol: this.boardItem.symbol,
        qty: this.boardItem.qty,
        price: this.boardItem.cost_Basis,
        seller_User_Id:
          this.boardItem.status === StockStatus.For_Sale
            ? this.boardItem.user_Id
            : Number(currentUserId),
        buyer_User_Id:
          this.boardItem.status === StockStatus.For_Purchase
            ? this.boardItem.user_Id
            : Number(currentUserId),
        name: this.boardItem.name,
      };

      this.transactionService.addTransaction(transaction).subscribe((res) => {
        console.log("Ok - addTransaction response:", res);
        this.reloadPage.emit();
      });
    }
  }
}
