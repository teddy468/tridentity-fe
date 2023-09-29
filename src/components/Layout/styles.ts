import { ZINDEX } from "@/commons/constants/zIndex";
import { Box, Button, styled } from "@mui/material";

export const Wrapper = styled(Box)(() => ({
  marginTop: 85,
  position: "relative",
}));
export const ChatButton = styled(Button)(() => ({
  border: "1px solid rgba(249, 242, 166, 0.4)",
  width: 56,
  height: 56,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(324deg, rgba(11, 11, 11, 0.8) 38.44%, rgba(22, 26, 24, 0.8) 85.8%)",
  boxShadow: "0px 8px 24px rgba(247, 238, 136, 0.16)",
  cursor: "pointer",
  borderRadius: 16,
  position: "fixed",
  zIndex: ZINDEX.FIXED,
  bottom: "64px",
  right: "40px",
}));
