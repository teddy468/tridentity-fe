import { InfoCircleIcon } from "@/assets/icons";
import { EXCHANGE_RATE, LP_CONVERSION, MEMBERSHIP_EXTRA } from "@/commons/constants/apiUrl";
import useFetch from "@/commons/hooks/useFetch";
import useToast from "@/commons/hooks/useToast";
import { getNumberOnRange } from "@/commons/utils/getValueOnRange";
import { GradientText } from "@/components/commons/GradientText/GradientText";
import Icon from "@/components/commons/Icon/Icon";
import { format2Digit, formatLP, roundingNumber } from "@/utils/formatNumber";
import { Box } from "@mui/material";
import BigNumber from "bignumber.js";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Detail,
  LoyaltyPoint,
  LoyaltyPointEarn,
  LoyaltyPointTitle,
  LoyaltyPointUSD,
  LoyaltyPointValue,
  PopoverItem,
  StyledInput,
  StyledPopover,
  StyledSwitch,
  SubmitDivider,
  TooltipWrapper,
  TotalItem,
  TotalValue,
} from "./styles";
import LoyaltyPointSliderInput from "@/components/Payment/CheckoutForm/LoyaltyPointSliderInput/LoyaltyPointSliderInput";

interface Props {
  form: UseFormReturn<CreateOrderValues>;
  total: number;
  merchantBonusLP: number;
  voucher: any;
  freeItemByVoucher: any;
  timestamp: number;
  loadingVoucher: boolean;
  merchantMinOrder: number | null;
}

export default function CheckoutSummary(props: Props) {
  const { form, total, merchantBonusLP, voucher, freeItemByVoucher, timestamp, loadingVoucher, merchantMinOrder } =
    props;

  const { loyaltyPoint } = useSelector(({ user }: RootState) => user);
  const { loading: loadingCart, platformMinOrder } = useSelector(({ cart }: RootState) => cart);

  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState<boolean>(false);
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const [minOrder, setMinOrder] = useState<number>(0);

  const { data: lpConversion, loading: loadingLPConversion } = useFetch<{ percent: number }>(
    LP_CONVERSION + `?timestamp=${timestamp}`
  );

  const { data: membershipExtra, loading: loadingMembershipExtra } = useFetch<MemberShipExtra>(
    MEMBERSHIP_EXTRA + `?timestamp=${timestamp}`
  );
  const { data: configExchange, loading: loadingConfigExchange } = useFetch<ConfigExchange>(
    EXCHANGE_RATE + `?timestamp=${timestamp}`
  );
  const toast = useToast();

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = form;

  useEffect(() => {
    setValue("loading.lpConversion", loadingLPConversion, { shouldValidate: true });
    setValue("loading.membershipExtra", loadingMembershipExtra, { shouldValidate: true });
    setValue("loading.configExchange", loadingConfigExchange, { shouldValidate: true });
    setValue("loading.cart", loadingCart, { shouldValidate: true });
    setValue("loading.voucher", loadingVoucher, { shouldValidate: true });
  }, [loadingLPConversion, loadingMembershipExtra, loadingConfigExchange, loadingCart]);

  const getLPBalance = (value?: number | string) =>
    new BigNumber(value || 0).multipliedBy(configExchange?.sgd_rate || 1).div(configExchange?.lp_rate || 1);

  const onChangeUseLoyalty = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (!loyaltyPoint?.point) return toast.error("You don't have Loyalty Point");
    setUseLoyaltyPoints(checked);
    setValue("loyalty_point", 0, { shouldValidate: true });
  };

  const membershipBonus = useMemo(() => {
    const result = new BigNumber(total).multipliedBy(membershipExtra?.extra_lp || 0).toNumber();
    return formatLP(result);
  }, [total, membershipExtra?.extra_lp]);

  const isDiscount = useMemo(() => {
    return Number(voucher?.discount_amount) > 0;
  }, [voucher?.discount_amount]);

  const freeProductPrice = useMemo(() => {
    return freeItemByVoucher && freeItemByVoucher[0] && freeItemByVoucher[0]?.product_detail?.price;
  }, [freeItemByVoucher]);

  const voucherAmount = useMemo(() => {
    if (isDiscount) {
      return voucher?.discount_amount;
    }
    return 0;
  }, [isDiscount, freeProductPrice, voucher?.discount_amount]);

  const shippingFee = watch("shippingFee");
  const distance = watch("distance");
  const loyaltyPointUsed = watch("loyalty_point") || 0;

  const handleMinOrder = () => {
    let minOrder = 0;

    if (merchantMinOrder) {
      return merchantMinOrder >= platformMinOrder ? (minOrder = merchantMinOrder) : (minOrder = platformMinOrder);
    } else {
      return (minOrder = platformMinOrder);
    }
  };

  const totalBill = useMemo(() => {
    let minOrder = handleMinOrder();

    if (total < minOrder) {
      minOrder = minOrder - total;
    } else {
      minOrder = 0;
    }

    const bill = new BigNumber(total + minOrder);

    setMinOrder(minOrder);

    if (voucher && new BigNumber(total).gte(voucher?.minimum_spending)) {
      return bill.minus(getLPBalance(loyaltyPointUsed)).minus(voucherAmount).plus(shippingFee).toFixed(2);
    }
    return bill.minus(getLPBalance(loyaltyPointUsed)).plus(shippingFee).toFixed(2);
  }, [total, shippingFee, loyaltyPointUsed, voucher, voucherAmount]);

  useEffect(() => {
    trigger("loyalty_point");
  }, [total]);

  useEffect(() => {
    setValue("merchantBonusLP", merchantBonusLP);
  }, [merchantBonusLP]);

  return (
    <>
      <TotalItem>
        Subtotal <TotalValue>S$ {format2Digit(total)}</TotalValue>
      </TotalItem>
      {minOrder > 0 && total > 0 && (
        <TotalItem>
          <Box display={"flex"} justifyContent={"space-between"}>
            Small order fee
            <Box>
              <Box
                onMouseEnter={() => setOpenPopover(true)}
                onMouseLeave={() => setOpenPopover(false)}
                onClick={() => setOpenPopover(true)}
              >
                <Icon sx={{ paddingLeft: 1 }} icon={InfoCircleIcon} />
              </Box>
            </Box>
          </Box>
          <TooltipWrapper onClick={() => setOpenPopover(false)}>
            {openPopover && (
              <StyledPopover>
                <PopoverItem>
                  <Detail>
                    A small order fee only applies to orders less than S$ {format2Digit(handleMinOrder().toString())}{" "}
                    for the platform. Add S$ {format2Digit(minOrder)} worth of items or more to remove the fee.
                  </Detail>
                </PopoverItem>
              </StyledPopover>
            )}
          </TooltipWrapper>
          <TotalValue>S$ {format2Digit(minOrder)}</TotalValue>
        </TotalItem>
      )}

      {distance > 0 && (
        <TotalItem>
          Distance
          <TotalValue>{format2Digit(distance)} km</TotalValue>
        </TotalItem>
      )}

      {shippingFee > 0 && (
        <TotalItem>
          Delivery fee
          <TotalValue>S$ {format2Digit(shippingFee)}</TotalValue>
        </TotalItem>
      )}

      {membershipBonus > 0 && (
        <TotalItem>
          LP earn <LoyaltyPointEarn>+ {membershipBonus} LP</LoyaltyPointEarn>
        </TotalItem>
      )}
      {merchantBonusLP > 0 && (
        <TotalItem>
          Bonus LP <LoyaltyPointEarn>+ {formatLP(merchantBonusLP)} LP</LoyaltyPointEarn>
        </TotalItem>
      )}
      {voucher && isDiscount && new BigNumber(total).gte(voucher?.minimum_spending) && (
        <TotalItem>
          Voucher Discount <TotalValue>- S$ {voucherAmount}</TotalValue>
        </TotalItem>
      )}
      {loyaltyPoint && loyaltyPoint.point > 0 && (
        <LoyaltyPoint>
          <LoyaltyPointTitle>LP balance</LoyaltyPointTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="12px">
            <LoyaltyPointValue>{formatLP(loyaltyPoint?.point)}</LoyaltyPointValue>
            <LoyaltyPointUSD>~ S$ {format2Digit(getLPBalance(loyaltyPoint?.point).toString())}</LoyaltyPointUSD>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="12px">
            Use LP
            <StyledSwitch
              disabled={!loyaltyPoint?.point}
              color="success"
              checked={useLoyaltyPoints}
              onChange={onChangeUseLoyalty}
            />
          </Box>
          {useLoyaltyPoints && (
            <Box display="flex" alignItems={"center"} justifyContent={"space-between"}>
              <Box display={"flex"} alignItems={"center"}></Box>
              <LoyaltyPointSliderInput maxLP={loyaltyPoint.point} timestamp={timestamp} form={form} />
              {errors.loyalty_point && <span style={{ color: "red" }}>{errors.loyalty_point.message}</span>}
            </Box>
          )}
        </LoyaltyPoint>
      )}
      <SubmitDivider />
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="24px">
        <GradientText>Total bill</GradientText>
        <GradientText fontSize={24} fontWeight={600}>
          {`S$ ${totalBill}`}
        </GradientText>
      </Box>
      <input {...register("loading.lpConversion", { validate: value => !value })} hidden />
      <input {...register("loading.membershipExtra", { validate: value => !value })} hidden />
      <input {...register("loading.configExchange", { validate: value => !value })} hidden />
      <input {...register("loading.cart", { validate: value => !value })} hidden />
      <input {...register("merchantBonusLP")} hidden />
    </>
  );
}
