import { darkLinearGradient, primaryGradient } from "@/themes/palette";
import { Button, TextField } from "@mui/material";
import { Box, Container, Grid, styled } from "@mui/material";
import Link from "next/link";

export const SectionContainer = styled(Box)(({ theme }) => ({
  paddingTop: "4rem",
  paddingBottom: "2.75rem",
  background: darkLinearGradient,

  [theme.breakpoints.down("md")]: {
    paddingTop: "1.5rem",
    marginTop: "1rem",
    paddingBottom: "2.75rem",
  },
}));

export const SectionContent = styled(Container)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const SectionRightWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 100,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: 44,
  },
}));

export const SocialMediaContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "2.125rem",
  columnGap: "28px",
  width: "100%",

  [theme.breakpoints.down("md")]: {},
}));

export const SocialMediaItem = styled("div")(() => ({
  position: "relative",
  display: "flex",
  placeItems: "center",
  borderRadius: 5,
}));

export const FooterMenuContainerFirst = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginTop: "auto",
  marginRight: "1rem",
  gap: "20px",
  textAlign: "left",
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
    textAlign: "center",
    margin: "0 0 3rem 0",
  },
}));

export const FooterMenuItem = styled(Link)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "20px",
  color: theme.palette.grey["A100"],
  alignItems: "center",
  minWidth: "100px",
}));

export const EmailTextField = styled(TextField)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.primary}`,
  flex: 1,
  borderRadius: 8,
  width: "360px",

  input: {
    height: 42,
    padding: "12px 15px",
    boxSizing: "border-box",
    color: theme.palette.common.white,
    borderRadius: 8,
    font: "revert",
    fontWeight: 400,
    fontSize: 14,
    fontStyle: "normal",
    "&:placeholder": {
      color: theme.palette.green[100],
    },
  },
  "& fieldset": {
    borderRadius: 8,
    fontWeight: 400,
  },

  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(94.22deg, #FDCD9D 0%, #F7EF82 100%)",
  color: theme.palette.grey["900"],
  marginLeft: "11px",
  width: "96px",
  height: "44px",
  fontWeight: 500,
  fontSize: "14px",
  textTransform: "none",
}));

export const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));
