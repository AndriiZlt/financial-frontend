import { StockStatus } from "./StockStatus.model";

export interface BoardItemToAdd {
  stock_Id: number;
  user_Id: number;
  symbol: string;
  name: string;
  cost_Basis: string;
  qty: string;
  max_Qty: string;
  status: StockStatus;
}
