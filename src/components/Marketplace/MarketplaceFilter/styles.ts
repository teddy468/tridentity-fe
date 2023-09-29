import { styled } from "@mui/material/styles";
import { Box, Radio, InputLabel, Select, MenuItem, Input, Slider, Button, TextField, Drawer } from "@mui/material";
import { CloseCircleIcon, FilterIcon, FilterOutlineIcon } from "@/assets/icons";
import { GradientButton } from "@/components/commons/GradientButton/GradientButton";

export const FilterContainer = styled(Box)(() => ({
  zIndex: 1,
  position: "relative",
}));
export const FilterHeader = styled(Box)(() => ({
  display: "inline-flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 30,
}));

export const FilterTitle = styled("h3")(() => ({
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: 20,
  lineHeight: "22px",
}));

export const ToggleMenu = styled(Box)(() => ({
  padding: 10,
  cursor: "pointer",
}));

export const Categories = styled(Box)(() => ({}));
export const FilterGroup = styled(Box)(() => ({
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: 18,
  lineHeight: "22px",
  marginBottom: 20,
}));

export const SubFilterGroup = styled(Box)(() => ({
  marginBottom: 20,
}));

export const FilterGroupTitle = styled("h3")(({ theme }) => ({
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "24px",
  marginBottom: 10,
  color: theme.palette.common.white,
}));

export const CategoryOption = styled(InputLabel)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const CategoryRadio = styled(Radio)(() => ({
  borderRadius: "50%",
}));

export const CategoryLabel = styled("div")(() => ({
  width: "100%",
  marginLeft: 8,
  whiteSpace: "break-spaces",
}));

export const CategoryName = styled("span")(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.common.white,
}));

export const CategoryCount = styled("span")(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.grey[200],
  marginLeft: 12,
}));

export const SubCategorySelect = styled(Select)(() => ({
  height: 40,
  width: "100%",
  marginBottom: 15,
}));

export const SubCategoryPlaceHolder = styled(Box)(() => ({
  color: "#999",
}));

export const SubCategoryOption = styled(MenuItem)(() => ({}));

export const PriceRange = styled(Box)<{ open: number }>(({ open }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: open ? "nowrap" : "wrap",
  gap: 30,
  marginBottom: 20,
}));

export const PriceInput = styled(TextField)(() => ({
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 12,
  lineHeight: "16px",
  "> div": {
    padding: 8,
    height: 40,
  },
  input: {
    textAlign: "right",
    height: 20,
    padding: 8,
  },
}));

export const PriceSlider = styled(Slider)(() => ({
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 12,
  lineHeight: "16px",
  margin: "0px 10px",
  width: "calc(100% - 20px)",
}));

export const ApplyButton = styled(Button)(() => ({
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 12,
  lineHeight: "16px",
  width: "max-content",
  margin: "0px auto",
}));

export const FilterBtn = styled(GradientButton)<{ active?: number }>(({ theme, active }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  zIndex: 1,
  padding: 10,
  lineHeight: 0,
  minWidth: 0,
  borderRadius: 8,
  width: 42,
  height: 42,
  boxSizing: "border-box",
  color: theme.palette.common.black,
  border: "1px solid transparent",
  ...(!active
    ? {
        background: "transparent",
        color: "#C3C3C3",
        borderColor: theme.palette.grey[300],
      }
    : {}),

  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

export const StyledDrawer = styled(Drawer)(() => ({
  ".MuiDrawer-root": {
    background: "linear-gradient(324deg, #0B0B0B 38.44%, #161A18 85.8%)",
  },
}));

export const Header = styled(Box)(() => ({
  fontWeight: 600,
  fontSize: 24,
  lineHeight: 32,
  width: "100%",
  textAlign: "center",
  position: "relative",
  paddingTop: 30,
  height: "60px",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 60,
}));

export const StyledCloseIcon = styled(CloseCircleIcon)(() => ({
  position: "absolute",
  right: "34px",
  top: "34px",
}));
export const CategoryWrapper = styled(Box)(() => ({
  padding: "10px",
}));

export const StyledFilterGroup = styled(FilterGroup)(({ theme }) => ({
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    display: "none",
  },
}));
