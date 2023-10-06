import ConnectBox from "@/components/ConnectWallet/ConnectBox";
import { ConnetWalletWrapper, MetamaskLogo, WalletConnetLogo } from "./styles";
import { ConnectorKey } from "@/web3/connectors";

interface IWalletSectionProps {
  handleConnectMetamask: (onnectorKey: ConnectorKey) => void;
  handleWalletConnect: (onnectorKey: ConnectorKey) => void;
}

const WalletSection: React.FC<IWalletSectionProps> = (
  props: IWalletSectionProps
) => {
  const { handleConnectMetamask, handleWalletConnect } = props;

  return (
    <ConnetWalletWrapper>
      <ConnectBox
        icon={<MetamaskLogo />}
        onClick={() => {
          handleConnectMetamask && handleConnectMetamask(ConnectorKey.metaMask);
        }}
        text="Metamask"
        isActive={true}
      />
      <ConnectBox
        icon={<WalletConnetLogo />}
        onClick={() => {
          handleWalletConnect &&
            handleWalletConnect(ConnectorKey.walletConnect);
        }}
        text="Wallet connect"
        isActive={true}
      />
    </ConnetWalletWrapper>
  );
};

export default WalletSection;
