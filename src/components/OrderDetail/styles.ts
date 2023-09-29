import { ORDER_STATUS } from "@/commons/constants/order";
import { Box, Container, styled, Theme } from "@mui/material";
import CustomLink from "../commons/CustomLink/CustomLink";
import { BorderGradientButton } from "../commons/GradientButton/BorderGradientButton";
import { GradientButton } from "../commons/GradientButton/GradientButton";

export const MyOrderContainer = styled(Container)(({ theme }) => ({
  paddingTop: 60,
  [theme.breakpoints.down("sm")]: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

export const BackButton = styled(CustomLink)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "20px",
  textTransform: "unset",
  color: theme.palette.text.disabled,
  svg: {
    transform: "scale(0.8)",
    path: {
      fill: theme.palette.text.disabled,
    },
  },
  marginBottom: 32,
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    display: "none",
  },
}));
export const OrderContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[800],
  borderRadius: 16,
  padding: 24,
  color: theme.palette.common.white,

  [theme.breakpoints.down("md")]: {
    padding: 16,
  },
}));

export const OrderInfoDesktop = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: 3,
  position: "relative",
  zIndex: 1,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const OrderInfoMobile = styled(Box)(({ theme }) => ({
  display: "none",
  justifyContent: "space-between",
  gap: 3,
  marginBottom: 10,
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
}));

export const AreaMobile = styled(Box)(({ theme }) => ({
  display: "none",
  justifyContent: "space-between",
  gap: 3,
  marginBottom: 10,
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

export const AreaPC = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const OrderDetail = styled(Box)(({ theme }) => ({
  flex: 1,
}));

export const ImageBox = styled(Box)(({ theme }) => ({
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
      return theme.palette.warning.main;
    case ORDER_STATUS.CONFIRMED:
    case ORDER_STATUS.DELIVERED:
    case ORDER_STATUS.SUCCEEDED:
    case ORDER_STATUS.COMPLETED:
    case ORDER_STATUS.SETTLED:
    case ORDER_STATUS.USER_PICKED_UP:
      return theme.palette.success.main;
    case ORDER_STATUS.DELIVERING:
    case ORDER_STATUS.WAITING_FOR_PAYMENT:
      return theme.palette.info.main;
    case ORDER_STATUS.REFUNDED:
    case ORDER_STATUS.REJECTED:
    default:
      return theme.palette.error.main;
  }
};

export const OrderStatus = styled(Box)<{ status: ORDER_STATUS }>(({ theme, status }) => ({
  color: getStatusColor(theme, status),
  fontWeight: 600,
  fontSize: 12,
  lineHeight: "16px",
}));

export const MerchantName = styled(CustomLink)(({}) => ({
  fontWeight: 600,
  fontSize: 18,
}));

export const ShipmentMethod = styled(Box)(({ theme }) => ({
  fontWeight: 400,
  fontSize: 16,
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

export const PayNowButton = styled(GradientButton)(({ theme }) => ({
  width: "max-content",
  height: "max-content",
}));

export const ReOrderButton = styled(GradientButton)(({ theme }) => ({
  width: "max-content",
  height: "max-content",
  marginLeft: 12,
  "&:first-of-type": { marginLeft: 0 },
  [theme.breakpoints.down("sm")]: {
    width: "50%",
    fontSize: 14,
  },
}));

export const CompletedButton = styled(ReOrderButton)(({}) => ({}));

export const RateOrderButton = styled(BorderGradientButton)(({ theme }) => ({
  width: "max-content",
  height: "max-content",
  marginLeft: 10,
  marginBottom: 0,
  "&:first-of-type": { marginLeft: 0 },
  [theme.breakpoints.down("md")]: {
    width: "50%",
    fontSize: 14,
  },
}));

export const ContactStoreButton = styled(RateOrderButton)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export const ProductList = styled(Box)(({}) => ({
  width: "max-content",
  height: "max-content",
  marginLeft: 10,
  marginBottom: 0,
  "&:first-of-type": { marginLeft: 0 },
}));

export const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.grey[600]}`,
  marginTop: 50,
}));

export const Row = styled(Header)(({ theme }) => ({
  background: theme.palette.grey[800],
  marginTop: 10,
  "&:last-of-type": {
    border: "none",
  },
}));

export const Col = styled(Box)(({ theme }) => ({
  textAlign: "left",
  padding: 16,
  [theme.breakpoints.down("md")]: {
    paddingTop: 16,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 16,
  },
}));

export const MerchantStore = styled(CustomLink)(() => ({
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
}));

export const ProductItem = styled(Box)(() => ({
  display: "flex",
  gap: 12,
  marginBottom: 4,
}));

export const ProductLink = styled(CustomLink)(() => ({
  width: "100%",
  display: "inline-block",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const ProductImage = styled("img")(() => ({
  width: 44,
  height: 44,
  borderRadius: 4,
}));

export const ProductAttributeWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const ProductAttribute = styled(Box)(({ theme }) => ({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.text.disabled,
  textTransform: "capitalize",
}));

export const MoreInfo = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  height: 48,
  justifyContent: "space-between",
}));

export const Title = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.common.white,
}));
export const TotalTitle = styled(Title)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: 20,
  lineHeight: "20px",
}));
export const Value = styled(Title)(({ theme }) => ({
  fontWeight: 400,
}));
export const TotalValue = styled(Value)(({ theme }) => ({
  fontSize: 20,
}));

export const RequestRefundButton = styled(Box)<{ disabled?: boolean }>(({ theme, disabled }) => ({
  color: theme.palette.common.white,
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "20px",
  padding: "8px 20px",
  border: "1px solid #fff",
  borderRadius: 24,
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.5 : 1,
}));
