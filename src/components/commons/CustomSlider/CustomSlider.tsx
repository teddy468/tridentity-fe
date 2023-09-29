import { Mark } from "@mui/base";
import { StyledSlider } from "./styles";

interface CustomSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange?: () => void;
  disabled?: boolean;
  marks?: Mark[];
}

const CustomSlider = ({ min, max, step, value, onChange, disabled = false, marks }: CustomSliderProps) => {
  return (
    <StyledSlider marks={marks} min={min} max={max} step={step} value={value} onChange={onChange} disabled={disabled} />
  );
};

export default CustomSlider;
