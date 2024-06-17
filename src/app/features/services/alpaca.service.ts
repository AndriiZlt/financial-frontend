import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AssetToBuy } from "../board/models/AssetToBuy.model";
import { Observable } from "rxjs";
import { Asset } from "../board/models/Asset.model";
import { ApiService } from "src/app/core/services/api.service";
import { environment } from "src/environments/environment";
import { Stock } from "../board/models/Stock.model";
import { Transaction } from "../board/models/Transaction.model";
import { Bar } from "../board/models/Bar.model";
import { Account } from "../board/models/Account.model";
import { Order } from "../board/models/Order.model";

@Injectable({
  providedIn: "root",
})
export class AlpacaService extends ApiService {
  headers = new HttpHeaders({
    "APCA-API-KEY-ID": environment.API_KEY_ID,
    "APCA-API-SECRET-KEY": environment.API_SECRET_KEY,
  });

  apiName = "Alpaca";
  v = 1;

  getAssets(): Observable<Asset[]> {
    return this.get<Asset[]>(`assets`, {
      headers: this.headers,
    });
  }

  getAssetById(asset_id: string): Observable<Asset> {
    return this.get<Asset>(`asset/${asset_id}`, {
      headers: this.headers,
    });
  }

  getPositions(): Observable<Stock[]> {
    return this.get<Stock[]>(`positions`, {
      headers: this.headers,
    });
  }

  closePosition(asset_id: string): Observable<Stock> {
    return this.delete<Stock>(`position/${asset_id}`, {
      headers: this.headers,
    });
  }

  getActivity(): Observable<Transaction> {
    return this.get<Transaction>(`transactions`, {
      headers: this.headers,
    });
  }

  getAssetData(symbol: string): Observable<Bar[]> {
    return this.get<Bar[]>(`bars/${symbol}`, {
      headers: this.headers,
    });
  }

  getAccount(): Observable<Account> {
    return this.get<Account>(`account`, {
      headers: this.headers,
    });
  }

  getOrders(): Observable<Order[]> {
    return this.get<Order[]>(`orders`, {
      headers: this.headers,
    });
  }

  createOrder(order: AssetToBuy): Observable<AssetToBuy> {
    return this.post<AssetToBuy>(`order`, order, {
      headers: this.headers,
    });
  }

  closeOrder(order_id: string): Observable<Order> {
    return this.delete<Order>(`orders/${order_id}`, {
      headers: this.headers,
    });
  }

  getLastTrades(symbol: string): Observable<any[]> {
    return this.get<any[]>(`trades/${symbol}`, {
      headers: this.headers,
    });
  }

  getLastBar(symbol: string): Observable<any> {
    return this.get<any>(`lastbar/${symbol}`, {
      headers: this.headers,
    });
  }
}
