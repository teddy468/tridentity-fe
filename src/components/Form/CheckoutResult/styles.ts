import { primaryGradient } from "@/themes/palette";
import { Box, Modal, styled } from "@mui/material";

export const StyledModal = styled(Modal)(() => ({
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const Container = styled(Box)(() => ({
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
}));

export const Title = styled("div")(({ theme }) => ({
  fontWeight: 600,
  fontSize: "32px",
  lineHeight: "40px",
  color: theme.palette.common.white,
  marginBottom: 32,
  maxWidth: 384,
}));

export const Content = styled("div")(({ theme }) => ({
  fontSize: "16px",
  lineHeight: "24px",
  color: theme.palette.common.white,
  maxWidth: 384,
  textAlign: "center",
  marginBottom: 32,
}));

export const SuccessTitle = styled("h3")(({ theme }) => ({
  fontWeight: 600,
  fontSize: "32px",
  lineHeight: "40px",
  color: "#12B76A",
  maxWidth: 384,
  textAlign: "center",
  marginBottom: 12,
}));

export const ErrorTitle = styled(SuccessTitle)(({ theme }) => ({
  color: "#F25A5A",
}));

export const Message = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "26px",
  color: "#C3C3C3",
  maxWidth: 384,
  textAlign: "center",
}));

export const LoyaltyPoint = styled(Message)(({ theme }) => ({
  color: "#12B76A",
  display: "inline-block",
}));

export const Footer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const CloseButton = styled("div")(() => ({
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

export const CloseText = styled("div")(({ theme }) => ({
  borderRadius: 24,
  fontSize: 14,
  lineHeight: "20px",
  background: primaryGradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 500,
}));

export const Tier = styled("span")(({ theme }) => ({
  textTransform: "capitalize",
}));
