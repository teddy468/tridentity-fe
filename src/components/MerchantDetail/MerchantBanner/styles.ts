import { Box, styled } from "@mui/material";

export const MerchantBannerWrapper = styled(Box)(() => ({}));

export const Item = styled(Box)(({ theme }) => ({
  maxHeight: 338,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    maxHeight: 120,
  },
}));

export const StyledImage = styled("img")(() => ({
  width: "100%",
  height: "auto",
  verticalAlign: "middle",
}));
