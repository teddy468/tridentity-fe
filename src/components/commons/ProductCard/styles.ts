import { primaryGradient } from "@/themes/palette";
import { Skeleton } from "@mui/material";
import { Box, styled } from "@mui/material";
import Link from "next/link";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import CustomLink from "../CustomLink/CustomLink";

export const ProductContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  borderRadius: 16,
  height: "20rem",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    height: "20.125rem",
  },
}));

export const ProductContainerCampaign = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  borderRadius: 16,
  background: "#1D3B30",
  height: "25rem",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    height: "20.125rem",
  },
  ">div:last-of-type": {
    opacity: 0,
  },
  "&:hover": {
    ">div:last-of-type": {
      opacity: 1,
    },
  },
}));

export const ProductCampaignWrapper = styled(ProductContainer)(() => ({}));

export const SkeletonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  borderRadius: 16,
  overflow: "hidden",
  width: "100%",
  height: "20rem",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    height: "20.125rem",
  },
}));

export const PlusIconWrapper = styled(AddToCartButton)(() => ({
  width: 28,
  height: 28,
  borderRadius: 8,
  background: primaryGradient,
  cursor: "pointer",
}));

export const Tag = styled(Box)(({ theme }) => ({
  background: "#F04438",
  borderRadius: 8,
  padding: "6px 12px",
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 500,

  display: "flex",
  alignItems: "center",
  position: "absolute",
  top: "0.5rem",
  left: "0.5rem",
  color: "#FFF",
}));

export const CampaignTag = styled(Box)(({ theme }) => ({
  background: "#1D3B30",
  borderRadius: "0 8px 0 0",
  border: "2px solid",
  borderColor: "#F7EF82",
  padding: "6px 12px",
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 500,

  display: "flex",
  alignItems: "center",
  position: "absolute",
  bottom: "0px",
  left: "0",
  color: "#F7EF82",

  [theme.breakpoints.down("sm")]: {
    top: "0.75rem",
    right: "0.75rem",
  },
}));

export const ImageWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  position: "relative",
  flexDirection: "column",
  height: "10rem",
  width: "100%",
  padding: "2px",
  borderTopLeftRadius: "16px",
  borderTopRightRadius: "16px",
  background: "linear-gradient(94.22deg, #FDCD9D 0%, #F7EF82 100%)",
}));

export const SkeletonTag = styled(Skeleton)(({ theme }) => ({
  borderRadius: 8,
  position: "absolute",
  top: "1rem",
  right: "1rem",
  width: 49,
  height: 32,
  backgroundColor: theme.palette.grey[700],
  [theme.breakpoints.down("sm")]: {
    top: "0.75rem",
    right: "0.75rem",
  },
}));

export const SkeletonProductImage = styled(Skeleton)(({ theme }) => ({
  height: "10rem",
  width: "100%",
  backgroundColor: theme.palette.grey[700],

  [theme.breakpoints.down("sm")]: {
    height: "8.25rem",
  },
}));

export const ProductImageWrapper = styled(Link)(({ theme }) => ({
  width: "100%",
  height: "10rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 16,
  background: theme.palette.common.white,
  overflow: "hidden",
}));

export const ProductCampaignImageWrapper = styled(ProductImageWrapper)(() => ({
  borderRadius: "16px 16px 0 0",
}));

export const ProductImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  borderRadius: 16,
}));

export const ProductImageCampaign = styled("img")(({ theme }) => ({
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  objectFit: "cover",
  objectPosition: "center",
  height: "100%",
  width: "100%",
  border: "2px solid linear-gradient(to right, red , yellow)",
}));

export const ProductInfo = styled(Box)(({ theme }) => ({
  padding: "1rem 0",
  flexGrow: 1,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));
export const SkeletonProductInfo = styled(Skeleton)(({ theme }) => ({
  padding: "1rem 0",
  flexGrow: 1,
  width: "100%",
  marginTop: 1,
  backgroundColor: theme.palette.grey[700],

  [theme.breakpoints.down("sm")]: {
    padding: "1rem",
  },
}));

export const ProductName = styled(CustomLink)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "20px",
  lineHeight: "2rem",
  color: theme.palette.common.white,
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  height: "64px",

  [theme.breakpoints.down("sm")]: {
    fontSize: "1.125rem",
    lineHeight: "26px",
    height: "fit-content",
  },
}));

export const ProductStore = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "1.125rem",
  lineHeight: "26px",
  color: theme.palette.common.white,
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  height: "3.375rem",

  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
    lineHeight: "24px",
    height: "fit-content",
  },
}));

export const ProductPriceWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 500,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 8,
}));

export const ProductPrice = styled(Box)(() => ({
  fontSize: 18,
}));

export const RatingsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  marginTop: 8,
}));

export const RatingValue = styled("span")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 600,
  color: theme.palette.common.white,
  paddingRight: "0.5rem",
}));

export const ReviewCount = styled(Box)(({ theme }) => ({
  display: "flex",
  color: theme.palette.common.white,
  alignItems: "center",
  fontSize: 14,
  paddingLeft: 16,
}));
