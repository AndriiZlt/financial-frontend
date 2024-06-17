import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { Stock } from "../board/models/Stock.model";
import { StockToAdd } from "../board/models/StockToAdd.model";
import { BoardItem } from "../board/models/BoardItem.model";

@Injectable({
  providedIn: "root",
})
export class StockApiService extends ApiService {
  apiName = "Stock";
  v = 1;

  getStocks(): Observable<Stock[]> {
    return this.get<Stock[]>("getstocks");
  }

  addStock(stock: StockToAdd): Observable<Stock> {
    return this.post<Stock>("addstock", stock);
  }

  deleteStock(stockId: number): Observable<Stock> {
    return this.delete<Stock>(`deletetask/${stockId}`);
  }

  addToBoard(stockId: number): Observable<BoardItem> {
    return this.post<BoardItem>(`addboard/${stockId}`, stockId);
  }

  // updateStatus(taskId: number): Observable<Task> {
  //   return this.put<Task>(`updatestatus/${taskId}`, taskId);
  // }

  // updateTask(task: Task): Observable<Task> {
  //   return this.put<Task>('updatetask', task);
  // }
}
