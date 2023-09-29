import { Container, Content, Footer, StyledModal, SubmitButton, Title } from "./styles";
import { CancelButton, CancelText } from "@/components/Membership/UpgradeModals/styles";

interface OrderReceivedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
const OrderReceivedModal = ({ isOpen, onClose, onConfirm }: OrderReceivedModalProps) => {
  return (
    <StyledModal open={isOpen} onClose={onClose}>
      <Container>
        <Title>Confirmation</Title>
        <Content>The order has been received, it will be moved to the completed status</Content>
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

export default OrderReceivedModal;
