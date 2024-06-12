import { Component, OnInit } from "@angular/core";
import { HubConnectionService } from "../../services/hub-connection.service";

declare var $;

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.scss"],
})
export class PagesComponent implements OnInit {
  signalRStatus: string = "";
  constructor(private signalrService: HubConnectionService) {}

  ngOnInit() {
    this.signalrService.startConnection();
    this.signalrService.getData().subscribe((param: any) => {
      this.signalRStatus = param.text;

      this.signalrService.saveId(Number(Date.now().toString().slice(6, 12)));

      console.log("signalRStatus", this.signalRStatus);
    });
    window.dispatchEvent(new Event("resize"));
    $("body").addClass("hold-transition skin-blue sidebar-mini");
  }
}
