import { Component, OnInit } from "@angular/core";
import { UserService } from "../../auth/services/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  userName: string = "";

  constructor(private userService: UserService) {}

  ngOnInit() {
    let username = localStorage.getItem("Username");
    if (username) {
      this.userName = username;
      console.log("userName:", this.userName);
    }
  }
}
