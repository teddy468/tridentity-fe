import * as React from "react";
import { ChangeEvent, useState } from "react";
import { Box, BoxProps, InputAdornment, styled, TextField, TextFieldProps } from "@mui/material";

const FormGroup = styled(Box)(() => ({
  position: "relative",
  display: "block",
  marginBottom: 8,
}));

const StyledInput = styled(TextField)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.primary}`,
  flex: 1,
  borderRadius: 8,
  width: "100%",
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
}));

const ErrorMessage = styled(Box)(({ theme }) => ({
  top: "100%",
  width: "100%",
  color: theme.palette.error.light,
  textAlign: "left",
  marginTop: 8,
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
  inputName?: string;
  endAdornment?: React.ReactNode;
  endScale?: number;
  handleChangePrefix?: (value: string) => void;
  onChangeInParent?: (value: string) => void;
};

const CustomInputHasValue = React.forwardRef((props: Props, ref) => {
  const {
    errorMessage,
    groupProps,
    errorProps,
    startAdornment,
    endAdornment,
    startScale,
    inputName,
    onChangeInParent,
    endScale,
    ...inputProps
  } = props;

  return (
    <FormGroup {...groupProps}>
      <StyledInput
        inputRef={ref}
        size="small"
        name={inputName}
        placeholder="Email/Username"
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

export default CustomInputHasValue;
