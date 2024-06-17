import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { BoardItemToAdd } from "../board/models/BoardItemToAdd.model";
import { BoardItem } from "../board/models/BoardItem.model";
import { Stock } from "../board/models/Stock.model";

@Injectable({
  providedIn: "root",
})
export class BoardApiService extends ApiService {
  apiName = "Board";
  v = 1;

  getBoardItems(): Observable<BoardItem[]> {
    return this.get<BoardItem[]>("getboard");
  }

  addToBoard(stockToAdd: Stock): Observable<BoardItem> {
    let newItemToAdd: BoardItemToAdd = {
      stock_Id: stockToAdd.id,
      user_Id: stockToAdd.userId,
      symbol: stockToAdd.symbol,
      name: stockToAdd.name,
      cost_Basis: stockToAdd.cost_Basis,
      qty: stockToAdd.qty,
      side: "sell",
    };
    console.log("New item to Add:", newItemToAdd);
    return this.post<BoardItem>(`addboard`, newItemToAdd);
  }

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
