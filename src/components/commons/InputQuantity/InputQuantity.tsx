import { getNumberOnRange } from "@/commons/utils/getValueOnRange";
import { ActionButton, StyledInput, Wrapper } from "./styles";
import { useEffect, useState } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "@/assets/icons";

const unExceptThisSymbols = ["e", "E", "+", "-", "."];

interface InputQuantityProps {
  quantity: number;
  max?: number;
  onChange: (number: number) => void;
  disabled?: boolean;
}
const InputQuantity = ({ quantity, onChange, max = 999, disabled }: InputQuantityProps) => {
  const [value, setValue] = useState(`${quantity}`);
  useEffect(() => {
    setValue(`${quantity}`);
  }, [quantity]);

  const handleChange = (value: string | number) => {
    onChange(getNumberOnRange(Number(value) || 1, 1, max));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValue(`${value ? getNumberOnRange(Number(value), 1, max) : ""}`);
    if (value) handleChange(value);
  };

  const onBlur = () => {
    setValue(`${getNumberOnRange(Number(value || quantity), 1, max)}`);
  };

  return (
    <Wrapper>
      <ActionButton disableRipple disabled={quantity <= 1} onClick={() => handleChange(quantity - 1)}>
        <MinusCircleIcon />
      </ActionButton>
      <StyledInput
        type="number"
        value={value}
        onChange={handleChangeInput}
        onBlur={onBlur}
        disabled={disabled || !max}
        onKeyDown={e => unExceptThisSymbols.includes(e.key) && e.preventDefault()}
      />
      <ActionButton disableRipple disabled={quantity >= max} onClick={() => handleChange(quantity + 1)}>
        <PlusCircleIcon />
      </ActionButton>
    </Wrapper>
  );
};

export default InputQuantity;
