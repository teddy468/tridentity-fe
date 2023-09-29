import {
  Container,
  ContentLeft,
  ContentRight,
  ContentTextWrapper,
  Footer,
  StyledModal,
  SubmitButton,
  Title,
} from "./styles";
import moment from "moment";
import { details, routers } from "@/commons/constants/routers";
import { useRouter } from "next/router";

interface OrderReceivedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  campaignInfo: CampaignInfo | undefined;
  storeId: number;
}
const CampaignInfoModal = ({ isOpen, onClose, onConfirm, campaignInfo, storeId }: OrderReceivedModalProps) => {
  const router = useRouter();

  const remain = campaignInfo ? Math.floor(((campaignInfo.lp_amount - campaignInfo.used_lp_amount) / campaignInfo.single_lp_amount )): 0;

  const clickFindMore = () => {
    // onClose();
    router.push(`${details.storeProducts(storeId)}?campaign_id=${campaignInfo?.campaign_id}`);
  }

  return (
    <StyledModal open={isOpen} onClose={onClose}>
      <Container>
        <Title>Extra LP</Title>
        <ContentTextWrapper>
            <ContentLeft>This product is listed in <span style={{color: "#F7EF82"}}>{campaignInfo?.campaign.name}</span> campaign. </ContentLeft>
        </ContentTextWrapper>

        <ContentTextWrapper>
          <ContentLeft>Start & end date:</ContentLeft>
          <ContentRight>{moment(campaignInfo?.campaign.start_date).format("DD/MM/yyyy")} - {moment(campaignInfo?.campaign.end_date).format("DD/MM/yyyy")}</ContentRight>
        </ContentTextWrapper>

        <ContentTextWrapper>
          <ContentLeft>Extra LP quantity remaining:</ContentLeft>
          <ContentRight>{remain}</ContentRight>
        </ContentTextWrapper>
        <Footer>
          <SubmitButton onClick={clickFindMore}>Find more Products</SubmitButton>
        </Footer>
      </Container>
    </StyledModal>
  );
};

export default CampaignInfoModal;
