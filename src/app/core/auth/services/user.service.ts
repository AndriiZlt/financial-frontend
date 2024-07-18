import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";
import { ApiService } from "../../services/api.service";
import { catchError } from "rxjs/operators";

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
    return this.get<string>("getballance").pipe(catchError(this.handleError));;
  }

  handleError(error) {
    switch (error.status) {
      case 401:
        localStorage.clear();
        this.router.navigate(["login"]);
    }

    return throwError(error.status + error.message || "Server Error");
  }
}
