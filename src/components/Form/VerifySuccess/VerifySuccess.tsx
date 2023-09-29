import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { systemActions } from "@/redux/reducer/systemReducer";
import {
  Container,
  GoToLoginButton,
  LogoLink,
  StyledLogo,
  StyledModal,
  RegisterEmail,
  VerifyGuide,
  Title,
  GoToHomeButton,
} from "./styles";
import { routers } from "@/commons/constants/routers";
import { useRouter } from "next/router";

interface Props {
  data: VerifyEmailResponse | null;
  onOpen: boolean;
  onClose: () => void;
}

const VerifySuccess: React.FC<Props> = ({ data, onClose, onOpen }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }: RootState) => user);

  const goToLogin = async () => {
    router.push("/");
    dispatch(systemActions.setDisplayAuthModal("login"));
  };

  return (
    <StyledModal open={onOpen} onClose={onClose}>
      <Container>
        <LogoLink href="/">
          <StyledLogo />
        </LogoLink>
        <Title>Verify successfully!</Title>
        <VerifyGuide>
          Email <RegisterEmail>{data?.email || ""}</RegisterEmail> successfully verified! Thank you for using Tridentity
        </VerifyGuide>
        {user ? (
          <GoToHomeButton href={routers.HOME} onClick={onClose}>
            Home
          </GoToHomeButton>
        ) : (
          <GoToLoginButton onClick={goToLogin}>Login</GoToLoginButton>
        )}
      </Container>
    </StyledModal>
  );
};

export default VerifySuccess;
