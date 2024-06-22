import { Component, OnInit } from "@angular/core";
import { BoardApiService } from "../services/board.service";
import { Stock } from "../models/Stock.model";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
})
export class BoardComponent implements OnInit {
  boardItems: Stock[] = [];
  isLoading: boolean = true;
  constructor(private boardService: BoardApiService) {}

  ngOnInit(): void {
    let sub = this.boardService.getBoardItems().subscribe((res) => {
      this.boardItems = [...res];
      console.log("BOARD ITEMS:", this.boardItems);
      this.isLoading = false;
      sub.unsubscribe();
    });
  }

  sellStock(event) {
    console.log("Sell stock:", event);
  }
}
