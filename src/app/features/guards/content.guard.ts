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
export class ContentGuard implements CanActivate {
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

    if (token) {
      return true;
    } else {
      localStorage.clear();
      this.router.navigate(["login"]);
      return false;
    }
  }
}
