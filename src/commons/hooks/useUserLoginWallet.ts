import { Web3Provider } from "@ethersproject/providers";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
// import { setIsAuth } from "src/store/slices/auth";
// import { setCurrentAccount } from "src/store/slices/user";
import { useConnectWallet } from "./useConnectWallet";
import { WEB3_ERROR } from "@/types/walletConnect";
import { ConnectorKey, connectors } from "@/web3/connectors";
import { walletConnect } from "@/web3/connectors/walletConnect";
import { userActions } from "@/redux/reducer/userReducer";
import { NEXT_PUBLIC_MESSAGES_SIGN } from "@/web3/constants/envs";
import { signMessage } from "@/web3/helpers";
import moment from "moment";

export const useUserLoginWallet = () => {
  // const [login] = useLoginMutation();
  const { connectWallet } = useConnectWallet();
  const dispatch = useDispatch();

  const getAccountConnected = async (provider: Web3Provider) => {
    const signer = provider.getSigner();
    const account = await signer?.getAddress();
    return account;
  };

  const getSignature = async (
    accountSelected: string,
    provider: Web3Provider
  ) => {
    const durationActive = moment().add(1, "h").unix();
    // const message = `${NEXT_PUBLIC_MESSAGES_SIGN} ${accountSelected}@${durationActive}`;
    const message = NEXT_PUBLIC_MESSAGES_SIGN as string;
    const signer = provider?.getSigner();
    const signature = await signMessage(signer, message);
    return {
      message,
      signature,
    };
  };

  const resetStore = (accountSelected: string) => {
    // dispatch(setAccessToken(accessToken));
    dispatch(userActions.setUserAddress(accountSelected as string));
  };

  const clearWalletConnect = () => {
    walletConnect.resetState();
    walletConnect.deactivate();
    localStorage.clear();
  };

  const userLogin = async (connectorKey: ConnectorKey) => {
    try {
      if (connectorKey === ConnectorKey.walletConnect) {
        clearWalletConnect();
      }

      await connectWallet(connectorKey);
      const connector = connectors[connectorKey];
      if (!connector.provider) {
        throw new Error("No provider found");
      }
      const provider = new Web3Provider(connector?.provider);
      const accountSelected = await getAccountConnected(provider);
      if (!accountSelected) {
        throw new Error("Account not found");
      }

      const { signature, message } = await getSignature(
        accountSelected,
        provider
      );

      dispatch(userActions.setSignature(signature as string));
      resetStore(accountSelected);

      return {
        accountSelected,
        signature,
      };
    } catch (error: any) {
      if (connectorKey === ConnectorKey.walletConnect) {
        clearWalletConnect();
      }
      if (error?.code === AxiosError.ERR_NETWORK) {
        return;
      }

      let baseError = {
        type: "user_reject",
        message: error?.message,
        description: error,
      } as WEB3_ERROR;
      throw baseError;
    }
  };

  return { userLogin, getSignature };
};
