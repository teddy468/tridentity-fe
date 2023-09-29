import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { systemActions } from "@/redux/reducer/systemReducer";
import {
  CloseButton,
  CloseText,
  Container,
  Content,
  ErrorTitle,
  Footer,
  Message,
  StyledModal,
  SuccessTitle,
  Title,
} from "./styles";
import Icon from "@/components/commons/Icon/Icon";
import { Error2Icon, Success2Icon } from "@/assets/icons";
import { useRouter } from "next/router";
import { routers } from "@/commons/constants/routers";

const CheckoutResultModal: React.FC = () => {
  const dispatch = useDispatch();
  const { checkoutResult } = useSelector(({ system }: RootState) => system);
  const router = useRouter();

  const handleClose = () => {
    dispatch(systemActions.setCheckoutResult("none"));
    if (checkoutResult === "success") router.push(routers.USER.MY_ORDERS);
  };

  return (
    <StyledModal open={checkoutResult !== "none"}>
      <Container>
        <Title>
          <Icon
            icon={checkoutResult === "success" ? Success2Icon : Error2Icon}
            width={240}
            height={240}
            originWidth={240}
            originHeight={240}
          />
        </Title>
        <Content>
          {checkoutResult === "success" ? (
            <SuccessTitle>Payment successful!</SuccessTitle>
          ) : (
            <>
              <ErrorTitle>Payment failed!</ErrorTitle>
              <Message>Payment couldn't be completed. Please check your information and try again.</Message>
            </>
          )}
        </Content>
        <Footer>
          <CloseButton onClick={handleClose}>
            <CloseText>{checkoutResult === "success" ? "Go to my order" : "OK"}</CloseText>
          </CloseButton>
        </Footer>
      </Container>
    </StyledModal>
  );
};

export default CheckoutResultModal;
