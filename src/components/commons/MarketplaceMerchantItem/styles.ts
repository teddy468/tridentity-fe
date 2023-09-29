import { primaryGradient } from "@/themes/palette";
import { Box, Rating, Skeleton, styled } from "@mui/material";
import Link from "next/link";
import CustomRating from "../CustomRating/CustomRating";

export const MerchantItem = styled(Link)(() => ({
  position: "relative",
  background: "#D9D9D9",
  border: "2px solid #7169D9",
  display: "block",
  marginBottom: 60,
}));

export const SkeletonMerchantItem = styled(Box)(() => ({
  position: "relative",
  background: "#D9D9D9",
  marginBottom: 60,
}));

export const MerchantSaleOff = styled(Box)(() => ({
  width: "min(70%, 90px)",
  height: "20px",
  border: "2px solid #7169D9",
  background: "#7169D9",
  position: "absolute",
  top: 0,
  fontSize: 12,
  lineHeight: "20px",
  padding: "8px 15px",
  fontWeight: "700",
}));

export const SkeletonMerchantSaleOff = styled(Skeleton)(() => ({
  position: "absolute",
  top: 10,
  left: 10,
  borderRadius: 8,
  background: primaryGradient,
  transform: "none",
  width: "56px",
  height: "32px",
}));

export const MerchantImage = styled("img")(() => ({
  width: "100%",
  aspectRatio: "192/167",
  borderBottom: "2px solid #7169D9",
}));

export const SkeletonMerchantImage = styled(Skeleton)(() => ({
  width: "100%",
  aspectRatio: "192/167",
  minHeight: 167,
}));

export const MerchantDetail = styled(Box)(() => ({
  padding: "10px 5px 15px",
  fontSize: 12,
}));

export const MerchantName = styled(Box)(() => ({
  fontSize: 12,
  lineHeight: "20px",
  fontWeight: "700",
  marginBottom: 10,
  width: "100%",
  height: 40,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  overflow: "hidden",
}));

export const SkeletonMerchantName = styled(Skeleton)(() => ({
  height: 20,
  marginBottom: 20,
}));

export const MerchantRating = styled(Box)(() => ({
  marginBottom: 10,
}));

export const SkeletonMerchantRating = styled(Skeleton)(() => ({
  height: 20,
  marginBottom: 10,
}));

export const MerchantRatingValue = styled(Box)(() => ({
  fontWeight: 700,
  display: "inline-block",
  marginLeft: 10,
}));

export const StyledRating = styled(CustomRating)(() => ({
  fontSize: 12,
  display: "inline-flex",
  verticalAlign: "middle",
  marginLeft: 5,
}));

export const SalesOrders = styled(Box)(() => ({}));

export const SkeletonSalesOrders = styled(Skeleton)(() => ({
  height: 20,
}));
