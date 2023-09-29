import * as React from "react";
import { Box, Checkbox, styled } from "@mui/material";
import { CheckboxProps } from "@mui/material";
import { TickSquareBoldIcon, TickSquareIcon } from "@/assets/icons";

const CheckboxContainer = styled(Box)(() => ({
  display: "inline-block",
  width: 38,
  height: 38,
  overflow: "hidden",
  minWidth: 38,
}));

const FormGroup = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 38,
  height: 38,
}));

const CustomCheckbox = React.forwardRef((props: CheckboxProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
  return (
    <CheckboxContainer>
      <FormGroup>
        <Checkbox ref={ref} {...props} icon={<TickSquareIcon />} checkedIcon={<TickSquareBoldIcon />} />
      </FormGroup>
    </CheckboxContainer>
  );
});

export default CustomCheckbox;
