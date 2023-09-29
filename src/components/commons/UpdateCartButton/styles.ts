import { CartIcon } from "@/assets/icons";
import { Box, styled } from "@mui/material";

export const StyledButton = styled(Box)<{ active: number }>(({ active }) => ({
  width: "35px",
  height: "35px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));

export const StyledCartIcon = styled(CartIcon)(() => ({}));
