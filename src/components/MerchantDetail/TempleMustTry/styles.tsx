import CustomLink from "@/components/commons/CustomLink/CustomLink";
import { Grid } from "@mui/material";
import { Box, Container, styled, Typography } from "@mui/material";
import Link from "next/link";

export const SectionContainer = styled(Box)(({ theme }) => ({
  paddingTop: "4rem",
  paddingBottom: "4rem",

  [theme.breakpoints.down("sm")]: {
    paddingTop: "2rem",
    paddingBottom: "2rem",
  },
}));

export const SectionContent = styled(Container)(() => ({}));

export const Title = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#FFF",
  fontSize: 32,
  lineHeight: "40px",
  fontWeight: 600,
  marginRight: "1rem",

  [theme.breakpoints.down("sm")]: {
    fontSize: 20,
    lineHeight: "32px",
  },
}));

export const ViewAll = styled(CustomLink)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  [theme.breakpoints.down("sm")]: {
    width: "30%",
    justifyContent: "flex-end",
  },
}));

export const ViewAllText = styled(Typography)(({ theme }) => ({
  marginRight: "12px",
  fontSize: 18,
  lineHeight: "26px",
  fontWeight: 600,

  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
    lineHeight: "20px",
  },
}));

export const DishGridList = styled(Grid)(() => ({}));

export const DishGridItem = styled(Grid)(() => ({}));

export const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));
