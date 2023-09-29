import { VOUCHER_USER_CLAIM } from "@/commons/constants/apiUrl";
import useToast from "@/commons/hooks/useToast";
import defaultAxios from "@/commons/utils/axios";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { BigText, ClaimButton, FlexBox, MediumTextOverflow, SmallText, UnderlineText, WrapperCard } from "./styles";
import VoucherDetailModal from "./VoucherDetailModal";

interface VoucherProps {
  item: any;
  onRefesh: () => void;
}

export const VoucherCard = (props: VoucherProps) => {
  const { item, onRefesh } = props;
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const isDiscount = useMemo(() => {
    return Number(item?.discount_amount) > 0;
  }, [item?.discount_amount]);

  const appliedProducts = useMemo(() => {
    return item?.voucherProducts as any[];
  }, [item?.voucherProducts]);

  const textFreeProduct = useMemo(() => {
    if (item?.freeProductItem) {
      return `${item?.freeProductItem?.product.name} ${item?.freeProductItem?.attribute_name} - ${item?.freeProductItem?.attribute_value}`;
    }
  }, [item?.freeProductItem]);

  const isClaimed = useMemo(() => {
    return (item?.voucherUsers as any[]).length > 0;
  }, [item?.voucherUsers]);

  const handleClaim = async () => {
    try {
      await defaultAxios.put(VOUCHER_USER_CLAIM(item.id));
      toast.success(`Claim voucher successfully!`);
      onRefesh();
    } catch (error : any) {
      const message = error.response.data.error.message || 'Claim voucher fail!';
      toast.error(message);
    }
  };

  return (
    <>
      <WrapperCard>
        <BigText onClick={() => setIsOpen(true)}>
          {isDiscount ? ` $S ${item?.discount_amount} OFF` : `Free ${textFreeProduct}`}
        </BigText>
        <MediumTextOverflow onClick={() => setIsOpen(true)}>
          Applied to{" "}
          {appliedProducts.map((prod, index) => {
            return (
              <>
                {prod?.product?.name} {appliedProducts.length === 1 || index === appliedProducts.length - 1 ? "" : ", "}
              </>
            );
          })}
        </MediumTextOverflow>
        <SmallText onClick={() => setIsOpen(true)}>
          Valid till: {dayjs(item?.end_date).isValid() && dayjs(item?.end_date).format("DD/MM/YYYY")}
        </SmallText>
        <FlexBox>
          <SmallText onClick={() => setIsOpen(true)}>
            <UnderlineText>{item?.name}</UnderlineText>
          </SmallText>
          <ClaimButton disabled={isClaimed} onClick={handleClaim}>
            Claim
          </ClaimButton>
        </FlexBox>
      </WrapperCard>
      <VoucherDetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        voucherItem={item}
        onClaim={handleClaim}
        isClaimed={isClaimed}
      />
    </>
  );
};
