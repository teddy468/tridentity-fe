import { MinusCircleIcon, PlusCircleIcon } from "@/assets/icons";
import { ActionButton, StyledInput, Wrapper } from "./styles";

interface InputQuantityProps {
  quantity: number;
  updateQuantity: (quantity: number) => void;
  onInputQuantity: (value: string, type: InputAction) => void;
  maxNumber: number;
}
const InputQuantity = ({ quantity, onInputQuantity, updateQuantity, maxNumber }: InputQuantityProps) => {
  return (
    <Wrapper>
      <ActionButton active={quantity > 1} onClick={() => updateQuantity(quantity - 1)}>
        <MinusCircleIcon />
      </ActionButton>
      <StyledInput
        type="number"
        value={quantity}
        onChange={event => onInputQuantity(event.target.value, "onChange")}
        onBlur={event => onInputQuantity(event.target.value, "onBlur")}
      />
      <ActionButton active={maxNumber ? quantity < maxNumber : true} onClick={() => updateQuantity(quantity + 1)}>
        <PlusCircleIcon />
      </ActionButton>
    </Wrapper>
  );
};

export default InputQuantity;
