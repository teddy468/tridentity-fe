import { TOKEN_KEY } from "@/commons/constants";
import useAuth from "@/commons/hooks/useAuth";
import useToast from "@/commons/hooks/useToast";
import { useUserLoginWallet } from "@/commons/hooks/useUserLoginWallet";
import { systemActions } from "@/redux/reducer/systemReducer";
import { ConnectorKey } from "@/web3/connectors";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmailSection from "./EmailSection";
import SignupSection from "./SignupSection";
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

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const { authModal } = useSelector(({ system }: RootState) => system);
  const { address, signature } = useSelector((state: RootState) => state.user);
  const { userLogin } = useUserLoginWallet();
  const { login, loginMetamask, signup, linkAddress, checkMappingAddress } =
    useAuth();
  const toast = useToast();

  const [isConnectWallet, setIsConnectWallet] = useState<boolean>(false);
  const [isSignup, setIsSignup] = useState<boolean>(false);
  // const [isLoginByEmail, setIsLoginByEmail] = useState<boolean>(false);

  const [emailLogin, setEmailLogin] = useState<string>("");
  const [passwordLogin, setPasswordLogin] = useState<string>("");

  const [emailSignup, setEmailSignup] = useState<string>("");
  const [usernameSignup, setUsernameSignup] = useState<string>("");
  const [passwordSignup, setPasswordSignup] = useState<string>("");
  const [reEnterPasswordSignup, setReEnterPasswordSignup] =
    useState<string>("");

  const handleClose = () => {
    dispatch(systemActions.setDisplayAuthModal(null));
  };

  const handleClick = async (connectorKey: ConnectorKey) => {
    try {
      let res = null;

      if (connectorKey === ConnectorKey.metaMask) {
        res = await userLogin(ConnectorKey.metaMask);
      } else {
        dispatch(systemActions.setDisplayAuthModal(null));
        res = await userLogin(ConnectorKey.walletConnect);
      }

      if (res?.accountSelected && res?.signature) {
        await loginMetamask(res?.accountSelected, res?.signature);
        handleClose();
      }
    } catch (error: any) {}
  };

  const onChangeEmailLogin = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmailLogin(e.target.value);
    },
    []
  );

  const onChangePasswordLogin = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordLogin(e.target.value);
    },
    []
  );

  const handleLogin = async () => {
    try {
      if (!address) {
        toast.warning("Wait for connecting wallet");
        await userLogin(ConnectorKey.metaMask);
      }

      const res = await login(emailLogin, passwordLogin);

      const userAddress = checkMappingAddress(
        res.data.data.access_token as string
      );

      if (!userAddress && address) {
        if (signature) {
          await linkAddress(address, signature);
        }
      }

      if (userAddress && userAddress !== address) {
        toast.warning("Please change wallet");
        return;
      }

      localStorage.setItem(TOKEN_KEY, res.data.data.access_token);

      handleClose();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const onChangeEmailSignup = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmailSignup(e.target.value);
    },
    []
  );

  const onChangeUsernameSignup = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsernameSignup(e.target.value);
    },
    []
  );

  const onChangePasswordSignup = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordSignup(e.target.value);
    },
    []
  );

  const onChangeReEnterPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setReEnterPasswordSignup(e.target.value);
    },
    []
  );

  const handleSignup = async () => {
    try {
      if (passwordSignup !== reEnterPasswordSignup) {
        toast.error("Re enter password");
        return;
      }

      await signup(emailSignup, usernameSignup, passwordSignup);
      toast.success("Sign up success. Please check mail to active account");
    } catch (error) {}
  };

  return (
    <StyledModal open={authModal === "login"} onClose={handleClose}>
      <Container>
        <LogoLink href="/">
          <StyledLogo />
        </LogoLink>
        <LoginMethodWrapper>
          {!isSignup ? (
            !isConnectWallet ? (
              <EmailSection
                email={emailLogin}
                password={passwordLogin}
                onChangeEmail={onChangeEmailLogin}
                onChangePassword={onChangePasswordLogin}
                onClickLogin={handleLogin}
              />
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
            <SignupSection
              email={emailSignup}
              username={usernameSignup}
              password={passwordSignup}
              reEnterPassword={reEnterPasswordSignup}
              onChangeEmail={onChangeEmailSignup}
              onChangeUsername={onChangeUsernameSignup}
              onChangePassord={onChangePasswordSignup}
              onChangeReEnterPassord={onChangeReEnterPassword}
              onClickSignup={handleSignup}
              onClickChangeWallet={() => setIsSignup(false)}
            />
          ) : (
            <></>
          )}
        </LoginMethodWrapper>
      </Container>
    </StyledModal>
  );
};

export default LoginForm;
