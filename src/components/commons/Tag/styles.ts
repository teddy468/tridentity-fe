import { primaryGradient } from "@/themes/palette";
import { Box, styled } from "@mui/material";

export const TagWrapper = styled(Box)(() => ({
  background: primaryGradient,
  borderRadius: 8,
  padding: "6px 12px",
  color: "#000000",
  textTransform: "capitalize",
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "20px",
}));
