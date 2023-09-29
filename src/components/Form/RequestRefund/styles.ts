import { primaryGradient } from "@/themes/palette";
import { Box, Button, Modal, styled } from "@mui/material";

export const StyledModal = styled(Modal)(({ theme }) => ({
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const Container = styled(Box)(({ theme }) => ({
  background: "linear-gradient(324deg, rgba(11, 11, 11, 0.8) 38.44%, rgba(22, 26, 24, 0.8) 85.8%)",
  backdropFilter: "blur(12px)",
  color: "rgb(128, 128, 137)",
  padding: "32px 44px",
  width: 588,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #FDCD9D",
  borderRadius: 20,
  [theme.breakpoints.down("md")]: {
    width: "90%",
    padding: "1rem",
    display: "block",
  },
}));

export const StyledForm = styled("form")(({ theme }) => ({}));

export const OrderInformationWrapper = styled("div")(() => ({}));

export const OrderInformationUpper = styled("div")(() => ({
  color: "white",
  fontWeight: "500",
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
}));

export const OrderStoreInformation = styled("div")(() => ({}));

export const OrderStoreImgWrapper = styled("div")(() => ({
  width: "44px",
  height: "44px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  borderRadius: "8px",
}));

export const OrderStoreImg = styled("img")(() => ({
  width: "44px",
  background: "cover",
}));

export const OrderInformationLower = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1rem",
}));

export const OrderDetailLeft = styled("div")(() => ({
  width: "60%",
}));

export const OrderDetailRight = styled("div")(() => ({
  width: "40%",
  textAlign: "right",
}));

export const Title = styled("div")(({ theme }) => ({
  fontWeight: 600,
  fontSize: "32px",
  lineHeight: "40px",
  color: theme.palette.common.white,
  marginBottom: "2rem",
  [theme.breakpoints.down("md")]: {
    marginBottom: "1rem",
  },
}));

export const RatingItemWrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
}));
export const ItemInfo = styled("div")(() => ({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  width: "100%",
  flex: 1,
}));
export const ItemImage = styled("img")(() => ({
  width: 44,
  height: 44,
  borderRadius: 8,
  objectFit: "cover",
  marginRight: 12,
}));

export const ItemInfoWrapper = styled("div")(() => ({
  display: "flex",
  alignItems: "flex-start",
  width: "100%",
}));

export const ItemName = styled("div")(({ theme }) => ({
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "24px",
  color: theme.palette.common.white,
}));

export const Service = styled("div")(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.common.white,
  marginTop: 8,
  marginBottom: 12,
}));

export const OrderId = styled("div")(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.grey[200],
}));
export const DateTime = styled(OrderId)(() => ({
  marginTop: 6,
}));

export const ReviewArea = styled("div")(({ theme }) => ({
  position: "relative",
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: 8,
  marginTop: 24,
  padding: "1rem 1rem 2rem 1rem",
}));

export const ReviewAreaContent = styled("textarea")(({ theme }) => ({
  width: "100%",
  background: "transparent",
  height: 60,
  border: "none",
  color: theme.palette.grey[200],
  fontFamily: "Graphik, sans-serif",
  resize: "none",
  "&:placeholder": {
    color: theme.palette.grey[200],
    fontFamily: "Graphik",
  },
  "&:focus": {
    outline: "none",
  },
}));

export const ReviewAreaTextCounter = styled("div")(() => ({
  position: "absolute",
  fontSize: "12px",
  bottom: "0.5rem",
  right: "1rem",
}));

export const Label = styled("div")(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.grey[200],
  fontWeight: 500,
  marginBottom: 12,
  marginTop: 32,
}));
export const PhotoWrapper = styled("div")(() => ({
  position: "relative",
}));

export const InputArea = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.grey[200],
  height: 72,
  width: "100%",
  border: `1px dashed ${theme.palette.grey[400]}`,
  borderRadius: 8,
  ">div": {
    marginRight: 10,
  },
}));

export const StyledInput = styled("input")(() => ({
  width: "100%",
  height: 72,
  position: "absolute",
  opacity: 0,
  top: 0,
  left: 0,
  cursor: "pointer",
}));

export const Footer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 32,
}));

export const CancelButton = styled("div")(() => ({
  position: "relative",
  background: "#151515",
  border: "1px solid transparent",
  padding: "2px",
  height: 40,
  width: 180,
  borderRadius: 24,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",

  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: "-1",
    margin: "-2px",
    borderRadius: "inherit",
    background: primaryGradient,
  },
}));
export const CancelText = styled("div")(({ theme }) => ({
  borderRadius: 24,
  fontSize: 14,
  lineHeight: "20px",
  background: primaryGradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 500,
}));

export const SubmitButton = styled("button")(({ theme, disabled }) => ({
  background: disabled ? "gray" : primaryGradient,
  height: 44,
  width: 184,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 24,
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.common.black,
  fontWeight: 500,
  marginLeft: 16,
  cursor: "pointer",
}));

export const OrderItem = styled("div")(() => ({
  padding: "32px 0",
  borderBottom: "1px solid #38383C",
  ":last-child": {
    borderBottom: "none",
  },
}));

export const ProductReviewWrapper = styled("div")(() => ({
  marginTop: "-40px",
  maxHeight: "calc(100vh - 280px)",
  height: "fit-content",
  overflowY: "auto",
}));

export const MainProductVariant = styled("div")(() => ({
  marginTop: 4,
}));
export const Toppings = styled("div")(() => ({
  marginTop: 4,
}));

export const Content = styled("div")(() => ({
  width: "100%",
}));

export const DetailWrapper = styled("div")(() => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: "100%",
}));

export const Price = styled("div")(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 600,
  fontSize: 18,
  lineHeight: "26px",
}));
export const ErrorMessage = styled(Box)(({ theme }) => ({
  top: "100%",
  width: "100%",
  color: theme.palette.error.light,
  textAlign: "left",
  marginTop: 4,
  fontSize: 12,
}));
