import { primaryGradient } from "@/themes/palette";
import { Box, Container, styled } from "@mui/material";
import Link from "next/link";

export const MenuWrapper = styled(Box)(({ theme }) => ({
  background: "linear-gradient(324deg, #0B0B0B 38.44%, #161A18 85.8%)",
  padding: "65px 0",
}));
export const ContentContainer = styled(Container)(({ theme }) => ({
  margin: "0 auto",
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    width: "100%",
    padding: 10,
  },
}));
export const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 25,
}));
export const Title = styled(Box)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 600,
  lineHeight: "40px",
  color: theme.palette.common.white,
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    fontSize: 20,
    lineHeight: "32px",
  },
}));

export const ViewAll = styled(Link)(({ theme }: any) => ({
  background: primaryGradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "16px",
  lineHeight: "26px",
  fontWeight: 500,
  svg: {
    marginLeft: 12,
  },
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    fontSize: "12px",
    lineHeight: "26px",
    width: "50%",
    justifyContent: "flex-end",
  },
}));

export const MenuItem = styled(Link)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  cursor: "pointer",
  maxWidth: "100%",
  img: {
    width: "100%",
    objectFit: "cover",
    borderRadius: 16,
    overflow: "hidden",
  },
}));

export const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "50%",
  background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
}));
export const InfoWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "24px",
  left: "32px",
}));
export const MenuItemName = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "32px",
  lineHeight: "40px",
  color: "#fff",
}));

export const Description = styled(Box)(({ theme }) => ({
  fontSize: "16px",
  lineHeight: "24px",
  color: "#DBDBDE",
}));
