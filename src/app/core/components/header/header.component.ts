import { Component, OnInit } from "@angular/core";
import { UserService } from "../../auth/services/user.service";
import { NotificationApiService } from "../../services/notification.service";
import {
  Notification,
  notificationStatus,
  notificationType,
} from "../../models/Notification.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  userName: string = "";
  notifications: Notification[];
  newNotifications: number = 0;

  constructor(
    private userService: UserService,
    private notificationService: NotificationApiService
  ) {}

  ngOnInit() {
    let username = localStorage.getItem("Username");
    if (username) {
      this.userName = username;
      console.log("USERNAME:", this.userName);
    }

    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationService.getNotifications().subscribe((res) => {
      this.notifications = [...(<Notification[]>res)];
      this.newNotifications = this.notifications.filter(
        (n) => n.status === notificationStatus.Unread
      ).length;
      console.log("NOTIFICATIONS:", this.notifications);
    });
  }
}
