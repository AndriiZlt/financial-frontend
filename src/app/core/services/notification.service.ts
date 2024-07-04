import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { Notification } from "../models/Notification.model";

@Injectable({
  providedIn: "root",
})
export class NotificationApiService extends ApiService {
  apiName = "Notification";
  v = 1;

  getNotifications(): Observable<Notification[]> {
    return this.get<Notification[]>("getnotifications");
  }

  readNotification(id: number): Observable<Notification> {
    return this.put<Notification>(`updatenotification/${id}`, id);
  }
}
