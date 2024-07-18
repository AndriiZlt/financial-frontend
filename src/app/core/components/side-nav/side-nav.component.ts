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
  stocks: number = 0;
  boardItems: number = 0;
  constructor(
    private stocksService: StocksService,
    private boardItemsService: BoardItemsService
  ) {}

  ngOnInit() {
    $(document).ready(() => {
      $(".sidebar-menu").tree();
    });

    this.stocksService
      .changeEventListenner()
      .subscribe((stocks) => (this.stocks = stocks));

    this.boardItemsService
      .changeEventListenner()
      .subscribe((boardItems) => (this.boardItems = boardItems));
  }
}
