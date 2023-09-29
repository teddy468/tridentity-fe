import { HeaderLogo } from "@/assets/icons";
import { Box, Button, Modal, styled } from "@mui/material";
import Link from "next/link";

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
  padding: "32px 100px",
  width: 588,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #FDCD9D",
  borderRadius: 20,
}));

export const LogoLink = styled(Link)(() => ({
  width: 200,
  minWidth: "max-content",
  height: 32,
  display: "block",
  marginBottom: 40,
}));

export const StyledLogo = styled(HeaderLogo)(() => ({
  maxWidth: "100%",
  maxHeight: "100%",
  width: "auto",
  height: "auto",
}));

export const Title = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 32,
  lineHeight: "40px",
  marginBottom: 16,
  color: theme.palette.common.white,
  width: "100%",
  textAlign: "center",
}));

export const VerifyGuide = styled(Box)(({ theme }) => ({
  fontWeight: 400,
  fontSize: 16,
  lineHeight: "24px",
  marginBottom: 36,
  color: theme.palette.common.white,
  width: "100%",
  textAlign: "center",
}));

export const RegisterEmail = styled(Box)(() => ({
  fontWeight: 500,
  display: "inline-block",
}));

export const GoToLoginButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(94.22deg, #FDCD9D 0%, #F7EF82 100%)",
  borderRadius: 24,
  padding: "12px 24px",
  lineHeight: "16px",
  textTransform: "none",
  color: theme.palette.text.primary,
  fontWeight: 500,
  width: "100%",
}));

export const GoToHomeButton = styled(Link)(({ theme }) => ({
  background: "linear-gradient(94.22deg, #FDCD9D 0%, #F7EF82 100%)",
  borderRadius: 24,
  padding: "12px 24px",
  lineHeight: "16px",
  textTransform: "none",
  color: theme.palette.text.primary,
  fontWeight: 500,
  width: "100%",
  textAlign: "center",
}));
