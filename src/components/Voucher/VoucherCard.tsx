import useToast from "@/commons/hooks/useToast";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { MediumTextOverflow } from "../MerchantDetail/Voucher/styles";
import { BigText, FlexBox, MediumText, SmallText, UnderlineText, WrapperCard } from "./styles";
import VoucherDetailModal from "./VoucherDetailModal";

interface VoucherProps {
  item: any;
  onRefesh: () => void;
}

export const VoucherCard = (props: VoucherProps) => {
  const router = useRouter();
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
    return (item?.voucherUsers as any[])?.length > 0;
  }, [item?.voucherUsers]);

  // TODO : Waiting api

  const handleClaim = async (item: any) => {
    router.push(`/store/${item?.merchant_store_id}`);
  };

  return (
    <>
      <WrapperCard onClick={() => setIsOpen(true)}>
        <BigText>{isDiscount ? ` $S ${item?.discount_amount} OFF` : `Free ${textFreeProduct}`}</BigText>
        <MediumTextOverflow>
          Applied to{" "}
          {appliedProducts.map((prod, index) => {
            return (
              <>
                {prod?.product?.name} {appliedProducts.length === 1 || index === appliedProducts.length - 1 ? "" : ", "}
              </>
            );
          })}
        </MediumTextOverflow>
        <SmallText>
          Valid till: {dayjs(item?.end_date).isValid() && dayjs(item?.end_date).format("DD/MM/YYYY")}
        </SmallText>
        <FlexBox>
          <SmallText>
            <UnderlineText>{item?.name}</UnderlineText>
          </SmallText>
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
