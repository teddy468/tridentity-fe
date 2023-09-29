import { primaryGradient } from "@/themes/palette";
import { styled } from "@mui/material";

export const EmptyCartWrapper = styled("div")(() => ({
  width: "100%",
  height: "70vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const Content = styled("div")(({ theme }) => ({
  width: "430px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    width: "100%",
    padding: 10,
  },
}));

export const PageTitle = styled("div")(({ theme }) => ({
  fontSize: "24px",
  lineHeight: "32px",
  fontWeight: 600,
  color: theme.palette.common.white,
  margin: "24px 0",
}));

export const Description = styled("div")(({ theme }) => ({
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center",
  color: theme.palette.common.white,
}));

export const ReturnHomeButton = styled("div")(({ theme }) => ({
  cursor: "pointer",
  height: "44px",
  padding: "0 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "24px",
  marginTop: "24px",
  background: primaryGradient,
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "20px",
  color: theme.palette.common.black,
}));
