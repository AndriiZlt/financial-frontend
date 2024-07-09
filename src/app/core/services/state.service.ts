import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { NotificationApiService } from "./notification.service";
import { Notification } from "../models/Notification.model";
import { EventEntityType, StateChangeEvent } from "../models/StateEvent.model";
import { User } from "../auth/models/user.model";

@Injectable({
  providedIn: "root",
})
export class StateService {
  private stateChange = new BehaviorSubject<any>(undefined);
  private state: any = {
    user: User,
  };

  constructor(private notificationService: NotificationApiService) {
    
  }

  triggerEvent(param: StateChangeEvent): void {
    switch (param.entity) {
      case EventEntityType.notifications:
        this.notificationService.getNotifications().subscribe((res) => {
          this.stateChange.next({
            entity: "notifications",
            payload: <Notification[]>res,
          });
        });
        break;
      default:
        console.log(`Unknown entity name in StateService :${param}`);
    }

    this.stateChange.next(param);
  }

  changeEventListenner(): BehaviorSubject<any> {
    return this.stateChange;
  }

  setUser(user): void {
    this.state.user = user;
  }

  getUser(): any {
    return this.state.user;
  }
}
