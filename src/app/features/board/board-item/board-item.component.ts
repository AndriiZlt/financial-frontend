import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SpinnerComponent } from "src/app/shared/components/spinner/spinner.component";
import { BoardItem } from "@board/models/BoardItem.model";
import { TransactionToAdd } from "@portfolio/models/TransactionToAdd.model";
import { StockStatus } from "@portfolio/models/StockStatus.model";
import { TransactionApiService } from "@portfolio/services/transaction.service";
import { StockApiService } from "@portfolio/services/stock.service";
import { UserService } from "src/app/core/auth/services/user.service";
import { BoardApiService } from "../services/board.service";

@Component({
  selector: "app-board-item",
  templateUrl: "./board-item.component.html",
  styleUrls: ["./board-item.component.scss"],
})
export class BoardItemComponent extends SpinnerComponent implements OnInit {
  @Input() boardItem: BoardItem;
  @Input() index: number;
  @Output() updatePage: EventEmitter<any> = new EventEmitter<any>();
  positionName: string;
  currentPrice: string;
  nameIsLoading: boolean = true;
  priceIsLoading: boolean = true;
  user_id: number;
  status: string = "";

  constructor(
    private transactionService: TransactionApiService,
    private stockService: StockApiService,
    private userService: UserService,
    private boardService: BoardApiService
  ) {
    super();
  }

  ngOnInit(): void {
    let user = localStorage.getItem("UserObject");
    if (user) {
      this.user_id = Number(JSON.parse(user).id);
    }

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
    // Sell=>Buy transaction
    if (event.target.innerHTML.includes("Buy")) {
      //Check ballance
      let ballance: number;
      let sub = this.userService.getCurrentUser().subscribe((res) => {
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
          : this.user_id,
      seller_Stock_Id:
        this.boardItem.status === StockStatus.For_Sale
          ? this.boardItem.stock_Id
          : stockId,
      buyer_User_Id:
        this.boardItem.status === StockStatus.For_Purchase
          ? this.boardItem.user_Id
          : this.user_id,
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
        this.updatePage.emit();
        sub2.unsubscribe();
      });
  }

  cancelOrder(id: number): void {
    this.boardService.deleteBoardItem(id).subscribe((res) => {
      console.log("Board item deleted: ", id);
    });
  }
}
