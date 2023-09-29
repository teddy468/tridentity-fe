import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { CloseCircleIcon } from "@/assets/icons";
import { primaryGradient } from "@/themes/palette";

export const FilterBar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  [theme.breakpoints.down("md")]: {
    // marginTop: "-66px",
  },
}));

export const FilterItem = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  width: "max-content",
  padding: "10px 12px",
  background: "transparent",
  border: "1px solid #F7EF82",
  borderRadius: 8,
  marginRight: 15,
  marginBottom: 24,

  "&:last-child": {
    marginRight: 0,
  },
}));
export const FilterLabel = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "24px",
  color: theme.palette.grey[200],
  marginRight: 24,
  marginBottom: 24,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const FilterItemName = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  flex: 1,
  color: theme.palette.common.white,
  marginRight: 24,
}));

export const ButtonClose = styled(CloseCircleIcon)(() => ({
  cursor: "pointer",
}));
export const ClearAll = styled(Box)(({}) => ({
  background: primaryGradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  cursor: "pointer",
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 500,
  marginLeft: 24,
  marginBottom: 24,
}));
