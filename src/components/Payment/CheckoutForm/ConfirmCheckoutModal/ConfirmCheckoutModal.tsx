import { Container, Content, Footer, StyledModal, SubmitButton, Title } from "./styles";
import { CancelButton, CancelText } from "@/components/Membership/UpgradeModals/styles";

interface OrderReceivedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
const ConfirmCheckoutModal = ({ isOpen, onClose, onConfirm }: OrderReceivedModalProps) => {
  return (
    <StyledModal open={isOpen} onClose={onClose}>
      <Container>
        <Title>Checkout</Title>
        <Content>Are you sure you want to proceed to checkout </Content>
        <Footer>
          <CancelButton onClick={onClose}>
            <CancelText>Cancel</CancelText>
          </CancelButton>
          <SubmitButton onClick={onConfirm}>Confirm</SubmitButton>
        </Footer>
      </Container>
    </StyledModal>
  );
};

export default ConfirmCheckoutModal;
