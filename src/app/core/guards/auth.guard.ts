import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private location: Location) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let token: string;
    let user = localStorage.getItem("UserObject");
    if (user) {
      token = JSON.parse(user).token;
    }
    let lastUrl = localStorage.getItem("lastUrl");

    if (token) {
      this.router.navigate(["finapp/portfolio"]);
      return false;
    } else {
      return true;
    }
  }
}
