import { styled, Box, Rating } from "@mui/material";
import { CardDirection } from "./GeneralCard";
import CustomLink from "../CustomLink/CustomLink";
import CustomRating from "../CustomRating/CustomRating";
import { primaryGradient } from "@/themes/palette";

export const Wrapper = styled(Box)<{ direction: CardDirection }>(({ theme, direction }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: direction === "horizontal" ? "row" : "column",
  backgroundColor: theme.palette.primaryColor[`A700`],
  borderRadius: 16,
  overflow: "hidden",
  height: "100%",
}));

export const TagWrapper = styled(Box)(() => ({
  position: "absolute",
  top: "10px",
  left: "10px",
}));

export const CardImage = styled("img")<{ direction: CardDirection }>(({ theme, direction }) => ({
  width: direction === "horizontal" ? 250 : "100%",
  height: direction === "horizontal" ? 250 : 160,
  objectFit: "cover",
  objectPosition: "center",
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    width: direction === "horizontal" ? 182 : "100%",
    height: direction === "horizontal" ? 250 : 132,
  },
}));

export const CardContent = styled(Box)<{ direction: CardDirection }>(({ theme, direction }) => ({
  display: "flex",
  flex: 1,
  width: "100%",
  flexDirection: "column",
  alignContent: "flex-start",
  justifyContent: "space-between",
  padding: direction === "horizontal" ? "0 32px" : "24px",
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    padding: "16px",
  },
}));

export const CardTitle = styled(CustomLink)<{ direction: CardDirection }>(({ theme, direction }) => ({
  fontSize: "24px",
  fontWeight: 600,
  lineHeight: "32px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    fontSize: "18px",
    lineHeight: "26px",
  },
}));

export const RatingsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: 16,
  width: "100%",
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    marginTop: 8,
  },
}));

export const RatingNumber = styled("span")(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
  color: "#DBDBDE",
  marginLeft: 10,

  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    display: "none",
  },
}));
export const Label = styled(Box)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
  color: "#DBDBDE",
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    fontSize: "14px",
    lineHeight: "20px",
  },
}));

export const StyledRating = styled(CustomRating)(({ theme }) => ({
  marginLeft: 8,
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    marginLeft: 4,
  },
}));
export const ReviewWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: 14,
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    marginTop: 8,
  },
}));
export const ReviewNumber = styled("span")(({ theme }) => ({
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "24px",
  color: theme.palette.primaryColor[400],
  marginLeft: 8,
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    fontSize: "12px",
    lineHeight: "16px",
    marginLeft: 4,
  },
}));

export const CardTitleSkeleton = styled(Box)(() => ({
  height: "32px",
  background: "#DBDBDE",
  width: "100%",
}));

export const CardImageSkeleton = styled(Box)<{ direction: CardDirection }>(({ direction }) => ({
  width: direction === "horizontal" ? 250 : "100%",
  height: direction === "horizontal" ? 250 : 160,
  background: "#DBDBDE",
}));
export const TagSkeleton = styled(Box)(() => ({
  background: primaryGradient,
  width: "54px",
  height: "32px",
}));
