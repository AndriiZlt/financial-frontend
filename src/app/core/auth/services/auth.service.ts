import { Injectable } from "@angular/core";
import { Login } from "@core/auth/models/login.model";
import { Register } from "@core/auth/models/register.model";
import { Observable } from "rxjs";
import { ApiService } from "@core/services/api.service";

@Injectable({
  providedIn: "root",
})
export class AuthService extends ApiService {
  apiName = "Auth";
  v = 2;

  register(user: Register): Observable<any> {
    return this.post("register", user);
  }

  login(user: Login): Observable<any> {
    return this.post("login", user);
  }
}
