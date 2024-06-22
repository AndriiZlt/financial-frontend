import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { Stock } from "../models/Stock.model";
import { StockToAdd } from "../models/StockToAdd.model";
import { StockStatus } from "../models/StockStatus.model";

@Injectable({
  providedIn: "root",
})
export class StockApiService extends ApiService {
  apiName = "Stock";
  v = 1;

  getStocks(): Observable<Stock[]> {
    return this.get<Stock[]>("getstocks");
  }

  getBoardItems(): Observable<Stock[]> {
    return this.get<Stock[]>("getboard");
  }

  addStock(stock: StockToAdd): Observable<Stock> {
    return this.post<Stock>("addstock", stock);
  }

  // deleteStock(stock: number): Observable<Stock> {
  //   return this.delete<Stock>(`deletetask/${stock}`);
  // }

  updateStatus(stock: number, status: StockStatus): Observable<Stock> {
    return this.put<Stock>(`updatestatus/${stock}/${status}`, status);
  }

  buyStock(stock_id: number) {
    return this.put<Stock>(`buystock/${stock_id}`, stock_id);
  }

  // addToBoard(stock: Stock): Observable<Stock> {
  //   return this.put<Stock>(`updatestock`, stock);
  // }

  // updateStatus(taskId: number): Observable<Task> {
  //   return this.put<Task>(`updatestatus/${taskId}`, taskId);
  // }

  // updateTask(task: Task): Observable<Task> {
  //   return this.put<Task>('updatetask', task);
  // }
}
