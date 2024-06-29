import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor() {}

  private userData = new BehaviorSubject<User>(new User());

  saveData(param: any): void {
    this.userData.next(param);
  }

  getData(): BehaviorSubject<any> {
    return this.userData;
  }
}
