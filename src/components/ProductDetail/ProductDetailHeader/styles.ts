import { ZINDEX } from "@/commons/constants/zIndex";
import { primaryGradient } from "@/themes/palette";
import { Box, Button, Container, styled } from "@mui/material";

export const StyledContainer = styled(Container)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  flexWrap: "wrap",
  marginTop: 150,
});

export const ButtonGroup = styled(Box)(({ theme }) => ({
  marginTop: 30,
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    display: "none",
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  width: 365,
  maxWidth: "100%",
  height: 44,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  borderRadius: 24,
  background: primaryGradient,
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.common.black,
  cursor: "pointer",
}));

export const Quantity = styled(Box)(({ theme }) => ({
  margin: "20px 0",
  color: theme.palette.grey[200],
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 600,
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    display: "none",
  },
}));
export const Price = styled(Box)({
  margin: "16px 0",
  color: "rgba(0, 0, 0, 0.87)",
});

export const ErrorMessage = styled(Box)({
  color: "red",
  marginTop: 10,
});

export const InputQuantityWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    display: "none",
  },
}));

export const ProductInfo = styled(Box)(({ theme }) => ({
  width: "50%",
  paddingLeft: 40,
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    width: "100%",
    paddingLeft: 0,
    marginTop: 44,
  },
}));
export const InputQuantityMobile = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
}));
export const AddToCartMobile = styled(Container)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    position: "fixed",
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "linear-gradient(324deg, #0B0B0B 38.44%, #161A18 85.8%)",
    borderTop: "1px solid #38383C",
    height: 100,
    zIndex: ZINDEX.FIXED,
    marginLeft: "-16px",
  },
}));

export const ButtonAddToCartMobile = styled(StyledButton)(({ theme }) => ({
  width: "224px !important",
}));
