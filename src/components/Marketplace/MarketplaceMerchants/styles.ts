import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/material";

export const MainContainer = styled(Box)(({ theme }) => ({
  zIndex: 0,
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    padding: "0 16px",
  },
}));

export const FilterResult = styled(Box)(() => ({
  marginBottom: 30,
}));

export const SearchResult = styled("h3")(() => ({
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: 20,
  lineHeight: "22px",
  color: "white",
  marginTop: "20px"
}));
