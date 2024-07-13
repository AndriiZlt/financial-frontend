import { StockStatus } from "./StockStatus.model";

export interface Stock {
  id: number;
  user_Id: number;
  symbol: string;
  name: string;
  cost_Basis: string;
  qty: string;
  status: StockStatus;
}
