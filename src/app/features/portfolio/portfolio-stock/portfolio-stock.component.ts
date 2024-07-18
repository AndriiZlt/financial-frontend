import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Stock } from "@portfolio/models/Stock.model";
import { AlpacaService } from "@alpaca/services/alpaca.service";
import { SpinnerComponent } from "src/app/shared/components/spinner/spinner.component";

@Component({
  selector: "app-stock-card",
  templateUrl: "./portfolio-stock.component.html",
  styleUrls: ["./portfolio-stock.component.scss"],
})
export class PortfolioStockComponent
  extends SpinnerComponent
  implements OnInit
{
  @Input() stock: Stock;
  @Input() index: number;
  @Output() sellStock: EventEmitter<any> = new EventEmitter<any>();
  positionName: string;
  currentPrice: string;
  nameIsLoading: boolean = true;
  priceIsLoading: boolean = true;
  status: string;

  constructor(private alpacaService: AlpacaService) {
    super();
  }

  ngOnInit(): void {
    switch (this.stock.status) {
      case 1:
        this.status = "Fixed";
        break;
      case 2:
        this.status = "For Sale";
        break;
      case 3:
        this.status = "For Purchase";
        break;
      default:
        console.log("Something wrong with the portfolio item status");
        this.status = "";
    }
  }

  onSellClick(event: any): void {
    this.sellStock.emit(event.currentTarget.id);
  }
}
