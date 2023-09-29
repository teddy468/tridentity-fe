import { Box, Modal, keyframes, styled } from "@mui/material";
import { LogoLoading } from "@/assets/icons";
export const StyledModal = styled(Modal)(() => ({
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const Container = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  width: 100,
  height: 100,
}));

export const StyledLogo = styled(LogoLoading)(() => ({
  maxWidth: "100%",
  maxHeight: "100%",
  width: "auto",
  height: "auto",

  animation: `rotation 1.5s infinite`,
  animationDelay: "0.2s",
  animationDirection: "reverse",
  animationFillMode: "forwards",

  "@keyframes rotation": {
    "0%": {
      opacity: 0.8,
      transform: "rotate(359deg)",
    },
    "50%": {
      opacity: 1,
      transform: "rotate(180deg)",
    },
    "100%": {
      opacity: 0.8,
      transform: "rotate(0deg)",
    },
  },
}));
