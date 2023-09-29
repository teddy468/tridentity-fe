import { BorderGradientButton } from "@/components/commons/GradientButton/BorderGradientButton";
import { Container, Grid } from "@mui/material";
import { Box, styled } from "@mui/material";

export const CartWrapper = styled(Container)(({ theme }) => ({
  marginTop: 150,
  color: theme.palette.common.white,
  margin: "auto",
  width: "100%",
  padding: 20,
  minHeight: "calc(100vh - 150px)",
}));

export const VoucherContainer = styled(Container)(({ theme }) => ({
  marginTop: 150,
  color: theme.palette.common.white,
  margin: "auto",
  width: "100%",
  padding: 20,
  background: "#212124",
  zIndex: 1,
  position: "relative",
}));

export const AddVoucherButton = styled(BorderGradientButton)(({ theme }) => ({
  width: "max-content",
  marginBottom: 20,
  marginTop: 0,
}));

export const Title = styled(Box)<{ show: 1 | 0 }>(({ theme, show }) => ({
  fontSize: 32,
  fontWeight: 600,
  lineHeight: "40px",
  margin: "2rem 0",
  color: theme.palette.common.white,
  [theme.breakpoints.down("md")]: {
    display: show ? "block" : "none",
    fontSize: 24,
    margin: "1rem 0"
  },
}));

export const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const BackButton = styled(Box)<{ show: 1 | 0 }>(({ theme, show }) => ({
  display: "none",
  alignItems: "center",
  gap: 8,
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "20px",
  textTransform: "unset",
  color: theme.palette.text.disabled,
  cursor: "pointer",
  svg: {
    transform: "scale(0.8)",
    path: {
      fill: theme.palette.text.disabled,
    },
  },
  marginBottom: 32,
  [theme.breakpoints.down("md")]: {
    display: show ? "inline-flex" : "none",
  },
}));
export const CartCount = styled(Box)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontWeight: 400,
  display: "inline-block",
}));

export const Footer = styled(Box)(() => ({
  position: "fixed",
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: 20,
  backgroundColor: "#fff",
  width: "100%",
  margin: "0 -20px",
}));

export const Checkout = styled(Box)(() => ({
  display: "flex",
  color: "#fff",
  backgroundColor: "#7169D9",
  padding: "10px 20px",
  borderRadius: 5,
  cursor: "pointer",
  "&:hover": {
    filter: "brightness(125%)",
  },
}));

export const Temp = styled("div")(() => ({
  background: "rgba(41, 45, 50, 1)",
  height: 36,
}));

export const TextNoVoucher = styled("span")(({ theme }) => ({
  display: "block",
  width: "100%",
  fontSize: 14,
  fontWeight: 400,
  lineHeight: "20px",
  color: "rgba(171, 171, 177, 1)",
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    margin: "10px 0",
  },
}));

export const TextNoVoucherMatching = styled("div")(() => ({
  textAlign: "center",
}));

export const StyledGrid = styled(Grid)<{ show: 1 | 0 }>(({ theme, show }) => ({
  [theme.breakpoints.down("md")]: {
    display: show ? "block" : "none",
  },
}));

export const StepFooter = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[700],
  padding: 16,
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

export const SubTotal = styled(Box)(({}) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
}));
