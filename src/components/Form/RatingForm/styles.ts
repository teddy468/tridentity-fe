import { primaryGradient } from "@/themes/palette";
import { Box, Modal, styled, TextField } from "@mui/material";

export const StyledModal = styled(Modal)(() => ({
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const Container = styled(Box)(({ theme }) => ({
  border: "1px solid #FDCD9D",
  borderRadius: 20,
  background: "linear-gradient(324deg, rgba(11, 11, 11, 0.8) 38.44%, rgba(22, 26, 24, 0.8) 85.8%)",
  backdropFilter: "blur(12px)",
  color: "rgb(128, 128, 137)",
  padding: "32px 44px",
  width: 588,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    width: "92%",
    padding: "1rem 1rem",
  },
}));
export const Title = styled("div")(({ theme }) => ({
  fontWeight: 600,
  fontSize: "32px",
  lineHeight: "40px",
  color: theme.palette.common.white,
  marginBottom: 40,
  [theme.breakpoints.down("md")]: {
    marginBottom: 20,
  },
}));

export const RatingItemWrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
}));
export const ItemInfo = styled("div")(() => ({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
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

export const ReviewArea = styled("textarea")(({ theme }) => ({
  marginTop: 24,
  padding: 16,
  width: "100%",
  background: "transparent",
  height: 100,
  borderRadius: 8,
  border: `1px solid ${theme.palette.grey[400]}`,
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

export const CountCharacters = styled("p")(({ theme }) => ({
  float: "right",
  position: "relative",
  bottom: "34px",
  right: "20px",
}));

export const Label = styled("div")(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.grey[200],
  fontWeight: 500,
  marginBottom: 12,
  marginTop: 32,
  [theme.breakpoints.down("md")]: {
    marginTop: 16,
  },
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

export const StyledInput = styled(TextField)(() => ({
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
}));

export const OrderItem = styled("div")(() => ({
  padding: "32px 0",
  borderBottom: "1px solid #38383C",
  ":last-child": {
    borderBottom: "none",
  },
}));

export const ProductReviewWrapper = styled("div")(({ theme }) => ({
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
  textTransform: "capitalize",
}));

export const ErrorMessage = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  width: "100%",
  color: theme.palette.error.light,
  textAlign: "left",
  marginTop: 8,
  fontSize: 12,
}));

export const RatingEvidenceWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  img: {
    width: 100,
    height: 100,
    objectFit: "contain",
    borderRadius: 8,
  },
}));
