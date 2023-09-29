import styled from "@emotion/styled";
import { Box, TextField } from "@mui/material";

export const StyledInput = styled(TextField)<{ variant?: string }>(({ theme }) => ({
  "& .MuiAutocomplete-input": {
    color: theme.palette.common.white,
    height: "44px",
    boxSizing: "border-box",
    paddingLeft: "12px !important",
    "&::placeholder": {
      fontSize: 14,
    },
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "transparent",
    fontSize: 14,
    border: "1px solid  #7B7B84",
    padding: "0",
    borderRadius: "8px",
    height: "44px",
  },
  "& .MuiAutocomplete-clearIndicator": {
    color: theme.palette.text.secondary,
  },
}));

export const FormGroup = styled(Box)(() => ({
  position: "relative",
  display: "block",
  marginBottom: 8,
}));

export const ErrorMessage = styled(Box)(({ theme }) => ({
  width: "100%",
  color: theme.palette.error.light,
  textAlign: "left",
  marginTop: 8,
  fontSize: 12,
}));
