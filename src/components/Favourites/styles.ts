import { styled } from "@mui/material/styles";
import { Box, Button, TextField } from "@mui/material";
import { HeaderSearchIcon } from "@/assets/icons";

export const MainContainer = styled(Box)(({ theme }) => ({
  zIndex: 0,
  // [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
  //   padding: "0 16px",
  // },
}));

export const Title = styled(Box)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 600,
  lineHeight: "40px",
  color: theme.palette.common.white,
  marginBottom: "30px",
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    fontSize: "24px",
    lineHeight: "32px",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const HeaderContainer = styled(Box)(() => ({ padding: "0px 0px 25px" }));

export const SearchInput = styled(TextField)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.primary}`,
  width: "100%",
  borderRadius: 8,
  input: {
    height: 42,
    padding: "12px 15px",
    boxSizing: "border-box",
    color: theme.palette.common.white,
    borderRadius: 8,
    font: "revert",
    fontWeight: 400,
    fontSize: 14,
    fontStyle: "normal",
    "&:placeholder": {
      color: theme.palette.green[100],
    },
  },
  "& fieldset": {
    borderRadius: 8,
    fontWeight: 400,
  },
  ".Mui-focused": {
    path: {
      stroke: `${theme.palette.primary.main} !important`,
    },
  },
}));

export const SearchIcon = styled(HeaderSearchIcon)(() => ({
  width: 20,
  height: 20,
  marginLeft: 2.5,
}));

export const SearchTextField = styled(TextField)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.primary}`,
  flex: 1,
  borderRadius: 8,
  marginBottom: "24px",

  input: {
    height: 42,
    padding: "12px 15px 12px 5px",
    boxSizing: "border-box",
    color: theme.palette.common.white,
    borderRadius: 8,
    font: "revert",
    fontWeight: 400,
    fontSize: 14,
    fontStyle: "normal",
    "&:placeholder": {
      color: theme.palette.green[100],
    },
  },
  "& fieldset": {
    borderRadius: 8,
    fontWeight: 400,
  },

  width: "100%",
}));

export const ButtonSearch = styled(Button)(() => ({
  padding: "0px",
  minWidth: "0px",
}));
