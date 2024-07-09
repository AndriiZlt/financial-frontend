import { Component, OnInit } from "@angular/core";
import { NotificationApiService } from "../../services/notification.service";
import {
  Notification,
  NotificationStatus,
} from "../../models/Notification.model";
import { HubConnectionService } from "../../services/hub-connection.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  providers: [DatePipe],
})
export class HeaderComponent implements OnInit {
  userName: string = "";
  notifications: Notification[];
  newNotifications: number = 0;

  constructor(
    private notificationService: NotificationApiService,
    private hubConnectionService: HubConnectionService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    let user = localStorage.getItem("UserObject");
    if (user) {
      this.userName = JSON.parse(user).userName;
    }

    this.getNotifications();
    this.hubConnectionService.getNotificationObservable().subscribe(() => {
      this.getNotifications();
    });
  }

  getNotifications(): void {
    this.notificationService.getNotifications().subscribe((res) => {
      this.notifications = <Notification[]>res;
      this.newNotifications = this.notifications.filter(
        (n) => n.status === NotificationStatus.Unread
      ).length;
      console.log("NOTIFICATIONS:", this.notifications);
    });
  }

  readNotification(id): void {
    console.log(id);

    if (this.notifications.filter((n) => n.id).length > 0) {
      let notification = this.notifications.filter((n) => n.id)[0];
      if (notification.status !== 2) {
        this.notificationService
          .readNotification(id)
          .subscribe((res) => console.log(res));
      } else {
        console.log("The notification is already read");
      }
    }
  }

  markAllRead(): void {
    for (let notification of this.notifications) {
      if (notification.status !== 2) {
        this.notificationService
          .readNotification(notification.id)
          .subscribe((res) => console.log(res));
      }
    }
  }
}
