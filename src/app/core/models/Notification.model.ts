export interface Notification {
  id: number;
  user_id: number;
  type: NotificationType;
  text: string;
  date_created: string;
  status: NotificationStatus;
}

export enum NotificationType {
  General = 1,
  Sell_Transaction = 2,
  Buy_Transaction = 3,
  Message = 4,
}

export enum NotificationStatus {
  Unread = 1,
  Read = 2,
}
