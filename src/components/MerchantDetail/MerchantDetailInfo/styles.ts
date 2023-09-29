import { DefaultAvatar, MapIcon } from "@/assets/icons";
import CustomRating2 from "@/components/commons/CustomRating2/CustomRating2";
import { darkLinearGradient } from "@/themes/palette";
import { Box, Button, Container, styled } from "@mui/material";

export const MerchantInfoContainer = styled(Container)(({ theme }) => ({
  paddingRight: 30,
  color: theme.palette.common.white,
  [theme.breakpoints.down("md")]: {
    paddingRight: 16,
  },
}));

export const MerchantLogoSection = styled(Box)(({ theme }) => ({
  height: 130,
  width: "100%",
  position: "relative",
  [theme.breakpoints.down("md")]: {
    height: 64,
  },
}));

export const MerchantLogoWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: -92,
  left: 0,
  width: 184,
  height: 184,
  borderRadius: 16,
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    width: 100,
    height: 100,
    borderRadius: 8,
    top: -50,
  },
}));

export const MerchantLogo = styled("img")(() => ({
  width: "auto",
  height: "100%",
  background: "#989898",
}));

export const DefaultMerchantLogo = styled(DefaultAvatar)(() => ({
  position: "absolute",
  bottom: -(168 - 183) / 2,
  left: -(168 - 183) / 2,
  width: 168,
  height: 168,
  background: "#989898",
  borderRadius: 8,
  transform: `scale(${183 / 168})`,
}));

export const ActionGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "absolute",
  bottom: 30,
  right: 0,
  [theme.breakpoints.down("md")]: {
    top: -30,
  },
}));

export const ChatButton = styled(Box)(() => ({
  border: "1px solid rgba(249, 242, 166, 0.4)",
  width: 60,
  height: 60,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: 16,
  marginRight: 32,
}));

export const FavoriteButton = styled(Box)(({ theme }) => ({
  width: 65,
  height: 65,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  scale: "1.2",
  [theme.breakpoints.down("md")]: {
    width: 40,
    height: 40,
  },
}));

export const MerchantHeader = styled(Box)(({ theme }) => ({
  marginBottom: 16,
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    marginBottom: 0,
  },
}));

export const MerchantName = styled("h3")(({ theme }) => ({
  fontWeight: 600,
  fontSize: 40,
  lineHeight: "48px",
  [theme.breakpoints.down("md")]: {
    fontSize: 24,
    lineHeight: 1.5,
    marginBottom: 12,
  },
}));

export const MerchantInfo = styled(Box)(() => ({
  position: "relative",
  textAlign: "left",
}));

export const MerchantRating = styled(Box)(() => ({
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "24px",
  marginBottom: 28,
  paddingRight: 100,
  display: "flex",
  alignItems: "center",
  flexWrap: "nowrap",
  gap: "30px",
}));

export const StyledRating = styled(CustomRating2)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.secondaryColor[900],
}));

export const MerchantReviewCount = styled(Box)(() => ({
  display: "inline-block",
  color: "#54AC8B",
  whiteSpace: "nowrap",
  lineHeight: "24px",
}));

export const FlexBox = styled(Box)(() => ({
  display: "flex",
  gap: 64,
}));

export const DetailList = styled(Box)(() => ({
  marginBottom: 16,
  display: "flex",
  flexDirection: "column",
}));

export const DetailItemValue = styled(Box)(({ theme }) => ({
  fontSize: 24,
  lineHeight: "32px",
  fontWeight: 500,
  marginBottom: 8,
  textTransform: "capitalize",
  [theme.breakpoints.down("sm")]: {
    order: 1,
    fontSize: 18,
    lineHeight: "24px",
  },
}));

export const DetailItemTitle = styled(Box)(({ theme }) => ({
  marginBottom: 8,
  fontSize: 16,
  lineHeight: "24px",
  fontWeight: 400,
  color: theme.palette.grey[200],
  [theme.breakpoints.down("sm")]: {
    order: 2,
  },
}));

export const ServiceAndTimeWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const MerchantLocation = styled(Box)(() => ({
  fontSize: 16,
  lineHeight: "24px",
  fontWeight: 400,
}));

export const MerchantLocationItem = styled(Box)(() => ({
  marginBottom: 8,
  fontSize: 16,
  lineHeight: "24px",
  fontWeight: 400,
}));

export const StyledMapIcon = styled(MapIcon)(({ theme }) => ({
  marginRight: 12,
  marginBottom: 3,
  verticalAlign: "bottom",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

export const MerchantLocationTitle = styled(DetailItemTitle)(({ theme }) => ({
  marginBottom: 8,
  fontSize: 16,
  lineHeight: "24px",
  fontWeight: 400,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
