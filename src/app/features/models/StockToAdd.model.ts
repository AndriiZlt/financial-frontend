import { StockStatus } from "./StockStatus.model";

export interface StockToAdd {
  symbol: string;
  name: string;
  cost_Basis: string;
  qty: string;
  status: StockStatus;
}
