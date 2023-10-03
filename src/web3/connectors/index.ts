import { Web3ReactHooks } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletConnect } from "@web3-react/walletconnect-v2";
import { metaMask, metamaskHooks } from "./metamask";
import { walletConnect, walletConnectHooks } from "./walletConnect";

export enum ConnectorKey {
  metaMask = "MetaMask",
  walletConnect = "walletConnect",
}

export const connectors = {
  [ConnectorKey.metaMask]: metaMask,
  [ConnectorKey.walletConnect]: walletConnect,
};

export const appConnectors: [MetaMask | WalletConnect, Web3ReactHooks][] = [
  [metaMask, metamaskHooks],
  [walletConnect, walletConnectHooks],
];
