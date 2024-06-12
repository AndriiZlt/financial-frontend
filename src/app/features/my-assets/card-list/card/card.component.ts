import { Component, Input, OnInit } from "@angular/core";
import { Stock } from "src/app/features/models/Stock.model";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  @Input() stock: Stock;
  @Input() index: number;
  constructor() {}

  ngOnInit(): void {}
}
