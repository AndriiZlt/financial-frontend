import { Component, OnDestroy, OnInit } from "@angular/core";
import { Login } from "../models/login.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { LoginNameService } from "../services/loginName.service";
import { Router } from "@angular/router";

declare var $;

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

  constructor(
    private router: Router,
    private authService: AuthService,
    private loginNameService: LoginNameService
  ) {}

  ngOnInit() {
    $("body").addClass("hold-transition login-page");
    $(() => {
      $("input").iCheck({
        checkboxClass: "icheckbox_square-blue",
        radioClass: "iradio_square-blue",
        increaseArea: "20%" /* optional */,
      });
    });
  }

  ngOnDestroy(): void {
    $("body").removeClass("hold-transition login-page");
  }

  onSubmit(): void {
    console.log("Logging in:" + this.loginInput, " + ", this.passwordInput);

    this.loginDto.username = this.loginInput;
    this.loginDto.password = this.passwordInput;

    this.login(this.loginDto);
  }

  login(loginDto: Login) {
    let subscription = this.authService.login(loginDto).subscribe((jwtDto) => {
      console.log("User:", jwtDto);
      localStorage.setItem("token", jwtDto.token);
      localStorage.setItem("User", jwtDto.id);
      this.router.navigate(["finapp"]);
      this.loginNameService.triggerEvent(loginDto.username);
      subscription.unsubscribe();
    });
  }

  // onFormChange(): void {
  //   this.submitted = true;
  //   if (this.loginInput) {
  //     this.isDisabled = true;
  //   } else {
  //     this.isDisabled = false;
  //   }
  // }
}
