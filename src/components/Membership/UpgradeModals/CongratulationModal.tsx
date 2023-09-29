import { Container, Content, Footer, StyledModal, SubmitButton, Title } from "./styles";
import { getMembershipType } from "@/commons/utils/getMembershipType";

interface CongratulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  nextLevelMembership: LevelMembership;
}
const CongratulationModal = ({ isOpen, onClose, nextLevelMembership }: CongratulationModalProps) => {
  return (
    <StyledModal open={isOpen} onClose={onClose}>
      <Container>
        <Title>Congratulation</Title>
        <Content>
          You have successfully upgraded your membership tier to {getMembershipType(nextLevelMembership?.level)}
        </Content>
        <Footer>
          <SubmitButton onClick={onClose}>Continue</SubmitButton>
        </Footer>
      </Container>
    </StyledModal>
  );
};

export default CongratulationModal;
