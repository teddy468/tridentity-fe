import {
  GoogleGradientIcon,
  MetamaskIcon,
  TriFoodLogo,
  WalletConnectIcon,
} from "@/assets/icons";
import { Box, Button, Divider, Modal, TextField, styled } from "@mui/material";
import Link from "next/link";

export const StyledModal = styled(Modal)(() => ({
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const Container = styled(Box)(({ theme }) => ({
  background:
    "linear-gradient(324deg, rgba(11, 11, 11, 0.8) 38.44%, rgba(22, 26, 24, 0.8) 85.8%)",
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
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    padding: "32px 20px",
  },
}));

export const LogoLink = styled(Link)(() => ({
  width: 200,
  minWidth: "max-content",
  height: 50,
  display: "block",
  marginBottom: 40,
}));

export const StyledLogo = styled(TriFoodLogo)(() => ({
  maxWidth: "100%",
  maxHeight: "100%",
  width: "auto",
  height: "auto",
}));

export const LoginMethodWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));

export const LoginDivider = styled(Divider)(({ theme }) => ({
  width: "100%",
  margin: "2rem 0px",
  fontWeight: 400,
  fontSize: 14,
  color: theme.palette.grey[400],

  "&::before, &::after": {
    borderTopColor: theme.palette.grey[500],
  },
}));

export const SignUpWithTriApp = styled(Button)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  padding: "9px 24px",
  fontSize: 14,
  lineHeight: "20px",
  textTransform: "none",
  fontWeight: 500,
  width: "100%",
  backgroundClip: "padding-box",
  border: "1px solid transparent",
  backgroundColor: theme.palette.common.black,
  borderRadius: 24,
  marginBottom: "2rem",
  "&:before": {
    content: `""`,
    position: "absolute",
    inset: 0,
    zIndex: -1,
    margin: "-1px",
    background: "linear-gradient(to right bottom, #FDCD9D, #F7EF82)",
    borderRadius: "inherit",
  },
  div: {
    background: "linear-gradient(94.22deg, #FDCD9D 0%, #F7EF82 100%)",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  "&:hover": {
    backgroundColor: theme.palette.common.black,
    "&:before": {
      background: "#F4E85B",
    },
    div: {
      background: "none",
      WebkitTextFillColor: "#F4E85B",
    },
    svg: {
      path: {
        fill: "#F4E85B",
      },
    },
  },
}));

export const GradientText = styled(Box)(() => ({
  background: "linear-gradient(94.22deg, #FDCD9D 0%, #F7EF82 100%)",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 500,
}));

export const SignUpHelper = styled(Box)(() => ({
  textAlign: "center",
  fontWeight: 400,
  fontSize: 14,
  color: "#fff",
}));

export const SignUpLink = styled(Link)(() => ({
  display: "inline-block",
  marginLeft: 4,
}));

export const GuestBrowse = styled(Box)(({ theme }) => ({
  color: theme.palette.common.white,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));

export const GuestBrowseIconWrapper = styled(Box)(() => ({
  display: "flex",
  justifyItems: "center",
  alignItems: "center",
}));

export const GuestBrowseTextWrapper = styled(Box)(() => ({
  textDecoration: "underline",
  fontSize: 14,
  paddingLeft: "0.5rem",
}));

export const ConnetWalletWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: 40,
}));

export const MetamaskLogo = styled(MetamaskIcon)(() => ({
  width: 50,
  height: 50,
}));

export const WalletConnetLogo = styled(WalletConnectIcon)(() => ({
  width: 50,
  height: 50,
}));

export const LoginEmailWrapper = styled("div")(() => ({
  width: "100%",

  ".mb-38": {
    marginBottom: 38,
  },
}));

export const LoginHeaderTilte = styled("div")(() => ({
  color: "#ffffff",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "40px",
  marginBottom: 16,
}));

export const LoginTextField = styled(TextField)(() => ({
  width: "100%",

  "& .MuiInputBase-input": {
    color: "#DBDBDE",

    "&::placeholder": {
      color: "#DBDBDE",
      opacity: 1,
    },
  },

  "& .MuiOutlinedInput-root": {
    border: "1px solid #7B7B84",
    borderRadius: "8px",

    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
}));

export const PasswordField = styled(LoginTextField)(() => ({}));

export const ForgotPasswordText = styled("div")(() => ({
  textAlign: "right",
  marginTop: 6,
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "16px",
  color: "#E3F1EC",
  cursor: "pointer",
  marginBottom: 36,
}));

export const LoginButton = styled(Button)(() => ({
  background: "linear-gradient(to right bottom, #FDCD9D, #F7EF82)",
  display: "flex",
  padding: "12px 24px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  borderRadius: 24,
  width: "100%",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "20px",
  color: "#0B0B0C",
}));

export const ContinueWithGGButton = styled(SignUpWithTriApp)(() => ({}));

export const GoogleGradientLogo = styled(GoogleGradientIcon)(() => ({}));

export const TextGradient = styled("div")(() => ({
  background: "linear-gradient(to right bottom, #FDCD9D, #F7EF82)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

export const TextSignup = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: 10,

  ".pointer": {
    cursor: "pointer",
  },
}));

export const TabWrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: 4,
  borderTopLeftRadius: "9999px",
  borderTopRightRadius: "9999px",
  borderBottomLeftRadius: "9999px",
  borderBottomRightRadius: "9999px",
  background: "#38383C",
  color: "#C3C3C3",
  width: "100%",
  // zIndex: 1,

  ".active": {
    backgroundColor: "#1D3B30",

    borderTopLeftRadius: "9999px",
    borderTopRightRadius: "9999px",
    borderBottomLeftRadius: "9999px",
    borderBottomRightRadius: "9999px",

    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: "9px 24px",
    fontSize: 14,
    lineHeight: "20px",
    textTransform: "none",
    fontWeight: 500,
    width: "100%",
    backgroundClip: "padding-box",
    border: "1px solid transparent",
    // zIndex: 1,
    // pointerEvents: "none",

    "&:before": {
      content: `""`,
      position: "absolute",
      inset: 0,
      zIndex: -1,
      margin: "-1px",
      background: "linear-gradient(to right bottom, #FDCD9D, #F7EF82)",
      borderRadius: "inherit",
      pointerEvents: "none",
    },
  },
}));

export const TabItem = styled("div")(() => ({
  width: "100%",
  background: "transparent",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "8px 16px",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "20px",
  cursor: "pointer",
}));
