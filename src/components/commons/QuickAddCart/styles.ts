import { Box, Button, Checkbox, Drawer, IconButton, List, Skeleton, TextareaAutosize, styled } from "@mui/material";
import Icon from "../Icon/Icon";
import { darkLinearGradient, primaryGradient } from "@/themes/palette";

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 597,
  maxWidth: "100%",
  ".MuiDrawer-paper": {
    width: 597,
    background: darkLinearGradient,
    backdropFilter: "blur(12px)",
    "&:after": {
      content: `""`,
      width: 1,
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      background: "linear-gradient(94.22deg, #FDCD9D 0%, #F7EF82 100%)",
    },
  },
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    width: "100%",
    ".MuiDrawer-paper": {
      width: "100%",
    },
  },
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 32,
  left: 32,
  padding: 0,
  cursor: "pointer",
}));

export const CloseIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.grey[200],
  "&:hover": {
    color: theme.palette.error.main,
  },
}));

export const QuickCartContainer = styled(Box)(() => ({
  width: 597,
  maxWidth: "100%",
  padding: "88px 8px 36px 32px",
  background: "linear-gradient(324deg, rgba(11, 11, 11, 0.8) 38.44%, rgba(22, 26, 24, 0.8) 85.8%)",
}));

export const ProductInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 32,
}));

export const ProductDivider = styled(Box)(({ theme }) => ({
  height: 1,
  width: "90%",
  margin: "24px 0 0 0",
  background: theme.palette.grey[700],
}));

export const ProductImage = styled("img")(() => ({
  width: 120,
  height: 120,
  borderRadius: 16,
}));

export const SkeletonProductImage = styled(Skeleton)(() => ({
  width: 120,
  height: 120,
  borderRadius: 16,
}));

export const ProductName = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  fontSize: 24,
  lineHeight: "32px",
  fontWeight: 600,
  color: theme.palette.common.white,
}));

export const ProductMerchantStore = styled(Box)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 400,
  color: theme.palette.grey[200],
}));

export const ProductAttributes = styled(Box)(() => ({
  flex: 1,
  height: "calc(100vh - 362px)",
  overflowY: "auto",
  paddingRight: 10,
}));

export const ProductAttributeItem = styled(Box)(({ theme }) => ({
  paddingTop: 32,
  paddingBottom: 16,
  color: theme.palette.grey[200],
  borderBottom: `1px solid${theme.palette.grey[700]}`,
  "&:last-of-type": {
    borderBottom: "none",
  },
}));

export const AttributeName = styled(Box)(() => ({
  marginBottom: 10,
  fontWeight: 600,
  fontSize: 18,
  lineHeight: "26px",
  textTransform: "capitalize",
}));

export const AttributeList = styled(List)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 5,
  marginLeft: -10,
}));

export const AttributeValue = styled("label")(({ theme }) => ({
  textTransform: "capitalize",
  color: theme.palette.common.white,
  display: "flex",
  alignItems: "center",
}));

export const AttributeVariantName = styled(Box)(({ theme }) => ({
  flex: 1,
}));

export const AttributePrice = styled(Box)(({ theme }) => ({
  textTransform: "capitalize",
  color: theme.palette.common.white,
}));

export const QuickCartFooter = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 116,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 36,
  borderTop: `1px solid${theme.palette.grey[700]}`,
  padding: 36,
  position: "absolute",
  bottom: 0,
  right: 0,
  background: "linear-gradient(324deg, #0B0B0B 38.44%, #161A18 85.8%)",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  width: 365,
  maxWidth: "100%",
  height: 44,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  borderRadius: 24,
  background: primaryGradient,
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.common.black,
  cursor: "pointer",
}));

export const NoteText = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 18,
  lineHeight: "26px",
  margin: "32px 0px 24px",
  color: theme.palette.common.white,
}));

export const NoteForm = styled(TextareaAutosize)(({ theme }) => ({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "26px",
  background: theme.palette.common.black,
  borderRadius: 8,
  width: "100%",
  border: `1px solid ${theme.palette.border.primary}`,
  marginBottom: 44,
  outline: "none",
  color: theme.palette.common.white,
  padding: 16,
  "&:placeholder": {
    color: theme.palette.text.disabled,
  },
}));
