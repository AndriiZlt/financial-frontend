import { Pipe, PipeTransform } from "@angular/core";
import { Notification } from "../models/Notification.model";

@Pipe({
  name: "sortNotifications",
})
export class NotificationPipe implements PipeTransform {
  transform(notifications: Notification[]): Notification[] {
    if (notifications) {
      let dateSortedNotifications: Notification[] = notifications.sort(
        (a, b) => b.id - a.id
      );
      let statusSortedNotifications: Notification[] =
        dateSortedNotifications.sort((a, b) => a.status - b.status);
      return statusSortedNotifications;
    } else {
      return [];
    }
  }
}
