import React, { useState } from "react";
import { CancelButton, CancelText, Container, Content, Footer, StyledModal, SubmitButton, Title } from "./styles";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/redux/reducer/cartReducer";
import { systemActions } from "@/redux/reducer/systemReducer";

const ClearCartWarning = () => {
  const { authModal } = useSelector((state: RootState) => state.system);
  const { currentSelectedItem } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  function clearCart() {
    dispatch(systemActions.setDisplayAuthModal(null));
    dispatch(cartActions.destroyCart());
    dispatch(cartActions.setAddCartModal(currentSelectedItem));
  }

  function cancelClearCart() {
    dispatch(systemActions.setDisplayAuthModal(null));
    dispatch(cartActions.setCurrentSelectedItem(null));
  }
  return (
    <StyledModal open={authModal === "warning-cart-not-empty"}>
      <Container>
        <Title>Discard Cart</Title>
        <Content>
          You can only add products from the same merchant to your cart. Adding products from another merchant will
          discard your current cart.
        </Content>
        <Footer>
          <CancelButton onClick={cancelClearCart}>
            <CancelText>Cancel</CancelText>
          </CancelButton>
          <SubmitButton
            onClick={() => {
              clearCart();
            }}
          >
            Confirm
          </SubmitButton>
        </Footer>
      </Container>
    </StyledModal>
  );
};

export default ClearCartWarning;
