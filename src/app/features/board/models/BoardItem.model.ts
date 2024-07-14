import { StockStatus } from "../../portfolio/models/StockStatus.model";

export interface BoardItem {
  id: number;
  stock_Id: number;
  user_Id: number;
  symbol: string;
  name: string;
  cost_Basis: string;
  qty: string;
  max_Qty: string;
  total_Price: string;
  status: StockStatus;
}
