import { getMembershipType } from "@/commons/utils/getMembershipType";
import { useMemo } from "react";
import {
  CancelButton,
  CancelText,
  Container,
  Content,
  Footer,
  LPNumber,
  StyledModal,
  SubmitButton,
  Tier,
  Title,
} from "./styles";

interface Props {
  isOpen: boolean;
  nextLevelMembership: LevelMembership;
  userLoyaltyPoint: UserLoyaltyPoint;
  onClose: () => void;
  onUpgrade: () => void;
}
const UpgradeModal = ({ isOpen, nextLevelMembership, userLoyaltyPoint, onUpgrade, onClose }: Props) => {
  return (
    <StyledModal open={isOpen} onClose={onClose}>
      <Container>
        <Title>Upgrade membership</Title>
        <Content>
          Are you sure you want to use <LPNumber>{nextLevelMembership?.value}</LPNumber> LP to upgrade membership tier
          to <Tier>{getMembershipType(nextLevelMembership?.level)}</Tier>
        </Content>
        <Footer>
          <CancelButton onClick={onClose}>
            <CancelText>Cancel</CancelText>
          </CancelButton>
          <SubmitButton onClick={onUpgrade}>Confirm</SubmitButton>
        </Footer>
      </Container>
    </StyledModal>
  );
};

export default UpgradeModal;
