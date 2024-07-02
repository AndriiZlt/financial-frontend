import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SpinnerComponent } from "src/app/shared/components/spinner/spinner.component";
import { BoardItem } from "../../models/BoardItem.model";
import { TransactionToAdd } from "../../models/TransactionToAdd.model";
import { StockStatus } from "../../models/StockStatus.model";
import { TransactionApiService } from "../../services/transaction.service";
import { StockApiService } from "../../services/stock.service";
import { UserService } from "src/app/core/auth/services/user.service";

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
    private stockService: StockApiService,
    private userService: UserService
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

  onBtnClick(event: any): void {
    let currentUserId: string = localStorage.getItem("User");

    // Sell=>Buy transaction
    if (event.target.innerHTML.includes("Buy")) {
      //Check ballance
      let ballance: number;
      let sub = this.userService.getCurrentUser().subscribe((res) => {
        console.log("Ok - Current user ballance:", res.ballance);
        ballance = res.ballance;

        if (ballance >= Number(this.boardItem.cost_Basis)) {
          // Perform transaction if the ballance is ok
          this.createTransaction(0);
        } else {
          console.log("Insufficient ballance!");
        }
        sub.unsubscribe();
      });
    } else if (event.target.innerHTML.includes("Sell")) {
      // Buy=>Sell transaction
      // Checking if there're any stocks to sell
      let sub = this.stockService.getStocks().subscribe((res) => {
        let stockToSell = res.filter((s) => s.symbol === this.boardItem.symbol);
        if (stockToSell.length > 0) {
          if (stockToSell[0].qty >= this.boardItem.qty) {
            // If ok - perform transaction
            this.createTransaction(stockToSell[0].id);
          }
        } else {
          console.log(
            `You don't have any ${this.boardItem.symbol} stock to sell!`
          );
        }
        sub.unsubscribe();
      });
    } else {
      console.log(
        "No transaction was created. Something wrong with button name"
      );
    }
  }

  createTransaction(stockId: number) {
    let currentUserId: string = localStorage.getItem("User");

    let transaction: TransactionToAdd = {
      symbol: this.boardItem.symbol,
      qty: this.boardItem.qty,
      cost_Basis: this.boardItem.cost_Basis,
      total_Price: (
        Number(this.boardItem.qty) * Number(this.boardItem.cost_Basis)
      ).toString(),
      seller_User_Id:
        this.boardItem.status === StockStatus.For_Sale
          ? this.boardItem.user_Id
          : Number(currentUserId),
      seller_Stock_Id:
        this.boardItem.status === StockStatus.For_Sale
          ? this.boardItem.stock_Id
          : stockId,
      buyer_User_Id:
        this.boardItem.status === StockStatus.For_Purchase
          ? this.boardItem.user_Id
          : Number(currentUserId),
      buyer_Stock_Id:
        this.boardItem.status === StockStatus.For_Purchase
          ? this.boardItem.stock_Id
          : stockId,
      name: this.boardItem.name,
      board_Item_Id: this.boardItem.id,
    };
    let sub2 = this.transactionService
      .addTransaction(transaction)
      .subscribe((res) => {
        console.log("Ok - addTransaction response:", res);
        this.reloadPage.emit();
        sub2.unsubscribe();
      });
  }
}
