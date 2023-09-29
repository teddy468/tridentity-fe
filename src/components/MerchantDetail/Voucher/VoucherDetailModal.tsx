import { VOUCHER_DETAIL } from "@/commons/constants/apiUrl";
import defaultAxios from "@/commons/utils/axios";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { Container, Footer, StyledModal } from "../../Profile/PersonalInformation/UserBadge/styles";
import { BigText, ClaimButton, Content, MediumText, SmallText } from "./styles";

interface VoucherDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: () => void;
  voucherItem: any;
  isClaimed: boolean;
}

const VoucherDetailModal = (props: VoucherDetailModalProps) => {
  const { isOpen, onClose, voucherItem, onClaim, isClaimed } = props;
  const [detail, setDetail] = useState<any>();
  const isDiscount = useMemo(() => {
    return Number(detail?.discount_amount) > 0;
  }, [detail]);
  const textFreeProduct = useMemo(() => {
    if (detail?.freeProductItem) {
      return `${detail?.freeProductItem?.product.name} ${detail?.freeProductItem?.attribute_name} - ${detail?.freeProductItem?.attribute_value}`;
    }
  }, [detail?.freeProductItem]);
  const appliedProducts = useMemo(() => {
    return detail?.voucherProducts as any[];
  }, [detail?.voucherProducts]);

  useEffect(() => {
    if (voucherItem?.id > 0 && isOpen) {
      getVoucherDetail();
    }
  }, [voucherItem, isOpen]);

  const getVoucherDetail = async () => {
    try {
      const res = await defaultAxios.get(VOUCHER_DETAIL(voucherItem.id));
      if (res.status === 200 && res.data) {
        setDetail(res.data);
      }
    } catch (error) {}
  };

  return (
    <StyledModal open={isOpen} onClose={onClose}>
      <Container>
        <Content>
          <BigText>{detail?.name}</BigText>
          <MediumText>{isDiscount ? "Reward" : "Free"}</MediumText>
          <SmallText>{isDiscount ? `$ ${detail?.discount_amount}` : textFreeProduct}</SmallText>
          <MediumText>Applicable Products</MediumText>
          <SmallText>
            {appliedProducts?.map((prod, index) => {
              return (
                <span>
                  {prod?.product?.name}{" "}
                  {appliedProducts.length === 1 || index === appliedProducts.length - 1 ? "" : ", "}
                </span>
              );
            })}
          </SmallText>
          <MediumText>Conditions</MediumText>
          <SmallText> Cart Value Reaches: ${detail?.minimum_spending || 0}</SmallText>
          <MediumText>Limitation</MediumText>
          <SmallText> Supply: {detail?.supply}</SmallText>
          <SmallText>Each user can use only once</SmallText>
          <MediumText>Valid Date</MediumText>
          <SmallText>
            {dayjs(detail?.start_date).isValid() && dayjs(detail?.start_date).format("DD/MM/YYYY")} -{" "}
            {dayjs(detail?.end_date).isValid() && dayjs(detail?.end_date).format("DD/MM/YYYY")}
          </SmallText>
        </Content>
        <Footer>
          <ClaimButton disabled={isClaimed} onClick={onClaim}>
            Claim
          </ClaimButton>
        </Footer>
      </Container>
    </StyledModal>
  );
};

export default VoucherDetailModal;
