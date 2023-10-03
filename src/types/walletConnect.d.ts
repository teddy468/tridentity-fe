export type WEB3_ERROR = {
  type: Values;
  message: string;
  /*
    object error
    */
  description: any;
};

export type Newtwork = {
  chainId: number;
  chainIdHex: string;
  rpcUrls: string[];
  chainName: string;
  nativeCurrency: { name: string; decimals: number; symbol: string };
  blockExplorerUrls: string[];
};
