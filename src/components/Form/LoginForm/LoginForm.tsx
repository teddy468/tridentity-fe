import useLoading from "@/commons/hooks/useLoading";
import { useUserLoginWallet } from "@/commons/hooks/useUserLoginWallet";
import { CloseButton } from "@/components/commons/CloseButton/CloseButton";
import { systemActions } from "@/redux/reducer/systemReducer";
import { WEB3_ERROR } from "@/types/walletConnect";
import { ConnectorKey } from "@/web3/connectors";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmailSection from "./EmailSection";
import WalletSection from "./WalletSection";
import {
  Container,
  LoginMethodWrapper,
  LogoLink,
  StyledLogo,
  StyledModal,
  TabItem,
  TabWrapper,
  TextGradient,
  TextSignup,
} from "./styles";
import SignupSection from "./SignupSection";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const { authModal } = useSelector(({ system }: RootState) => system);
  const loadSC = useLoading();
  const { userLogin } = useUserLoginWallet();

  const [isMetamask, setIsMetamask] = useState<boolean>(true);
  const [isConnectWallet, setIsConnectWallet] = useState<boolean>(false);
  const [isSignup, setIsSignup] = useState<boolean>(false);

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
      } else {
        dispatch(systemActions.setDisplayAuthModal(null));
        await userLogin(ConnectorKey.walletConnect);
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

          {/* <LoginDivider>Or</LoginDivider>
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
          </GuestBrowse> */}

          {!isSignup ? (
            !isConnectWallet ? (
              <EmailSection />
            ) : (
              <WalletSection
                handleConnectMetamask={() => handleClick(ConnectorKey.metaMask)}
                handleWalletConnect={() =>
                  handleClick(ConnectorKey.walletConnect)
                }
              />
            )
          ) : (
            <></>
          )}

          {!isSignup && (
            <>
              <TextSignup>
                You don’t have account,&nbsp;
                <TextGradient
                  className="pointer"
                  onClick={() => setIsSignup(true)}
                >
                  Sign up here
                </TextGradient>
              </TextSignup>
              <TabWrapper>
                <TabItem
                  className={`${!isConnectWallet ? "active" : ""}`}
                  onClick={() => setIsConnectWallet(false)}
                >
                  Email
                </TabItem>
                <TabItem
                  className={`${isConnectWallet ? "active" : ""}`}
                  onClick={() => setIsConnectWallet(true)}
                >
                  Connect Wallet
                </TabItem>
              </TabWrapper>
            </>
          )}

          {isSignup ? (
            <SignupSection onClickChangeWallet={() => setIsSignup(false)} />
          ) : (
            <></>
          )}
        </LoginMethodWrapper>
      </Container>
    </StyledModal>
  );
};

export default LoginForm;
