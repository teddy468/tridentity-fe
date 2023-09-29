import { primaryGradient } from "@/themes/palette";
import { Box, Rating, styled } from "@mui/material";

export const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  color: "rgba(0, 0, 0, 0.87)",
});

export const Name = styled(Box)(({ theme }) => ({
  fontSize: 32,
  fontWeight: 600,
  lineHeight: "40px",
  color: theme.palette.common.white,
}));
export const RatingWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginTop: "16px",
});
export const Reviews = styled(Box)(({ theme }) => ({
  fontSize: 16,
  lineHeight: "24px",
  fontWeight: 500,
  color: theme.palette.primary.main,
  marginLeft: "30px",
}));
export const Price = styled(Box)(({ theme }) => ({
  fontSize: 32,
  lineHeight: "40px",
  fontWeight: 600,
  color: theme.palette.common.white,
  marginTop: "18px",
}));

export const CampaignWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: "26px"
}));

export const CampaignLeftWrapper = styled(Box)(({ theme }) => ({
  padding: "2px",
  paddingRight: 0,
  width: "206px",
  height: "31px",
  background: "linear-gradient(94.22deg, #FDCD9D 0%, #F7EF82 100%)",

  borderRadius: "8px 0px 0px 8px"
}));

export const CampaignLeftContent = styled(Box)(({ theme }) => ({
  padding: "2px",
  width: "100%",
  height: "100%",
  background: "#0F1F19",
  borderRadius: "8px 0px 0px 8px",

  display: "flex",
  alignItems: "center",

  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "20px",

  color: "#12B76A",
  paddingLeft: "15px"
}));

export const CampaignRightWrapper = styled(Box)(({ theme }) => ({
  padding: "2px",
  width: "79px",
  height: "38px",
  background: "linear-gradient(94.22deg, #FDCD9D 0%, #F7EF82 100%)",
  borderRadius: "0px 8px 8px 0px"
}));

export const CampaignRightContent = styled(Box)(({ theme }) => ({
  padding: "2px",
  width: "100%",
  height: "100%",
  background: "#2B5847",
  borderRadius: "0px 8px 8px 0px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#F7EF82",

  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "24px"
}));

export const CampaignIconWrapper = styled(Box)(({ theme }) => ({
  marginLeft: "15px",
  cursor: "pointer"
}));

export const ShippingWrapper = styled(Box)({
  marginTop: 24,
});
export const Shipping = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 600,
  color: theme.palette.grey[200],
  marginBottom: "8px",
}));
export const ShippingInfo = styled("ul")({
  listStyle: "none",
});
export const ShippingAddress = styled("li")(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.common.white,
  margin: "8px 0",
  "&:before": {
    background: primaryGradient,
    WebkitTextFillColor: "transparent",
    WebkitBackgroundClip: "text",
    content: '"\\2022"',
    fontWeight: "bold",
    display: "inline-block",
    width: "1em",
  },
}));
export const CustomRating = styled(Rating)(({ theme }) => ({
  fontSize: 16,
  display: "inline-flex",
  verticalAlign: "middle",
  marginLeft: 5,
  "& .MuiRating-icon.MuiRating-iconEmpty": {
    color: theme.palette.grey[200],
  },
}));
export const SeeMore = styled("div")(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  background: primaryGradient,
  whiteSpace: "nowrap",
  WebkitTextFillColor: "transparent",
  WebkitBackgroundClip: "text",
  cursor: "pointer",
  marginTop: "18px",
}));
