import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AlpacaService } from "../services/alpaca.service";
import { Order } from "../models/Order.model";

@Component({
  selector: "app-order-card",
  templateUrl: "./order-card.component.html",
  styleUrls: ["./order-card.component.scss"],
})
export class OrderCardComponent implements OnInit {
  @Input() order: Order;
  @Output() closeOrder: EventEmitter<any> = new EventEmitter<any>();
  orderName: string;
  currentPrice: string;

  constructor(private alpacaService: AlpacaService) {}

  ngOnInit(): void {
    // Getting full name of the order
    let sub = this.alpacaService
      .getAssetById(this.order.symbol)
      .subscribe((res) => {
        this.orderName = res["name"];
        sub.unsubscribe();
      });

    // Getting current price of the stock
    let sub2 = this.alpacaService
      .getLastTrades(this.order.symbol)
      .subscribe((res) => {
        this.currentPrice = res["trade"].p;
        sub2.unsubscribe();
      });
  }

  cancelOrder() {
    this.closeOrder.emit(this.order.id);
  }
}
