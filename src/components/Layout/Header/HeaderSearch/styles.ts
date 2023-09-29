import { HeaderSearchIcon } from "@/assets/icons";
import { CloseOutlined } from "@mui/icons-material";
import { Button, TextField, styled } from "@mui/material";

export const SearchInput = styled(TextField)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.primary}`,
  flex: 1,
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

export const StyledButton = styled(Button)(() => ({
  minWidth: "auto",
  padding: 0,
}));
export const SearchIcon = styled(HeaderSearchIcon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginLeft: 2.5,
}));

export const StyledCloseIcon = styled(CloseOutlined)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "block",
    color: "#fff",
  },
}));
