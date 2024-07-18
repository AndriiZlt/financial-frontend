import { Component, OnInit } from "@angular/core";
import { HubConnectionService } from "@core/services/hub-connection.service";
import { UserService } from "@core/auth/services/user.service";
import { User } from "@core/auth/models/user.model";

declare var $;

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"],
})
export class MainLayoutComponent implements OnInit {
  signalRStatus: string = "";
  user: User;

  constructor(
    private signalrService: HubConnectionService,
    private userService: UserService
  ) {}

  ngOnInit() {
    window.dispatchEvent(new Event("resize"));
    $("body").addClass("hold-transition skin-blue sidebar-mini");

    this.signalrService.startConnection();
    this.userService.getCurrentUser().subscribe((user) => {
      this.user = user;
      console.log("User:", this.user);
    });
  }
}
