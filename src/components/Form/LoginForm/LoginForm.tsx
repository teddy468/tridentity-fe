import {
  GlobalIcon,
  MetamaskIcon,
  TriAppIcon,
  WalletConnectIcon,
} from "@/assets/icons";
import { REDIRECT_TRI_APP } from "@/commons/constants/routers";
import useLoading from "@/commons/hooks/useLoading";
import { CloseButton } from "@/components/commons/CloseButton/CloseButton";
import { systemActions } from "@/redux/reducer/systemReducer";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ConnetWalletWrapper,
  Container,
  GradientText,
  GuestBrowse,
  GuestBrowseIconWrapper,
  GuestBrowseTextWrapper,
  LoginDivider,
  LoginMethodWrapper,
  LogoLink,
  MetamaskLogo,
  SignUpHelper,
  SignUpLink,
  SignUpWithTriApp,
  StyledLogo,
  StyledModal,
  WalletConnetLogo,
} from "./styles";
import ConnectBox from "@/components/ConnectWallet/ConnectBox";
import { ConnectorKey } from "@/web3/connectors";
import { useUserLoginWallet } from "@/commons/hooks/useUserLoginWallet";
import { WEB3_ERROR } from "@/types/walletConnect";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const { authModal } = useSelector(({ system }: RootState) => system);
  const loadSC = useLoading();
  const { userLogin } = useUserLoginWallet();
  const [isMetamask, setIsMetamask] = useState<boolean>(true);

  const handleClose = () => {
    dispatch(systemActions.setDisplayAuthModal(null));
    // setIsMetamask(true);
  };

  // Need refactor later
  const triAppRedirect = async (e: any, url: string) => {
    loadSC.show();

    location.replace(url);

    loadSC.hide();
  };

  const handleError = (error: WEB3_ERROR, connectorKey: ConnectorKey) => {
    // switch (error.type) {
    //   case 'user_reject':
    //     handleUserReject(error);
    //     break;
    //   case 'un_support_chain':
    //     toastMessage.error(t(MESSAGES.MC14), t(MESSAGES.MC15));
    //     break;
    //   case 'no_eth_provider':
    //     setIsMetamask(false);
    //     break;
    //   default:
    //     toastMessage.error(MESSAGES.MC3);
    // }
  };

  const handleClick = async (connectorKey: ConnectorKey) => {
    try {
      if (connectorKey === ConnectorKey.metaMask) {
        await userLogin(ConnectorKey.metaMask);
        // setUserLock(false);
        // onLoginSuccess && onLoginSuccess();
      } else {
        dispatch(systemActions.setDisplayAuthModal(null));
        console.log("choose wallet connect");
        await userLogin(ConnectorKey.walletConnect);
        // setUserLock(false);
      }
      handleClose();
    } catch (error: any) {
      // handleError(
      //   error,
      //   isMetamask ? ConnectorKey.metaMask : ConnectorKey.walletConnect
      // );
    }
  };

  return (
    <StyledModal open={authModal === "login"} onClose={handleClose}>
      <Container>
        <CloseButton onClick={handleClose} />
        <LogoLink href="/">
          <StyledLogo />
        </LogoLink>
        <LoginMethodWrapper>
          {/* Link to app to redirect or login on Tridentity website */}
          {/* <SignUpWithTriApp
            onClick={(e) => triAppRedirect(e, REDIRECT_TRI_APP.LOGIN_URL)}
          >
            <TriAppIcon />
            <GradientText>Login with Tridentity App</GradientText>
          </SignUpWithTriApp> */}
          {/* <SignUpHelper>
            You don’t have account?
            <SignUpLink href={REDIRECT_TRI_APP.REGISTER_URL}>
              <GradientText>Sign up here</GradientText>
            </SignUpLink>
          </SignUpHelper> */}
          <ConnetWalletWrapper>
            <ConnectBox
              icon={<MetamaskLogo />}
              onClick={() => {
                handleClick(ConnectorKey.metaMask);
              }}
              text="Metamask"
              isActive={true}
            />
            <ConnectBox
              icon={<WalletConnetLogo />}
              onClick={() => {
                handleClick(ConnectorKey.walletConnect);
              }}
              text="Wallet connect"
              isActive={true}
            />
          </ConnetWalletWrapper>
          <LoginDivider>Or</LoginDivider>
          <GuestBrowse onClick={handleClose}>
            <GuestBrowseIconWrapper>
              <GlobalIcon />
            </GuestBrowseIconWrapper>
            <GuestBrowseTextWrapper>
              Browse as{" "}
              <Typography
                variant="caption"
                variantMapping={{ caption: "span" }}
                fontWeight={500}
                fontSize={14}
              >
                Guest
              </Typography>
            </GuestBrowseTextWrapper>
          </GuestBrowse>
        </LoginMethodWrapper>
      </Container>
    </StyledModal>
  );
};

export default LoginForm;
