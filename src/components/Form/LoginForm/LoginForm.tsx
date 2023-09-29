import { GlobalIcon, TriAppIcon } from "@/assets/icons";
import { REDIRECT_TRI_APP } from "@/commons/constants/routers";
import useLoading from "@/commons/hooks/useLoading";
import { CloseButton } from "@/components/commons/CloseButton/CloseButton";
import { systemActions } from "@/redux/reducer/systemReducer";
import { Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  GradientText,
  GuestBrowse,
  GuestBrowseIconWrapper,
  GuestBrowseTextWrapper,
  LoginDivider,
  LoginMethodWrapper,
  LogoLink,
  SignUpHelper,
  SignUpLink,
  SignUpWithTriApp,
  StyledLogo,
  StyledModal,
} from "./styles";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const { authModal } = useSelector(({ system }: RootState) => system);
  const loadSC = useLoading();

  const handleClose = () => {
    dispatch(systemActions.setDisplayAuthModal(null));
  };

  // Need refactor later
  const triAppRedirect = async (e: any, url: string) => {
    loadSC.show();

    location.replace(url);

    loadSC.hide();
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
          <SignUpWithTriApp onClick={e => triAppRedirect(e, REDIRECT_TRI_APP.LOGIN_URL)}>
            <TriAppIcon />
            <GradientText>Login with Tridentity App</GradientText>
          </SignUpWithTriApp>
          <SignUpHelper>
            You don’t have account?
            <SignUpLink href={REDIRECT_TRI_APP.REGISTER_URL}>
              <GradientText>Sign up here</GradientText>
            </SignUpLink>
          </SignUpHelper>
          <LoginDivider>Or</LoginDivider>
          <GuestBrowse onClick={handleClose}>
            <GuestBrowseIconWrapper>
              <GlobalIcon />
            </GuestBrowseIconWrapper>
            <GuestBrowseTextWrapper>
              Browse as{" "}
              <Typography variant="caption" variantMapping={{ caption: "span" }} fontWeight={500} fontSize={14}>
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
