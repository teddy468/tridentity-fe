import { styled, Box, Rating, Button } from "@mui/material";
import Link from "next/link";
import CustomLink from "../CustomLink/CustomLink";
import CustomRating from "../CustomRating/CustomRating";

export const SkeletonContainer = styled(Box)<{ direction: Direction }>(({ theme, direction }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: direction === "horizontal" ? "row" : "column",
  borderRadius: 16,
  overflow: "hidden",
  height: direction === "horizontal" ? 250 : "100%",
}));

export const DesktopWrapper = styled(Box)<{ direction: Direction; }>(
  ({ theme, direction }) => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: direction === "horizontal" ? "row" : "column",
    backgroundColor:
      direction === "verticalWithFavorite" || "vertical" ? "transparent" : theme.palette.primaryColor[`A700`],
    borderRadius: 16,
    overflow: "hidden",
    height: "auto",
    marginBottom: "1rem",
  })
);

export const TagWrapper = styled(Box)(() => ({
  position: "absolute",
  top: "10px",
  left: "10px",
}));

export const ImageLink = styled(Link)<{ direction: Direction }>(({ theme, direction }) => ({
  display: "block",
  width: direction === "horizontal" ? 250 : "100%",
  height: direction === "horizontal" ? 250 : direction === "verticalWithFavorite" || "vertical" ? 224 : 160,
  [theme.breakpoints.down("md")]: {
    width: direction === "horizontal" ? 182 : "100%",
    height: direction === "horizontal" ? 250 : 132,
  },
}));

export const MerchantImage = styled("img")<{ direction: Direction }>(({ direction }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  borderRadius: direction === "verticalWithFavorite" || "vertical" ? 16 : 0,
}));

export const CardContent = styled(Box)<{ direction: Direction;}>(
  ({ theme, direction }) => ({
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignContent: "flex-start",
    justifyContent: "space-between",
    padding:
      direction === "horizontal" ? "0 32px" : direction === "verticalWithFavorite" || "vertical" ? "16px 0" : "24px",
    width: "100%",
    height: "100%",
    [theme.breakpoints.down("md")]: {
      padding: direction === "verticalWithFavorite" || "vertical" ? "16px 0" : "16px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  })
);

export const CardTitle = styled(CustomLink)<{ direction: Direction;}>(
  ({ theme, direction }) => ({
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: "2rem",
    height: "4rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    color: theme.palette.common.white,
  })
);

export const RatingsFeaturedWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  marginTop: 16,
  color: theme.palette.common.white,
  [theme.breakpoints.down("md")]: {
    marginTop: 8,
  },
}));

export const RatingsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: 16,
  [theme.breakpoints.down("md")]: {
    marginTop: 8,
  },
}));

export const RatingFeaturedNumber = styled("span")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 600,
  color: theme.palette.common.white,
  paddingRight: "0.5rem",
}));

export const RatingNumber = styled("span")(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
  color: "#DBDBDE",
  marginLeft: 10,

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const Label = styled(Box)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
  color: "#DBDBDE",
  [theme.breakpoints.down("md")]: {
    fontSize: "14px",
    lineHeight: "20px",
  },
}));

export const StyledRating = styled(CustomRating)(({ theme }) => ({
  marginLeft: 8,
  [theme.breakpoints.down("md")]: {
    marginLeft: 4,
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
}));

export const ReviewFeaturedWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: 14,
  paddingLeft: 16,
}));

export const ReviewWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: 14,
  [theme.breakpoints.down("md")]: {
    marginTop: 8,
  },
}));

export const ReviewNumber = styled("span")(({ theme }) => ({
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "24px",
  color: theme.palette.primaryColor[400],
  marginLeft: 8,
  [theme.breakpoints.down("md")]: {
    fontSize: "12px",
    lineHeight: "16px",
    marginLeft: 4,
  },
}));

export const FavoriteFeaturedButton = styled(Button)<{ active: "active" | "deactive" }>(({ theme, active }) => ({
  minWidth: 40,
  width: 40,
  height: 40,
  position: "absolute",
  top: 170,
  right: 15,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: theme.palette.common.white,
  backdropFilter: "blur(12px)",
  borderRadius: 16,
  border: "1px solid rgba(249, 242, 166, 0.4)",
  [theme.breakpoints.down("md")]: {
    top: 80,
    right: 10,
  },
}));
