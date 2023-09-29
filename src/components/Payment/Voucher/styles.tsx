import CustomLink from "@/components/commons/CustomLink/CustomLink";
import { Box, Button, Container, Grid, styled, Typography } from "@mui/material";

export const SectionContainer = styled(Box)(({ theme }) => ({
  paddingTop: "4rem",
  paddingBottom: "4rem",
  background: "linear-gradient(324deg, #0B0B0B 38.44%, #161A18 85.8%)",

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

  [theme.breakpoints.down("sm")]: {
    fontSize: 24,
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

export const WrapperCard = styled(Box)(({ theme }) => ({
  border: "4px solid rgba(255, 255, 255, 1)",
  padding: 32,
  color: "rgba(255, 255, 255, 1)",
  borderRadius: "0px 16px 0px 0px",
  flexDirection: "column",
  cursor: "pointer",
  marginBottom : 20
}));

export const BigText = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  lineHeight: "26px",
  fontWeight: 600,
  marginBottom: 20,
}));

export const MediumText = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  lineHeight: "26px",
  fontWeight: 600,
  marginBottom: 12,
}));

export const SmallText = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  lineHeight: "32px",
  fontWeight: 400,
  marginBottom: 12,
}));

export const ClaimButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(94.22deg, #FDCD9D 0%, #F7EF82 100%)",
  color: theme.palette.grey["900"],
  marginLeft: "11px",
  width: "96px",
  height: "44px",
  fontWeight: 500,
  fontSize: "14px",
  textTransform: "none",
}));

export const UnderlineText = styled(Typography)(({ theme }) => ({
  textDecoration: "underline",
}));

export const Content = styled("div")(({ theme }) => ({
  color: theme.palette.common.white,
  flexDirection: "column",
  textAlign: 'left',
  width : '100%',
  overflow: "auto",
  maxHeight: "70vh",
}));
