import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

// transfer number of public board items to the side-nav component
@Injectable({
  providedIn: "root",
})
export class BoardItemsService {
  private subject = new BehaviorSubject<any>(undefined);

  triggerEvent(param: any): void {
    this.subject.next(param);
    localStorage.setItem("board-label", param);
  }

  changeEventListenner(): BehaviorSubject<any> {
    return this.subject;
  }
}
