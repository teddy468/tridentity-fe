import { initializeConnector } from "@web3-react/core";
import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";
import {
  NEXT_PUBLIC_CHAIN_ID,
  NEXT_PUBLIC_PROJECT_ID,
} from "../constants/envs";

const RPC_URLS: { [chainId: number]: string } = {
  1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  3: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  5: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  25: "https://evm.cronos.org",
  42: "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  56: "https://bsc-dataseed.binance.org/",
  97: "https://data-seed-prebsc-1-s1.binance.org:8545",
  137: "https://polygon-rpc.com",
  250: "https://rpc.ftm.tools",
  338: "https://cronos-testnet-3.crypto.org:8545",
  43113: "https://api.avax-test.network/ext/bc/C/rpc",
  43114: "https://api.avax.network/ext/bc/C/rpc",
  42161: "https://arb1.arbitrum.io/rpc",
  80001: "https://matic-mumbai.chainstacklabs.com",
  1313161554: "https://mainnet.aurora.dev",
  1313161555: "https://testnet.aurora.dev/",
};

export const [walletConnect, walletConnectHooks] =
  initializeConnector<WalletConnectV2>(
    (actions) =>
      new WalletConnectV2({
        actions,
        options: {
          projectId: NEXT_PUBLIC_PROJECT_ID as string,
          chains: [Number(NEXT_PUBLIC_CHAIN_ID)],
          showQrModal: true,
          rpcMap: RPC_URLS,
        },
      })
  );
