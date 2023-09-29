import { CancelButton, CancelText, Container, Content, Footer, StyledModal, SubmitButton, Title } from "./styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
const DifferentCheckoutModal = ({ isOpen, onClose, onConfirm }: Props) => {
  return (
    <StyledModal open={isOpen} onClose={onClose}>
      <Container>
        <Title>Attention</Title>
        <Content>Some information has changed. Please confirm again</Content>
        <Footer>
          <CancelButton onClick={onClose}>
            <CancelText>Close</CancelText>
          </CancelButton>
          <SubmitButton onClick={onConfirm}>Confirm</SubmitButton>
        </Footer>
      </Container>
    </StyledModal>
  );
};

export default DifferentCheckoutModal;
