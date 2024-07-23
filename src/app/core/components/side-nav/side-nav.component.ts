import { Component, OnInit } from "@angular/core";
import { StocksService } from "./services/stocks.service";
import { BoardItemsService } from "./services/board-items.service";

declare var $;

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.scss"],
})
export class SideNavComponent implements OnInit {
  stocks: number;
  boardItems: number;
  constructor(
    private stocksService: StocksService,
    private boardItemsService: BoardItemsService
  ) {}

  ngOnInit() {
    $(document).ready(() => {
      $(".sidebar-menu").tree();
    });

    this.updateLabelsFromLocalStorage();

    this.subscribeForChanges();
  }

  updateLabelsFromLocalStorage(): void {
    let stocksLocalStorage = localStorage.getItem("stock-label");
    if (stocksLocalStorage) {
      this.stocks = Number(stocksLocalStorage);
    }

    let boardTiemsLocalStorage = localStorage.getItem("board-label");
    if (boardTiemsLocalStorage) {
      this.boardItems = Number(boardTiemsLocalStorage);
    }
  }

  subscribeForChanges(): void {
    this.stocksService
      .changeEventListenner()
      .subscribe((stocks) => (this.stocks = stocks));

    this.boardItemsService
      .changeEventListenner()
      .subscribe((boardItems) => (this.boardItems = boardItems));
  }
}
