import * as React from "react";
import { Box, BoxProps, TextField, styled } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { TextFieldProps } from "@mui/material";

const FormGroup = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "block",
  marginBottom: 8,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const StyledInput = styled(TextField)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.primary}`,
  flex: 1,
  borderRadius: 8,
  width: "384px",
  maxWidth: "100%",

  input: {
    height: 42,
    padding: "12px 15px",
    paddingLeft: 10,
    boxSizing: "border-box",
    color: theme.palette.common.white,
    borderRadius: 8,
    font: "revert",
    fontWeight: 400,
    fontSize: 14,
    fontStyle: "normal",
    "&:placeholder": {
      color: theme.palette.grey[50],
    },
  },

  "& fieldset": {
    borderRadius: 8,
    fontWeight: 400,
  },

  ".Mui-focused .MuiInputAdornment-positionStart": {
    path: {
      fill: `${theme.palette.primary.main} !important`,
    },
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    width: "100%",
  },
}));

const ErrorMessage = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  width: "100%",
  color: theme.palette.error.light,
  textAlign: "left",
  margin: 8,
  fontSize: 12,
}));

const StyledInputAdornment = styled(InputAdornment)<{ scale?: number }>(({ scale }) => ({
  svg: {
    transform: `scale(${scale || 1})`,
  },
}));

type Props = TextFieldProps & {
  errorMessage?: React.ReactNode;
  groupProps?: BoxProps;
  errorProps?: BoxProps;
  startAdornment?: React.ReactNode;
  startScale?: number;
  endAdornment?: React.ReactNode;
  endScale?: number;
};

const CustomInput = React.forwardRef((props: Props, ref) => {
  const { errorMessage, groupProps, errorProps, startAdornment, endAdornment, startScale, endScale, ...inputProps } =
    props;

  return (
    <FormGroup {...groupProps}>
      <StyledInput
        inputRef={ref}
        size="small"
        {...inputProps}
        InputProps={{
          ...inputProps.InputProps,
          value: inputProps.value,
          startAdornment: startAdornment && (
            <StyledInputAdornment position="start" scale={startScale}>
              {startAdornment}
            </StyledInputAdornment>
          ),
          endAdornment: endAdornment && (
            <StyledInputAdornment position="end" scale={endScale}>
              {endAdornment}
            </StyledInputAdornment>
          ),
        }}
      />
      {!!errorMessage && <ErrorMessage {...errorProps}>{errorMessage}</ErrorMessage>}
    </FormGroup>
  );
});

export default CustomInput;
