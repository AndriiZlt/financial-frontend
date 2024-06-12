import { Component, Input, OnInit } from "@angular/core";
import { Stock } from "../../models/Stock.model";

@Component({
  selector: "app-card-list",
  templateUrl: "./card-list.component.html",
  styleUrls: ["./card-list.component.scss"],
})
export class CardListComponent implements OnInit {
  @Input() stocks: Stock[];
  constructor() {}

  ngOnInit(): void {}

  sellAsset(asset: any) {
    console.log("sell esset", asset);
  }
}
