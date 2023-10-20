import ConnectBox from "@/components/ConnectWallet/ConnectBox";
import { ConnetWalletWrapper, MetamaskLogo, WalletConnetLogo } from "./styles";

interface IWalletSectionProps {
  handleConnectMetamask?: () => void;
  handleWalletConnect?: () => void;
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
          handleConnectMetamask && handleConnectMetamask();
        }}
        text="Metamask"
        isActive={true}
      />
      <ConnectBox
        icon={<WalletConnetLogo />}
        onClick={() => {
          handleWalletConnect && handleWalletConnect();
        }}
        text="Wallet connect"
        isActive={true}
      />
    </ConnetWalletWrapper>
  );
};

export default WalletSection;
