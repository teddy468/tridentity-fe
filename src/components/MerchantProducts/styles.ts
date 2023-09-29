import { HeaderSearchIcon } from "@/assets/icons";
import { darkLinearGradient } from "@/themes/palette";
import { Box, Grid, Select, TextField } from "@mui/material";
import { Container, styled } from "@mui/material";

export const AllDishesWrapper = styled("div")(() => ({
  background: "linear-gradient(324deg, #0B0B0B 38.44%, #161A18 85.8%)",
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

export const SearchForm = styled("form")(() => ({
  width: "100%",
  display: "flex",
  margin: "24px 0",
  gap: 10,
}));

export const FilterWrapperDesktop = styled(Grid)(({ theme }) => ({
  width: "fit-content",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const FilterWrapperMobile = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const SearchTextField = styled(TextField)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.primary}`,
  flex: 1,
  borderRadius: 8,
  width: "100%",

  input: {
    height: 42,
    padding: "12px 20px 12px 8px",
    boxSizing: "border-box",
    color: theme.palette.common.white,
    borderRadius: 8,
    font: "revert",
    fontWeight: 400,
    fontSize: 16,
    fontStyle: "normal",
    "&:placeholder": {
      color: theme.palette.green[100],
    },
  },
  "& fieldset": {
    borderRadius: 8,
    fontWeight: 400,
  },
  [theme.breakpoints.down("md")]: {
    "& .MuiInputBase-root": {
      paddingLeft: 0,
    },
    input: {
      padding: 0,
    },
  },
}));

export const SearchIcon = styled(HeaderSearchIcon)(({ theme }) => ({
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

export const MarketPlaceContentDesktop = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const MarketPlaceContentMobile = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
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
