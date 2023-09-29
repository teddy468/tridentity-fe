import { HeaderSearchIcon } from "@/assets/icons";
import { darkLinearGradient } from "@/themes/palette";
import { Box, Button, Grid, Select, TextField } from "@mui/material";
import { Container, styled } from "@mui/material";

export const MarketplaceWrapper = styled(Box)(() => ({
  background: darkLinearGradient,
}));
export const MarketPlaceContainer = styled(Container)(({ theme }) => ({
  padding: "64px 0",
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    flexDirection: "column",
    padding: "20px 0",
  },
}));

export const FilterContainer = styled(Grid)(({ theme }) => ({
  width: "fit-content",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const AllDishesWrapper = styled("div")(() => ({
  background: darkLinearGradient,
}));

export const AllDishesContainer = styled(Container)(({ theme }) => ({
  padding: "64px 0 144px 0",
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    padding: "44px 24px",
  },
}));

export const Title = styled("div")(({ theme }) => ({
  fontWeight: 600,
  fontSize: "32px",
  lineHeight: "40px",
  color: theme.palette.common.white,
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    fontSize: "24px",
    lineHeight: "30px",
  },
}));

export const SearchTextField = styled(TextField)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.primary}`,
  flex: 1,
  borderRadius: 8,
  marginTop: 24,
  marginBottom: 24,

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

  width: "100%",
}));

export const SearchIcon = styled(HeaderSearchIcon)(() => ({
  width: 20,
  height: 20,
  marginLeft: 2.5,
}));

export const HeaderWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
}));

export const IconFilterWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  border: `1px solid ${theme.palette.border.primary}`,
  height: "44px",
  width: "44px",
  borderRadius: "8px",
  cursor: "pointer",
}));

export const SelectSortWrapper = styled(Select)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  border: `1px solid ${theme.palette.border.primary}`,
  borderRadius: "8px",
  cursor: "pointer",

  width: "200px",
  height: "44px",
  color: theme.palette.common.white,

  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "20px",
}));

export const SelectSortIconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "20px",
}));

export const PaginationWrapper = styled(Box)(({ theme }) => ({
  justifyContent: "right",
  display: "flex",
}));

export const SearchForm = styled("form")(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: 24,
}));

export const FilterContainerMobile = styled(Box)(({ theme }) => ({
  width: "max-content",
  minWidth: "max-content",
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
    marginTop: 24,
    marginBottom: 24,
  },
}));

export const SearchButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    padding: 0,
    minWidth: "max-content",
  },
}));
