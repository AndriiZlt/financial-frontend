import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { Stock } from "@portfolio/models/Stock.model";
import { StockToAdd } from "@portfolio/models/StockToAdd.model";
import { StockStatus } from "@portfolio/models/StockStatus.model";

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

  addEmptyStock(stock: StockToAdd): Observable<Stock> {
    return this.post<Stock>("createstock", stock);
  }

  updateStatus(stock: number, status: StockStatus): Observable<Stock> {
    return this.put<Stock>(`updatestatus/${stock}/${status}`, status);
  }
}
