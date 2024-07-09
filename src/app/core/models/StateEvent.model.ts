import { Stock } from "src/app/features/models/Stock.model";
import { Notification } from "./Notification.model";

export interface StateChangeEvent {
  entity: EventEntityType;
  payload: Notification[] | Stock[];
}

export enum EventEntityType {
  notifications = 1,
  stocks = 2,
}
