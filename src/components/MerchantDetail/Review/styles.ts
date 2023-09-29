import { primaryGradient } from "@/themes/palette";
import { Box, Container, Pagination, Rating, styled } from "@mui/material";
import Link from "next/link";

export const ReviewWrapper = styled(Container)(({ theme }) => ({
  margin: "130px auto",
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    margin: "80px auto",
  },
}));
export const Title = styled(Box)(({ theme }) => ({
  fontSize: 32,
  fontWeight: 600,
  lineHeight: "40px",
  color: theme.palette.common.white,
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    fontSize: 20,
    lineHeight: "32px",
    whiteSpace: "nowrap",
  },
}));

export const TitleWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
}));
export const Summary = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export const ReviewList = styled(Box)(({ theme }) => ({
  marginTop: 30,
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  columnGap: "24px",
  rowGap: "16px",
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}));

export const ReviewImageWrapper = styled(Box)(({ theme }) => ({
  marginTop: 15,
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  columnGap: "24px",
  rowGap: "16px",
}));

export const ReviewImage = styled("img")(({ theme }) => ({
  borderRadius: 16,
  height: "80px",
  width: "100%",
  backgroundSize: "cover",
}));

export const UserWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
});
export const ReviewItem = styled(Box)({
  background: "linear-gradient(324deg, rgba(11, 11, 11, 0.8) 38.44%, rgba(22, 26, 24, 0.8) 85.8%)",
  border: "1px solid #64646C",
  borderRadius: 16,
  padding: "20px",
});
export const UserAvatar = styled("img")(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: "50%",
  marginRight: 10,
}));

export const UserContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});
export const UserName = styled(Box)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "24px",
  color: theme.palette.common.white,
}));

export const DateTime = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.grey[200],
}));

export const ReviewDescription = styled(Box)(({ theme }) => ({
  marginTop: 24,
  fontSize: 16,
  lineHeight: "24px",
  color: theme.palette.common.white,
}));

export const PaginationCustom = styled(Pagination)(({ theme }) => ({
  marginTop: "25px",
  display: "flex",
  alignItems: "right",
}));

export const PaginationWrapper = styled(Box)(({ theme }) => ({
  justifyContent: "center",
  display: "flex",
}));

export const CustomRating = styled(Rating)(({ theme }) => ({
  margin: "10px 0",
  "& .MuiRating-icon.MuiRating-iconEmpty": {
    color: theme.palette.grey[200],
  },
}));
export const ViewAll = styled("div")(({ theme }: any) => ({
  background: primaryGradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "16px",
  lineHeight: "26px",
  fontWeight: 500,
  whiteSpace: "nowrap",
  svg: {
    marginLeft: 12,
  },
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    fontSize: "14px",
    lineHeight: "20px",
    width: "40%",
    justifyContent: "flex-end",
  },
}));
