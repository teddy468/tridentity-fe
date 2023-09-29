import { styled, Container, Box, TextField, Theme } from "@mui/material";
import CustomInput from "../commons/CustomInput/CustomInput";
import { HeaderSearchIcon } from "@/assets/icons";
import { BorderGradientButton } from "../commons/GradientButton/BorderGradientButton";
import Link from "next/link";
import { ORDER_STATUS } from "@/commons/constants/order";
import CustomLink from "../commons/CustomLink/CustomLink";
import { GradientButton } from "../commons/GradientButton/GradientButton";
import { isMobile } from "react-device-detect";

export const MyOrderContainer = styled(Container)(({ theme }) => ({
  paddingTop: 60,
  [theme.breakpoints.down("sm")]: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

export const HeaderContainer = styled(Box)(() => ({ padding: "0px 25px 25px" }));

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

export const OrderList = styled(Box)(() => ({
  marginBottom: 10,
}));

export const OrderItem = styled(Box)(({ theme }) => ({
  color: theme.palette.common.white,
  width: "100%",
  padding: 24,
  borderBottom: `1px solid ${theme.palette.grey[600]}`,
  cursor: "pointer",
}));

export const OrderInfoDesktop = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: 3,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const OrderInfoMobile = styled(Box)(({ theme }) => ({
  display: "none",
  justifyContent: "space-between",
  gap: 3,
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
  },
}));

export const OrderDetail = styled(Box)(({ theme }) => ({
  flex: 1,
}));

export const ImageLink = styled(Link)(({ theme }) => ({
  display: "block",
  width: 140,
  height: 140,
  [theme.breakpoints.down("md")]: {
    width: 84,
    height: 84,
    marginBottom: 18,
  },
}));

export const MerchantImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  background: theme.palette.background.default,
  borderRadius: 8,
}));

const getStatusColor = (theme: Theme, status?: ORDER_STATUS) => {
  switch (status) {
    case ORDER_STATUS.ON_GOING:
    case ORDER_STATUS.REFUNDING:
      return theme.palette.warning.light;
    case ORDER_STATUS.CONFIRMED:
    case ORDER_STATUS.DELIVERED:
    case ORDER_STATUS.SUCCEEDED:
    case ORDER_STATUS.COMPLETED:
    case ORDER_STATUS.SETTLED:
    case ORDER_STATUS.USER_PICKED_UP:
      return theme.palette.success.light;
    case ORDER_STATUS.DELIVERING:
      return theme.palette.info.main;
    case ORDER_STATUS.WAITING_FOR_PAYMENT:
      return theme.palette.secondary.light;
    case ORDER_STATUS.REFUNDED:
    case ORDER_STATUS.REJECTED:
    default:
      return theme.palette.error.light;
  }
};

export const OrderStatus = styled(Box)<{ status: ORDER_STATUS }>(({ theme, status }) => ({
  flex: 1,
  color: getStatusColor(theme, status),
  fontWeight: 600,
  fontSize: 12,
  lineHeight: "16px",
}));

export const MerchantName = styled(CustomLink)(({theme}) => ({
  fontWeight: 600,
  fontSize: 18,
  lineHeight: "26px",
  [theme.breakpoints.down('md')] : {
    margin: '12px 0'
  }
}));

export const ShipmentMethod = styled(Box)(({ theme }) => ({
  fontWeight: 400,
  fontSize: 16,
  lineHeight: "24px",
  color: theme.palette.common.white,
}));

export const OrderInfo = styled(Box)(({ theme }) => ({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.text.disabled,
}));

export const OrderId = styled(OrderInfo)(({}) => ({
  marginBottom: 6,
  fontSize: 14,
}));

export const ProductPrice = styled(Box)(({ theme }) => ({
  width: "max-content",
  textAlign: "right",
}));

export const ProductPriceDesktop = styled(ProductPrice)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const ProductCount = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "24px",
  marginBottom: 12,
  color: theme.palette.text.disabled,
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
    lineHeight: "20px",
    marginBottom: 6,
  },
}));

export const PriceValue = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 24,
  lineHeight: "32px",
  [theme.breakpoints.down("md")]: {
    fontSize: 18,
    lineHeight: "24px",
  },
}));

export const ReOrderButton = styled(GradientButton)(({}) => ({
  width: isMobile ? "100%" : "max-content",
  height: "max-content",
  marginTop: isMobile ? 20 : "auto",
  marginLeft: 12,
  "&:first-of-type": { marginLeft: 0 },
}));

export const PayNowButton = styled(ReOrderButton)(({ theme }) => ({
}));

export const CompletedButton = styled(ReOrderButton)(({}) => ({}));

export const RateOrderButton = styled(BorderGradientButton)(({}) => ({
  width: "max-content",
  height: "max-content",
  marginLeft: 10,
  marginBottom: 0,
  "&:first-of-type": { marginLeft: 0 },
}));
