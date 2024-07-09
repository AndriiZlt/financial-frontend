import { Component, OnDestroy, OnInit } from "@angular/core";
import { Login } from "../models/login.model";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { StateService } from "../../services/state.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginDto = new Login();
  submitted: boolean = false;
  valid: boolean = false;
  isDisabled: boolean = true;
  loginInput: string = "";
  passwordInput: string = "";
  user: User = new User();

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private stateService: StateService
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {}

  onSubmit(): void {
    console.log("Logging with:" + this.loginInput, " + ", this.passwordInput);
    this.loginDto.username = this.loginInput;
    this.loginDto.password = this.passwordInput;
    this.login(this.loginDto);
  }

  login(loginDto: Login) {
    let subscription = this.authService.login(loginDto).subscribe((user) => {
      this.user = user;
      this.stateService.setUser(<User>user);
      console.log("User:", user);
      localStorage.setItem("UserObject", JSON.stringify(this.user));
      this.router.navigate(["finapp"]);
      this.userService.saveData(this.user);
      subscription.unsubscribe();
    });
  }
}
