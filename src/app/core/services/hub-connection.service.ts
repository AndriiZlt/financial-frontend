import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import * as signalR from "@aspnet/signalr";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HubConnectionService {
  connection: signalR.HubConnection;
  private notificationChange = new Subject<string>();
  user_id: string;
  private _apiUrl: string;

  constructor(private http: HttpClient) {
    this._apiUrl = environment.apiUrl;
    let user = localStorage.getItem("UserObject");
    if (user) {
      this.user_id = JSON.parse(user).id;
    }
  }

  startConnection = async () => {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${this._apiUrl}/signal-hub`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    await this.connection
      .start()
      .then(() => {
        this.connection.on("status", (res) => {
          console.log(`SignalR status:${res}`);
          this.registerUserId(this.user_id);
          this.notificationChangeListenerOn();
        });
      })
      .catch((err) => console.log("Error while starting connection:", err));
  };

  registerUserId(userId: string) {
    this.connection.invoke("Register", userId).catch((e) => console.log(e));
  }

  notificationChangeListenerOn() {
    this.connection.on("NewNotification", (res) => {
      console.log("SignalR New Notification:", res);
      this.notificationChange.next(res);
    });
  }

  getNotificationObservable(): Observable<string> {
    return this.notificationChange.asObservable();
  }
}
