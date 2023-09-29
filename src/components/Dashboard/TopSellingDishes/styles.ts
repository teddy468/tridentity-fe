import CustomLink from "@/components/commons/CustomLink/CustomLink";
import { SSM_BREAKPOINT } from "@/themes/breakpoints";
import { darkLinearGradient } from "@/themes/palette";
import { Grid } from "@mui/material";
import { Box, Container, styled, Typography } from "@mui/material";
import Link from "next/link";

export const SectionContainer = styled(Box)(({ theme }) => ({
  paddingTop: "4rem",
  paddingBottom: "4rem",

  [theme.breakpoints.down("sm")]: {
    paddingTop: "2.875rem",
    paddingBottom: "2.875rem",
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
  whiteSpace: "nowrap",

  [theme.breakpoints.down("sm")]: {
    fontSize: 24,
    lineHeight: "32px",
  },

  [theme.breakpoints.down(SSM_BREAKPOINT)]: {
    fontSize: 16,
  },
}));

export const ViewAll = styled(CustomLink)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 16,
  lineHeight: "26px",
  fontWeight: 600,
  whiteSpace: "nowrap",
  "&:before": {
    content: "'View all dishes'",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    lineHeight: "24px",
    width: "50%",
    justifyContent: "flex-end",
    "&:before": {
      content: "'View all'",
    },
  },

  [theme.breakpoints.down(SSM_BREAKPOINT)]: {
    fontSize: 12,
  },
}));

export const DishGridList = styled(Grid)(() => ({}));

export const DishGridItem = styled(Grid)(() => ({}));

export const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));
