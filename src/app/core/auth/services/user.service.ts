import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "@core/auth/models/user.model";
import { ApiService } from "@core/services/api.service";

@Injectable({
  providedIn: "root",
})
export class UserService extends ApiService {
  apiName = "User";
  v = 1;

  private userData = new BehaviorSubject<User>(new User());

  saveData(param: any): void {
    this.userData.next(param);
  }

  getData(): BehaviorSubject<any> {
    return this.userData;
  }

  getCurrentUser(): Observable<User> {
    return this.get<User>("getuser");
  }

  getUserBallance(): Observable<string> {
    return this.get<string>("getballance");
  }

}
