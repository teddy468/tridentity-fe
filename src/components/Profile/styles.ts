import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Unstable_Grid2";

export const MenuTitle = styled("h5")(({ theme }) => ({
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 24,
  lineHeight: "32px",
  marginBottom: 12,
  fontFamily: "Graphik",
  paddingLeft: "15px",
  color: theme.palette.common.white,
}));

export const MenuSubTitle = styled("p")(({ theme }) => ({
  fontStyle: "normal",
  fontSize: 12,
  lineHeight: "16px",
  paddingBottom: 32,
  marginBottom: 32,
  fontFamily: "Graphik",
  paddingLeft: "15px",
  color: "#ABABB1",
  borderBottom: "1px solid #4E4E54",
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#635ee7",
    display: "none",
  },
  "& .MuiTab-iconWrapper": {
    position: "absolute",
    left: "15px",
  },
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: "rgba(255, 255, 255, 0.7)",
  "&.Mui-selected": {
    color: "rgba(253, 205, 157, 1)",
    backgroundColor: "#1D3B30",
    borderRadius: "8px",
    height: "40px",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
  backgroundColor: "transparent",
}));

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  ".MuiDrawer-root": {
    background: "linear-gradient(324deg, #0B0B0B 38.44%, #161A18 85.8%)",
  },
}));

export const FilterContainer = styled(Grid)(({ theme }) => ({
  width: "fit-content",
}));

export const FlexDivLeft = styled("div")(({ theme }) => ({
  display: "none",
  alignItems: "center",
  width: "100%",
  marginBottom: "15px",
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
}));

export const TitlePageDetail = styled("div")(({ theme }) => ({
  height: "20px",
  color: "white",
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "26px",
  marginLeft: "16px",
  marginBottom: "7px",
}));
