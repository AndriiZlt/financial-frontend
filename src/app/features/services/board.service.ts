import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { BoardItemToAdd } from "../models/BoardItemToAdd.model";
import { BoardItem } from "../models/BoardItem.model";
import { Stock } from "../models/Stock.model";

@Injectable({
  providedIn: "root",
})
export class BoardApiService extends ApiService {
  apiName = "Board";
  v = 1;

  getBoardItems(): Observable<BoardItem[]> {
    return this.get<BoardItem[]>("getboard");
  }

  addSellToBoard(itemToAdd: BoardItemToAdd): Observable<BoardItem> {
    console.log("New item to Sell:", itemToAdd);
    return this.post<BoardItem>(`addboard`, itemToAdd);
  }

  removeSellFromBoard() {}

  addBuyToBoard(stockToAdd: Stock): Observable<BoardItem> {
    console.log("New item to Buy:", stockToAdd);
    return this.post<BoardItem>(`addboard`, stockToAdd);
  }

  removeBuyFromBoard() {}

  // addStock(stock: StockToAdd): Observable<Stock> {
  //   return this.post<Stock>("addstock", stock);
  // }

  // deleteStock(stockId: number): Observable<Stock> {
  //   return this.delete<Stock>(`deletetask/${stockId}`);
  // }

  // updateStatus(taskId: number): Observable<Task> {
  //   return this.put<Task>(`updatestatus/${taskId}`, taskId);
  // }

  // updateTask(task: Task): Observable<Task> {
  //   return this.put<Task>('updatetask', task);
  // }
}
