import { GpsIcon } from "@/assets/icons";
import { Box, Container, styled, Typography } from "@mui/material";

export const BannerWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 338,
  position: "relative",
  [theme.breakpoints.down("md")]: {
    height: 292,
  },
}));
export const Image = styled("img")(() => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
}));
export const StyledContainer = styled(Container)(({}) => ({
  margin: "0 auto",
}));

export const BannerTitleDesktop = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const BannerTitleMobile = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

export const Overlay = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    justifyContent: "center",
    padding: "20px",
  },
}));

export const ContentContainer = styled(Box)(() => ({
  maxWidth: "600px",
}));

export const Text = styled(Typography)(({ theme }) => ({
  fontWeight: "600",
  fontSize: "52px",
  lineHeight: "60px",
  color: "#ffffff",
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    fontSize: "30px",
    lineHeight: "40px",
  },
}));

export const SearchWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 16,
  maxWidth: "calc(100% - 80px)",
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    maxWidth: "100%",
  },
}));

export const InputWrapper = styled(Box)(() => ({
  position: "relative",
  height: "44px",
  display: "flex",
  flex: 1,
}));

export const Input = styled("input")(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  border: "none",
  padding: "12px 55px 12px 20px",
  width: "100%",
  marginRight: "12px",
  color: "#000000",
  "&:placeholder": {
    color: theme.palette.grey[300],
  },
  "&:focus": {
    outline: "none",
  },
}));

export const StyledGpsIcon = styled(GpsIcon)(() => ({
  position: "absolute",
  width: "20px",
  height: "20px",
  top: "calc(50% - 10px)",
  right: "30px",
  cursor: "pointer",
}));

export const SearchBtn = styled(Box)(() => ({
  background: "#469175",
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "20px",
  width: "fit-content",
  height: "44px",
  borderRadius: "8px",
  padding: "12px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#54AC8B",
    transition: "all 0.3s",
  },
}));
