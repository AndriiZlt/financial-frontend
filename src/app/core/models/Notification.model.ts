export interface Notification {
  id: number;
  user_id: number;
  type: notificationType;
  text: string;
  date_created: string;
  status: notificationStatus;
}

export enum notificationType {
  General = 1,
  Sell_Transaction = 2,
  Buy_Transaction = 3,
  Message = 4,
}

export enum notificationStatus {
  Unread = 1,
  Read = 2,
}
