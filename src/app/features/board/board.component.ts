import { Component, OnInit } from "@angular/core";
import { Stock } from "../models/Stock.model";
import { StockApiService } from "../services/stock.service";
import { BoardApiService } from "../services/board.service";
import { BoardItem } from "../models/BoardItem.model";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
})
export class BoardComponent implements OnInit {
  boardItems: BoardItem[] = [];
  isLoading: boolean = true;
  constructor(
    private boardService: BoardApiService,
    private stockService: StockApiService
  ) {}

  ngOnInit(): void {
    this.reloadPage();
  }

  reloadPage(): void {
    let sub = this.boardService.getBoardItems().subscribe((res) => {
      this.boardItems = [...res];
      console.log("BOARD ITEMS:", this.boardItems);
      this.isLoading = false;
      sub.unsubscribe();
    });
  }
}
