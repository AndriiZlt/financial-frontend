export interface Transaction {
  id: number;
  seller_Stock_Id: number;
  buyer_Stock_Id: number;
  seller_User_Id: number;
  buyer_User_Id: number;
  board_Item_Id: number;
  symbol: string;
  qty: string;
  cost_Basis: string;
  total_Price: string;
  name: string;
}
