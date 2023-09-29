import CustomLink from "@/components/commons/CustomLink/CustomLink";
import { darkLinearGradient } from "@/themes/palette";
import { styled, Box, Button, Popover } from "@mui/material";
import Link from "next/link";

export const Menu = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  width: "max-content",
  minWidth: "max-content",
  fontSize: 14,
}));

export const MenuItem = styled(Link)(({ theme, color }) => ({
  padding: "12px 16px",
  fontWeight: 500,

  "&:hover": {
    color: "#F4E85B",
  },

  color: color,
}));

export const IconButton = styled(CustomLink)(({ color }) => ({
  position: "relative",
  padding: 10,
  width: 44,
  height: 44,

  "&:hover": {
    path: {
      stroke: "#F4E85B",
    },
  },
  color: color,
}));

export const IconNotiButton = styled("div")(({ color }) => ({
  position: "relative",
  padding: 10,
  width: 44,
  height: 44,
  cursor: "pointer",
  "&:hover": {
    path: {
      stroke: "#F4E85B",
    },
  },
  color: color,
}));

export const CountNumber = styled(Box)<{ isMany: boolean }>(({ theme, isMany = false }) => ({
  position: "absolute",
  width: isMany ? "auto" : 14,
  height: 14,
  right: 3,
  top: 8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: theme.palette.common.white,
  background: "#F04438",
  borderRadius: isMany ? "10px" : "50%",
  fontSize: 9,
  fontWeight: 500,
  lineHeight: "9px",
  padding: isMany ? "0 4px" : 0,
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(94.22deg, #FDCD9D 0%, #F7EF82 100%)",
  borderRadius: 24,
  padding: "12px 24px",
  lineHeight: "16px",
  textTransform: "none",
  color: theme.palette.text.primary,
  fontWeight: 500,
  marginLeft: 10,
}));

export const UserButton = styled("div")(() => ({
  padding: "0px",
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginLeft: 10,
  cursor: "pointer",

  "&:hover": {
    img: {
      borderColor: "#F4E85B",
    },
    path: {
      stroke: "#F4E85B",
    },
  },
}));

export const UserAvatarWrapper = styled("div")(({ theme }) => ({
  width: 44,
  height: 44,
  border: `2px solid ${theme.palette.secondary.main}`,
  borderRadius: 60,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const UserAvatar = styled("img")(() => ({
  height: "100%",
  width: "auto",
}));

export const StyledPopover = styled(Popover)(() => ({
  "& .MuiPopover-paper": {
    borderRadius: 8,
    overflow: "hidden",
    background: darkLinearGradient,
  },
}));

export const PopoverItem = styled("div")(({ theme }) => ({
  width: 260,
  height: 50,
  display: "flex",
  paddingLeft: 44,
  alignItems: "center",
  color: theme.palette.common.white,
  fontSize: 14,
  lineHeight: "20px",
  cursor: "pointer",
  "&:hover": {
    background: "#1D3B30",
    color: "#F7EF82",
  },
}));

export const PopoverItem2 = styled("div")(({ theme }) => ({
  width: 389,
  background: "linear-gradient(324deg, #0B0B0B 38.44%, #161A18 85.8%)",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: 14,
  lineHeight: 20,
  "&:hover": {
    background: "linear-gradient(324deg, #0B0B0B 38.44%, #161A18 85.8%)",
  },
}));

export const Wrapper = styled("a")(({ theme }) => ({
  display: "flex",
  padding: 16,
  cursor: "pointer",
  borderBottom: "1px solid #38383C",
  alignItems: "center",
}));

export const Detail = styled("div")(({ theme }) => ({
  width: 269,
  color: "white",
  lineHeight: "20px",
  height: 50,
  marginLeft: 12,
}));

export const Date = styled("div")(({ theme }) => ({
  color: "#ABABB1",
  fontWeight: 400,
  fontSize: 12,
  lineHeight: "16px",
  marginLeft: 12,
  [theme.breakpoints.down("sm")]: {
    marginTop: 10,
  },
}));

export const FlexColumn = styled("div")(({ theme }) => ({
  // flexDirection: "column",
  flex: 1,
}));

export const Product = styled("img")(({ theme, src }) => ({
  width: 60,
  height: 60,
  borderRadius: 8,
  src: src,
}));

export const TextGreen = styled("span")(({ theme }) => ({
  color: "rgba(18, 183, 106, 1)",
}));

export const WhiteText = styled("span")(({ theme }) => ({
  color: "#fff",
}));

export const GrayText = styled("span")(({ theme }) => ({
  color: "#ABABB1",
}));

export const WrapDot = styled("div")(({ theme }) => ({
  marginRight: "20px",
  width: "10px",
  height: "10px",
  background: "#F4E85B",
  borderRadius: "50%",
}));

export const ViewAllNoti = styled("div")(({ theme }) => ({
  display: "flex",
  height: "50px",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: 400,
  color: "#F7EF82",
  textAlign: "center",
  justifyContent: "center",
  cursor: "pointer",
}));
