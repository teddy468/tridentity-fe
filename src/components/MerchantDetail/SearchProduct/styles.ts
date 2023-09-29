import CustomLink from "@/components/commons/CustomLink/CustomLink";
import { Box, Container, Grid, styled, TextField, Typography } from "@mui/material";

export const SectionContainer = styled(Box)(({ theme }) => ({
  paddingTop: "4rem",
  paddingBottom: "4rem",

  [theme.breakpoints.down("sm")]: {
    paddingTop: "2rem",
    paddingBottom: "2rem",
  },
}));

export const SectionContent = styled(Container)(({ theme }) => ({
  padding: 8,
}));

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
    width: "50%",
    justifyContent: "flex-end",
  },
}));

export const DishGridItem = styled(Grid)(() => ({}));

export const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const SearchTextField = styled(TextField)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.primary}`,
  flex: 1,
  borderRadius: 8,

  input: {
    height: 42,
    padding: "12px 20px 12px 8px",
    boxSizing: "border-box",
    color: theme.palette.common.white,
    borderRadius: 8,
    font: "revert",
    fontWeight: 400,
    fontSize: 16,
    fontStyle: "normal",
    "&:placeholder": {
      color: theme.palette.green[100],
    },
  },
  "& fieldset": {
    borderRadius: 8,
    fontWeight: 400,
  },
  width: "100%",

  [theme.breakpoints.down("md")]: {
    "& .MuiInputBase-root": {
      paddingLeft: 0,
      paddingRight: 0,
      "& .MuiButton-root": {
        paddingLeft: 20,
        minWidth: 0,
        maxWidth: 60,
      },
    },
  },
}));
