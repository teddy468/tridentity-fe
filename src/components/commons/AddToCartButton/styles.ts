import { CartIcon } from "@/assets/icons";
import { Box, styled } from "@mui/material";

export const StyledButton = styled(Box)<{ active: number }>(({ active }) => ({
  width: "35px",
  height: "35px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #000000",
  borderRadius: "50%",
  background: active ? "#aaaaaa" : "#D9D9D9",
}));

export const StyledCartIcon = styled(CartIcon)(() => ({}));
