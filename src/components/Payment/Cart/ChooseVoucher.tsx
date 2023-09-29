import { LoadingAnim } from "@/assets/images";
import { MY_VOUCHER } from "@/commons/constants/apiUrl";
import useToast from "@/commons/hooks/useToast";
import defaultAxios from "@/commons/utils/axios";
import BigNumber from "bignumber.js";
import { useEffect, useMemo, useState } from "react";
import { Container, StyledModal, Title } from "../../Profile/PersonalInformation/UserBadge/styles";
import { Content, MediumText } from "../Voucher/styles";
import { TextNoVoucherMatching } from "./styles";
import { VoucherCard } from "./VoucherCard";

interface ChooseBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProducts: any[];
  onSelectVoucher: (voucher: any) => void;
  subTotal: number;
}
const params = {
  page: 1,
  perPage: 100,
  paginationMetadataStyle: "body",
};
const ChooseVoucher = ({ isOpen, onClose, selectedProducts, onSelectVoucher, subTotal }: ChooseBadgeModalProps) => {
  const toast = useToast();
  const [listVoucher, setListVoucher] = useState([]);
  const [loading, setLoading] = useState(false);
  const productIds = useMemo(() => {
    if (selectedProducts?.length > 0) {
      return selectedProducts.map(item => item?.product_id);
    }
    return [];
  }, [selectedProducts]);

  useEffect(() => {
    if (isOpen) {
      getListVoucherByProduct();
    }
  }, [productIds, isOpen]);

  const getListVoucherByProduct = async () => {
    try {
      setLoading(true);
      if (productIds.length > 0) {
        const queryString = productIds.join("&product_ids=");
        const res = await defaultAxios.get<any>(`${MY_VOUCHER}?product_ids=${queryString}`, params as any);
        if (res.status === 200 && res.data) {
          if (res.data && res?.data?.length > 0) {
            const promises = res.data.map((item: any) =>
              defaultAxios.get<any>(`merchant-management/vouchers/${item.id}/products`, params as any)
            );
            const all = await Promise.all(promises);
            const newProducts = all.map(prod => prod.data);
            const finalResult = res.data.map((item: any, index: number) => {
              return {
                ...item,
                voucherProducts: newProducts[index],
              };
            });
            setListVoucher(finalResult);
          }
        }
      } else {
        setListVoucher([]);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleVoucherSelect = (voucher: any) => {
    const isDiscount = Number(voucher?.discount_amount) > 0;
    const isValid = new BigNumber(subTotal).gte(voucher?.minimum_spending);
    if (isDiscount) {
      if (isValid) {
        onSelectVoucher(voucher);
        onClose();
      } else {
        toast.error(`Total bill hasn't reached minimum spend`);
        onClose();
      }
    } else {
      onSelectVoucher(voucher);
      onClose();
    }
  };

  return (
    <StyledModal open={isOpen} onClose={onClose}>
      <Container>
        <Title>Choose voucher</Title>
        <Content>
          {loading ? (
            <div style={{ textAlign: "center" }}>
              <img style={{ width: "60px", height: "60px" }} src={LoadingAnim.src} />
            </div>
          ) : listVoucher.length > 0 ? (
            listVoucher.map(item => (
              <VoucherCard
                item={item}
                onSelect={voucher => {
                  handleVoucherSelect(voucher);
                }}
              />
            ))
          ) : (
            <TextNoVoucherMatching>
              <MediumText>No voucher matching</MediumText>
            </TextNoVoucherMatching>
          )}
        </Content>
      </Container>
    </StyledModal>
  );
};

export default ChooseVoucher;
