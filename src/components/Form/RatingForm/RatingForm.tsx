import CustomTabs from "@/components/commons/CustomTabs/CustomTabs";
import { useState } from "react";
import RatingMerchant from "./RatingMerchant";
import RatingProducts from "./RatingProducts";
import { Container, StyledModal, Title } from "./styles";

interface RatingFormProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderV2;
  orderRate: CurrentOrderRating | undefined;
  onRateSuccess: () => void;
}

const Tabs = [
  {
    label: "Product",
    key: 1,
  },
  {
    label: "Store",
    key: 2,
  },
];
const RatingForm = ({ isOpen, onClose, order, orderRate, onRateSuccess }: RatingFormProps) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleSelectTab = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <StyledModal open={isOpen} onClose={onClose}>
      <Container>
        <Title>Rating</Title>
        <CustomTabs tabs={Tabs} activeTab={activeTab} setActiveTab={handleSelectTab}>
          {activeTab === 1 ? (
            <RatingProducts
              onCancel={onClose}
              order={order}
              product_ratings={orderRate ? (orderRate.product_ratings ? orderRate.product_ratings : []) : []}
              onRateProductSuccess={onRateSuccess}
            />
          ) : (
            <RatingMerchant
              onCancel={onClose}
              order={order}
              store_rating={orderRate?.store_rating}
              onRateStoreSuccess={onRateSuccess}
            />
          )}
        </CustomTabs>
      </Container>
    </StyledModal>
  );
};

export default RatingForm;
