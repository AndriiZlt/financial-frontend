import { Component, OnInit } from "@angular/core";
import { HubConnectionService } from "../services/hub-connection.service";
import { UserService } from "../auth/services/user.service";
import { User } from "../auth/models/user.model";
import { StateService } from "../services/state.service";

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
    private userService: UserService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    window.dispatchEvent(new Event("resize"));
    $("body").addClass("hold-transition skin-blue sidebar-mini");

    this.signalrService.startConnection();
    this.userService.getCurrentUser().subscribe((user) => {
      this.stateService.setUser(<User>user);
      this.user = user;
    });
  }
}
