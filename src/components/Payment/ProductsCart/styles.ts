import CustomLink from "@/components/commons/CustomLink/CustomLink";
import { Box, Checkbox, TextareaAutosize, styled } from "@mui/material";
import Link from "next/link";

export const CartWrapper = styled(Box)(({ theme }) => ({
  marginTop: 150,
  color: theme.palette.common.white,
  margin: "auto",
  marginBottom: 24,
  width: "100%",
  borderRadius: 4,
  overflow: "hidden",
  background: theme.palette.grey[800],
}));

export const ResponsiveBox = styled(Box)<{ screen?: "desktop" | "mobile" }>(({ theme, screen }) =>
  screen
    ? {
        [theme.breakpoints[screen === "mobile" ? "up" : "down"]("md")]: {
          display: "none",
        },
      }
    : {}
);

export const Header = styled(ResponsiveBox)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.common.white,
  background: theme.palette.grey[700],
}));

export const Row = styled(Header)(({ theme }) => ({
  background: theme.palette.grey[800],
}));

export const Col = styled(Box)(({ theme }) => ({
  textAlign: "left",
  padding: 16,
  [theme.breakpoints.down("md")]: {
    padding: "10px 16px",
  },
}));

export const StyledCheckbox = styled(Checkbox)(() => ({
  width: 16,
  height: 16,
}));

export const MerchantStore = styled(Box)(() => ({
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
}));

export const MerchantName = styled(Box)(() => ({
  margin: "0px 10px 0px 5px",
  textDecoration: "underline",
}));

export const ProductLink = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-start",
  gap: 8,
}));
export const ProductImage = styled("img")(() => ({
  width: 60,
  height: 60,
  borderRadius: 4,
}));

export const MerchantDivider = styled(Box)(({ theme }) => ({
  margin: "0px 10px",
  borderTop: `1px solid ${theme.palette.grey[600]}`,
  "&:last-of-type": {
    border: "none",
  },
}));

export const NoteWrapper = styled(Box)(({ theme }) => ({
  padding: "8px 0",
  margin: "16px auto",
  borderRadius: 8,
  background: theme.palette.grey[800],
}));

export const NoteContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  margin: 16,
}));

export const NoteForm = styled(TextareaAutosize)(({ theme }) => ({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "20px",
  background: theme.palette.grey[800],
  borderRadius: 8,
  width: "100%",
  border: `1px solid ${theme.palette.border.primary}`,
  marginBottom: 0,
  outline: "none",
  color: theme.palette.common.white,
  padding: "8px 16px",
  resize: "vertical",
  minHeight: 40,
  "&::placeholder": {
    color: theme.palette.text.disabled,
    fontFamily: "Graphik, sans-serif",
  },
  paddingBottom: 30,
}));

export const NoteLength = styled(Box)(() => ({
  position: "absolute",
  bottom: 20,
  right: 20,
  lineHeight: "16px",
  fontSize: "12px",
  fontWeight: 400,
  color: "#ABABB1",
}));

export const ProductName = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.common.white,
  cursor: "pointer",
}));

export const VariantName = styled("span")(({ theme }) => ({
  fontSize: 12,
  lineHeight: "16px",
  color: theme.palette.common.white,
  textTransform: "capitalize",
  fontWeight: 400,
}));

export const VariantValue = styled("span")(({ theme }) => ({
  fontWeight: 400,
  fontSize: 12,
  lineHeight: "16px",
  color: theme.palette.grey[400],
  textTransform: "capitalize",
}));

export const BonusLPContainer = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 400,
  marginBottom: 16,
  [theme.breakpoints.down("md")]: {
    marginTop: 8,
  },
}));

export const LoyaltyPointBonus = styled(Box)(({ theme }) => ({
  color: theme.palette.success.light,
  display: "inline-block",
}));
