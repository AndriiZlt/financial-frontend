export interface AssetToBuy {
  symbol: string;
  qty: string;
  side: 'buy';
  type: 'limit';
  limit_Price: string;
  time_In_Force: 'gtc';
}
