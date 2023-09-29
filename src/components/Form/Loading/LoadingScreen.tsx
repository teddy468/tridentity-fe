import React from "react";
import { useSelector } from "react-redux";
import { Container, StyledLogo, StyledModal } from "./styles";

const LoadingScreen: React.FC = () => {
  const { loading } = useSelector(({ system }: RootState) => system);

  return (
    <StyledModal open={loading} sx={{ zIndex: "9000" }}>
      <Container>
        <StyledLogo />
      </Container>
    </StyledModal>
  );
};

export default LoadingScreen;
