import { TriFoodLogo } from "@/assets/icons";
import { ZINDEX } from "@/commons/constants/zIndex";
import { darkLinearGradient } from "@/themes/palette";
import { styled, Container } from "@mui/material";
import Link from "next/link";

export const StyledHeader = styled("header")(({ theme }) => ({
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: ZINDEX.HEADER,
  height: 84,
  background: darkLinearGradient,
  boxShadow: "0px 8px 24px 0px rgba(247, 238, 136, 0.16)",
  color: theme.palette.common.white,
}));

export const HeaderContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 40,
  padding: "20px 40px",
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    padding: "26px 20px",
    gap: 20,
  },
}));

export const LogoLink = styled(Link)(() => ({
  width: 200,
  minWidth: "max-content",
  height: 44,
  display: "block",
}));

export const StyledHeaderLogo = styled(TriFoodLogo)(() => ({
  maxWidth: "100%",
  maxHeight: "100%",
  width: "auto",
  height: "auto",
}));

export const MenuWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flex: 1,
  gap: "30px",
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    display: "none",
  },
}));

export const MenuMobileWrapper = styled("div")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    display: "block",
    flex: 1,
  },
}));
