import { primaryGradient } from "@/themes/palette";
import { Box, styled } from "@mui/material";

export const Wrapper = styled(Box)({
  marginTop: 20,
});

export const Row = styled(Box)(({ theme }) => ({
  margin: "10px 0",
}));
export const Label = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 600,
  color: theme.palette.grey[200],
  textTransform: "capitalize",
  marginBottom: "16px",
}));

export const VariantButton = styled(Box)<{ selected: number; disabled?: number }>(({ theme, selected, disabled }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 500,
  color: selected ? theme.palette.common.black : theme.palette.common.white,
  cursor: !disabled ? "pointer" : "not-allowed",
  pointerEvents: !disabled ? "auto" : "none",
  background: selected ? primaryGradient : "transparent",
  padding: "8px 25px",
  borderRadius: "16px",
  border: `1px solid ${selected ? "transparent" : theme.palette.grey[200]}`,
  marginRight: "16px",
  textTransform: "capitalize",
  marginBottom: "16px",
  display: "flex",
  alignItems: "flex-end",
  gap: 8,
}));

export const VariantName = styled(Box)<{ selected: number }>(({ selected, theme }) => ({
  color: selected ? theme.palette.common.black : theme.palette.common.white,
  fontWeight: selected ? 700 : 500,
}));

export const VariantsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
}));
