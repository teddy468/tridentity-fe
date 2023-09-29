import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { CustomSlider, Wrapper } from "./styles";
import { EXCHANGE_RATE } from "@/commons/constants/apiUrl";
import useFetch from "@/commons/hooks/useFetch";
import BigNumber from "bignumber.js";
import { UseFormReturn } from "react-hook-form";

interface Props {
  maxLP: number;
  timestamp: number;
  form: UseFormReturn<CreateOrderValues>;
}

export default function LoyaltyPointSliderInput({ maxLP, timestamp, form }: Props) {
  const [amount, setAmount] = useState<number>(0);

  const { data: configExchange } = useFetch<ConfigExchange>(EXCHANGE_RATE + `?timestamp=${timestamp}`);

  const { watch, register, setValue } = form;

  useEffect(() => {
    return () => {
      setValue("loyalty_point", 0);
    };
  }, []);

  const loyaltyPointUsed = watch("loyalty_point") || 0;
  const currencyRate = configExchange?.sgd_rate || 1;
  const lpRate = configExchange?.lp_rate || 1;

  const getLPBalance = (value?: number) => {
    if (value && value > 0) {
      return (value * currencyRate) / lpRate;
    }
    return 0;
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setAmount(newValue);
      setValue("loyalty_point", newValue);
    }
  };

  return (
    <>
      <Wrapper>
        <CustomSlider
          value={amount}
          min={0}
          step={1}
          max={maxLP}
          size="small"
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box textAlign={"left"}>S$ 0.00</Box>
          <Box textAlign={"right"}>S$ {getLPBalance(loyaltyPointUsed).toFixed(2)}</Box>
        </Box>
      </Wrapper>
      <input {...register("loyalty_point")} hidden />
    </>
  );
}
