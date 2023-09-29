import dayjs from "dayjs";
import { useMemo } from "react";
import { BigText, MediumText, SmallText, WrapperCard } from "../Voucher/styles";

interface VoucherProps {
  item: any;
  onSelect: (id : number) => void;
}

export const VoucherCard = (props: VoucherProps) => {
  const { item, onSelect } = props;
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


  return (
    <>
      <WrapperCard onClick={() => onSelect(item)}>
        <BigText>{isDiscount ? ` $S ${item?.discount_amount} OFF` : `Free ${textFreeProduct}`}</BigText>
        <MediumText>
          Applied to{" "}
          {appliedProducts.map((prod, index) => {
            return (
              <span>
                {prod?.product?.name} {appliedProducts.length === 1 || index === appliedProducts.length - 1 ? "" : ", "}
              </span>
            );
          })}
        </MediumText>
        <SmallText>
          Valid till: {dayjs(item?.end_date).isValid() && dayjs(item?.end_date).format("DD/MM/YYYY")}
        </SmallText>
        {/* <FlexBox>
          <SmallText>
            <UnderlineText>{item?.name}</UnderlineText>
          </SmallText>
        </FlexBox> */}
      </WrapperCard>
    </>
  );
};
