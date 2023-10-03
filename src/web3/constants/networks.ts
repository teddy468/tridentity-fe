import { Newtwork } from "@/types/walletConnect";

import {
  NEXT_PUBLIC_BLOCK_EXPLORER_URL,
  NEXT_PUBLIC_BSC_CHAIN_ID_HEX,
  NEXT_PUBLIC_BSC_RPC_URL,
  NEXT_PUBLIC_CHAIN_ID,
  NEXT_PUBLIC_NETWORK_NAME,
} from "./envs";

export const SUPPORTED_NETWORKS: { [key: string]: Newtwork } = {
  [NEXT_PUBLIC_CHAIN_ID as string]: {
    chainId: Number(NEXT_PUBLIC_CHAIN_ID),
    chainIdHex: NEXT_PUBLIC_BSC_CHAIN_ID_HEX as string,
    chainName: NEXT_PUBLIC_NETWORK_NAME as string,
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    blockExplorerUrls: [NEXT_PUBLIC_BLOCK_EXPLORER_URL as string],
    rpcUrls: [NEXT_PUBLIC_BSC_RPC_URL as string],
  },
};
