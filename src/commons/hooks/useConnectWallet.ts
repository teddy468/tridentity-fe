import { ConnectorKey, connectors } from "@/web3/connectors";
import {
  NEXT_PUBLIC_BSC_RPC_URL,
  NEXT_PUBLIC_CHAIN_ID,
} from "@/web3/constants/envs";
import { SUPPORTED_NETWORKS } from "@/web3/constants/networks";
import { useWeb3React } from "@web3-react/core";
// import { useAppDispatch } from 'src/store';
// import { setIsAuth } from 'src/store/slices/auth';
// import { clearAccessToken, clearWallet, setWallet } from 'src/store/slices/user';

/**
 * Hook for connect/disconnect to a wallet
 * @returns `connectWallet` and `disconnectWallet` functions .
 */

export const useConnectWallet = () => {
  // const dispatch = useAppDispatch();
  const { connector: appConnector } = useWeb3React();

  async function connectWallet(connectorKey: ConnectorKey) {
    const connector = connectors[connectorKey];

    const chainId = parseInt(
      NEXT_PUBLIC_CHAIN_ID as string,
      10
    ) as keyof typeof SUPPORTED_NETWORKS;

    try {
      const objAddNetWork =
        connectorKey === ConnectorKey.metaMask
          ? ({
              chainId: chainId,
              chainName: SUPPORTED_NETWORKS[chainId].chainName,
              nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: [NEXT_PUBLIC_BSC_RPC_URL],
              blockExplorerUrls: SUPPORTED_NETWORKS[chainId].blockExplorerUrls,
            } as any)
          : chainId;
      await connector.activate(objAddNetWork);
      // dispatch(setWallet(connectorKey));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  function disconnectWallet() {
    // dispatch(clearWallet());
    // dispatch(clearAccessToken());
    // dispatch(setIsAuth(false));
    appConnector.resetState();
    appConnector?.deactivate && appConnector.deactivate();
  }

  return { connectWallet, disconnectWallet };
};
