import { Component, OnInit } from "@angular/core";
import { BoardApiService } from "./services/board.service";
import { BoardItem } from "./models/BoardItem.model";
import { BoardItemsService } from "src/app/core/components/side-nav/services/board-items.service";

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
    private boardItemsService: BoardItemsService
  ) {}

  ngOnInit(): void {
    this.reloadPage();
  }

  reloadPage(): void {
    let sub = this.boardService.getBoardItems().subscribe((res) => {
      this.boardItems = [...(<BoardItem[]>res)];
      this.boardItemsService.triggerEvent(this.boardItems.length);
      this.isLoading = false;
      sub.unsubscribe();
    });
  }
}
