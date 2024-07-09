import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { Notification } from "../models/Notification.model";

@Injectable({
  providedIn: "root",
})
export class NotificationApiService extends ApiService {
  apiName = "Notification";
  v = 1;
  private eventSubject = new BehaviorSubject<any>(undefined);

  getNotifications(): Observable<Notification[]> {
    return this.get<Notification[]>("getnotifications");
  }

  readNotification(id: number): Observable<Notification> {
    return this.put<Notification>(`readnotification/${id}`, id);
  }

  triggerEvent(param: any): void {
    this.eventSubject.next(param);
  }

  changeEventListenner(): BehaviorSubject<any> {
    return this.eventSubject;
  }

}
