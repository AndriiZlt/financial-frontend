import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { Transaction } from "@portfolio/models/Transaction.model";
import { TransactionToAdd } from "@portfolio/models/TransactionToAdd.model";

@Injectable({
  providedIn: "root",
})
export class TransactionApiService extends ApiService {
  apiName = "Transaction";
  v = 1;

  getTransactions(): Observable<Transaction[]> {
    return this.get<Transaction[]>("gettransactions");
  }

  addTransaction(transactionToAdd: TransactionToAdd): Observable<Transaction> {
    return this.post<Transaction>(`addtransaction`, transactionToAdd);
  }
}
