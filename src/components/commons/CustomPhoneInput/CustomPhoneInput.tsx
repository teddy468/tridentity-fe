import * as React from "react";
import { Box, BoxProps, MenuItem, Select, SelectChangeEvent, styled, TextField, TextFieldProps } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import NumericFormatCustom from "../CustomNumberInput/CustomNumberInput";

const FormGroup = styled(Box)(() => ({
  position: "relative",
  display: "block",
  marginBottom: 8,
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
    paddingLeft: 8,
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
  "&:focus": {
    border: `1px solid ${theme.palette.border.primary}`,
  },

  "& fieldset": {
    borderRadius: 8,
    fontWeight: 400,
  },

  path: {
    fill: `${theme.palette.border.primary} !important`,
  },
  ".Mui-focused": {
    path: {
      fill: `${theme.palette.primary.main} !important`,
    },
  },
}));

const SelectPhone = styled(Select)(({ theme }) => ({
  margin: "3px 0",
  border: 0,
  outline: "none",
  borderRadius: 0,
  color: "#ABABB1",
  fontSize: "14px",
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": { marginTop: theme.spacing(3) },
  "& .MuiInputBase-input": {
    borderRadius: 0,
    position: "relative",
    height: "20px",
    backgroundColor: "transparent",
    border: "transparent",
    borderRight: "1px solid #7B7B84",
    fontSize: 16,
    marginTop: "3px",
    padding: "0",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      border: "0",
      borderRight: "1px solid #7B7B84",
      boxShadow: "0",
    },
    "&:focus": {
      border: "0",
      borderRight: "1px solid #7B7B84",
      boxShadow: "0",
    },
  },
}));

type Props = TextFieldProps & {
  errorMessage?: React.ReactNode;
  groupProps?: BoxProps;
  errorProps?: BoxProps;
  startAdornment?: React.ReactNode;
  startScale?: number;
  endAdornment?: React.ReactNode;
  handleChangePrefix: (value: string) => void;
  endScale?: number;
};

export const PREFIXES = [
  { code: "+65", label: "+65" },
  { code: "+84", label: "+84" },
];

const ErrorMessage = styled(Box)(({ theme }) => ({
  top: "100%",
  width: "100%",
  color: theme.palette.error.light,
  textAlign: "left",
  marginTop: 8,
  fontSize: 12,
}));

const CustomPhoneInput = React.forwardRef((props: Props, ref) => {
  const {
    errorMessage,
    prefix,
    handleChangePrefix,
    groupProps,
    placeholder,
    errorProps,
    startAdornment,
    endAdornment,
    startScale,
    endScale,
    ...inputProps
  } = props;

  const handlePrefixChange = (e: SelectChangeEvent<unknown>) => {
    handleChangePrefix(e.target.value as string);
  };

  return (
    <FormGroup {...groupProps}>
      <StyledInput
        inputRef={ref}
        placeholder={placeholder}
        size="small"
        sx={{ width: "100%" }}
        {...inputProps}
        id="formatted-numberformat-input"
        InputProps={{
          startAdornment: (
            <SelectPhone
              MenuProps={{
                anchorOrigin: { vertical: "bottom", horizontal: "left" },
                transformOrigin: { vertical: "top", horizontal: "left" },
              }}
              value={prefix}
              onChange={handlePrefixChange}
              input={<BootstrapInput name="inputPhone" />}
            >
              {PREFIXES.map(option => (
                <MenuItem key={option.code} value={option.code}>
                  {option.label}
                </MenuItem>
              ))}
            </SelectPhone>
          ),
          inputComponent: NumericFormatCustom as any,
        }}
      />
      {!!errorMessage && <ErrorMessage {...errorProps}>{errorMessage}</ErrorMessage>}
    </FormGroup>
  );
});

export default CustomPhoneInput;
