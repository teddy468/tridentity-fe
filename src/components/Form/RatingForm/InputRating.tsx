import React from "react";
import { ReviewArea } from "./styles";

type Props = {
  currentRate?: CurrentProductRating;
  setNote: (itemId: number, note: string) => void;
  orderItemId: number;
  placeholder: string;
};

const InputRating = ({ currentRate, setNote, orderItemId, placeholder }: Props) => {
  return (
    <ReviewArea
      disabled={!!currentRate}
      value={currentRate?.description}
      placeholder={placeholder}
      maxLength={300}
      onChange={e => setNote(orderItemId, e.target.value)}
    />
  );
};

export default InputRating;
