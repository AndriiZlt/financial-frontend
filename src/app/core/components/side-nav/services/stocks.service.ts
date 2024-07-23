import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

// transfer number of stocks to the side-nav component
@Injectable({
  providedIn: "root",
})
export class StocksService {
  private subject = new BehaviorSubject<any>(undefined);

  triggerEvent(param: any): void {
    this.subject.next(param);
    localStorage.setItem("stock-label", param);
  }

  changeEventListenner(): BehaviorSubject<any> {
    return this.subject;
  }
}
