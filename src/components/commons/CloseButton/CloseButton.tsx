import { CloseCircleIcon } from "@/assets/icons";
import { styled } from "@mui/material";

export const CloseButton = styled(CloseCircleIcon)(() => ({
  width: 32,
  height: 32,
  position: "absolute",
  top: "2rem",
  right: "2rem",
  borderRadius: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));