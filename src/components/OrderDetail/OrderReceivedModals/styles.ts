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
  marginBottom: "40px",
  maxWidth: 384,
}));

export const Content = styled("div")(({ theme }) => ({
  fontSize: "16px",
  lineHeight: "24px",
  color: theme.palette.common.white,
  maxWidth: 384,
  textAlign: "center",
}));
export const LPNumber = styled("span")(({ theme }) => ({
  color: "#12B76A",
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
export const SubmitButton = styled("div")(({ theme }) => ({
  background: primaryGradient,
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

export const Tier = styled("span")(({ theme }) => ({
  textTransform: "capitalize",
}));
