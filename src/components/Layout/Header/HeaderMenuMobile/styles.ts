import CustomLink from "@/components/commons/CustomLink/CustomLink";
import Icon from "@/components/commons/Icon/Icon";
import { Box, styled } from "@mui/material";

export const MenuMobileWrapper = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 10,
}));

export const StyledIcon = styled(Icon)(() => ({
  color: "white",
  marginRight: 10,
}));

export const StyledCartIcon = styled(Icon)(() => ({}));

export const StyledMenuIcon = styled(Icon)(() => ({
  color: "white",
}));
export const IconButton = styled(CustomLink)(() => ({
  position: "relative",
  padding: "10px 10px 10px 0px",
  width: 44,
  height: 44,
  minWidth: "max-content",

  "&:hover": {
    path: {
      stroke: "#F4E85B",
    },
  },
}));
export const CountNumber = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: 14,
  height: 14,
  right: 14,
  top: 8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: theme.palette.common.white,
  background: "#F04438",
  borderRadius: "50%",
  fontSize: 9,
  fontWeight: 500,
  lineHeight: "9px",
  padding: 0,
}));
