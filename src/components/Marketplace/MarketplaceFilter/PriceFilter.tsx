import * as React from "react";
import { FilterGroup, FilterGroupTitle, PriceRange, PriceInput, PriceSlider } from "./styles";
import { InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { getNumberOnRange } from "@/commons/utils/getValueOnRange";

interface Props {
  value: number[];
  handleSelect: (value: number[]) => void;
  open: boolean;
}
const PriceFilter: React.FC<Props> = ({ value, handleSelect, open }) => {
  const [fromValue, setFromValue] = useState<string | number>(value[0] || "");
  const [toValue, setToValue] = useState<string | number>(value[1] || "");
  const handleChange = (e: Event, value: number | number[]) => {
    if (Array.isArray(value)) handleSelect(value);
  };

  const handleChangeFrom = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = e.target.value;
    setFromValue(newValue ? getNumberOnRange(Number(newValue), 0, 100) : "");
    if (e.target.value) handleSelect([getNumberOnRange(Number(newValue), 0, 100), value[1]]);
  };

  const handleChangeTo = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = e.target.value;
    setToValue(newValue ? getNumberOnRange(Number(newValue), 0, 100) : "");
    if (e.target.value) handleSelect([value[0], getNumberOnRange(Number(newValue), 0, 100)]);
  };

  useEffect(() => {
    setFromValue(value[0]);
  }, [value[0]]);

  useEffect(() => {
    setToValue(value[1]);
  }, [value[1]]);

  return (
    <FilterGroup>
      <FilterGroupTitle>Price</FilterGroupTitle>
      <PriceRange open={open ? 1 : 0}>
        <PriceInput
          InputProps={{
            startAdornment: <InputAdornment position="start">From</InputAdornment>,
            endAdornment: <InputAdornment position="start">S$</InputAdornment>,
            onChange: handleChangeFrom,
          }}
          value={fromValue}
          type="number"
        />
        <PriceInput
          InputProps={{
            startAdornment: <InputAdornment position="start">To</InputAdornment>,
            endAdornment: <InputAdornment position="start">S$</InputAdornment>,
            onChange: handleChangeTo,
          }}
          value={toValue}
          type="number"
        />
      </PriceRange>
      <PriceSlider valueLabelDisplay="auto" disableSwap value={value} onChange={handleChange} />
    </FilterGroup>
  );
};

export default PriceFilter;
