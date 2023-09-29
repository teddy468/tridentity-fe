import {
  BadgeImage,
  Container,
  Content,
  DescribeText,
  Footer,
  StyledModal,
  SubmitButton,
  TermText,
  Title,
} from "./styles";
import { CancelButton, CancelText } from "@/components/Membership/UpgradeModals/styles";
import { GoldStar } from "@/assets/images";

interface NewBadgeModalProps {
  isOpen: boolean;
  newBadge: BadgeItem | undefined;
  onClose: () => void;
  wearBadge: () => void;
}

const NewBadgeModal = ({ isOpen, onClose, wearBadge, newBadge }: NewBadgeModalProps) => {
  return (
    <StyledModal open={isOpen} onClose={onClose}>
      <Container>
        <Title>Congratulation!</Title>
        <Content>
          <BadgeImage src={newBadge ? newBadge.image : GoldStar.src} />
          <DescribeText>You have earned Stylus Badge with your purchase on Stylus store ! Wear badge to get more loyalty
            points from it</DescribeText>

          <DescribeText style={{ marginTop: "10px", marginBottom: "10px" }}>Check out it badge <TermText>Terms and
            Conditions</TermText></DescribeText>
        </Content>
        <Footer>
          <CancelButton onClick={onClose}>
            <CancelText>Maybe later</CancelText>
          </CancelButton>
          <SubmitButton onClick={wearBadge}>Wear Badge</SubmitButton>
        </Footer>
      </Container>
    </StyledModal>
  );
};

export default NewBadgeModal;
