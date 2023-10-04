import { useConnectWallet } from "@/commons/hooks/useConnectWallet";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";

/**
 * Use for network and injected - logs user in
 * and out after checking what network they're on
 */

export function useWalletListener() {
  const { connector } = useWeb3React();
  const { disconnectWallet } = useConnectWallet();

  const handleLogout = () => {
    disconnectWallet();
  };

  const handleChainChange = (data: any) => {
    console.log("CHAIN CHANGE", data);
    if (data !== process.env.REACT_APP_BSC_CHAIN_ID_HEX) {
      handleLogout();
    }
  };

  const handleAccountChange = (data: any) => {
    console.log("ACCOUNT CHANGE", data);
    // if lock data === []
  };

  const handleError = (error: any) => {
    console.log(error);
  };

  useEffect(() => {
    if (connector && connector.provider) {
      connector.provider.on("chainChanged", handleChainChange);
      connector.provider.on("accountsChanged", handleAccountChange);
      connector.provider.on("disconnect", handleError);
      return () => {
        connector.provider?.removeListener("chainChanged", handleChainChange);
        connector.provider?.removeListener(
          "accountsChanged",
          handleAccountChange
        );
        connector.provider?.removeListener("disconnect", handleError);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector.provider, connector]);
}
