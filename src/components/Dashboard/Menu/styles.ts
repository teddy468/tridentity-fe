import CustomLink from "@/components/commons/CustomLink/CustomLink";
import { SSM_BREAKPOINT } from "@/themes/breakpoints";
import { blurOverlayGradient, darkLinearGradient } from "@/themes/palette";
import { Box, Container, styled } from "@mui/material";

export const SectionMobile = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "block",
    overflow: "hidden",
  },
}));

export const SectionPC = styled(Box)(({ theme }) => ({
  display: "block",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const MenuWrapper = styled(Box)(({ theme }) => ({
  padding: "65px 0",
  [theme.breakpoints.down("sm")]: {
    padding: "44px 0",
  },
}));

export const ContentContainer = styled(Container)(({ theme }) => ({
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    padding: 10,
  },
}));

export const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 25,
}));

export const Title = styled(Box)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 600,
  lineHeight: "40px",
  color: theme.palette.common.white,
  whiteSpace: "nowrap",

  [theme.breakpoints.down("md")]: {
    fontSize: "24px",
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
  fontSize: "16px",
  lineHeight: "26px",
  fontWeight: 600,
  whiteSpace: "nowrap",
  "&:before": {
    content: "'View all categories'",
  },
  [theme.breakpoints.down("md")]: {
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

export const MenuItem = styled(CustomLink)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  cursor: "pointer",
  maxWidth: "100%",

  [theme.breakpoints.down("sm")]: {
    overflow: "initial",
    img: {
      width: "auto",
      marginRight: 16,
    },
  },
}));

export const ImageWrapper = styled(Box)(({ theme }) => ({
  height: 250,
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  objectFit: "cover",
  borderRadius: 16,
  [theme.breakpoints.down("md")]: {
    height: 140,
  },
}));

export const ImageWrapperVertical = styled(ImageWrapper)(({ theme }) => ({
  width: "100%",
  height: 524,
}));

export const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "50%",
  background: blurOverlayGradient,
}));
export const InfoWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  position: "absolute",
  padding: 16,
  bottom: 24,
  left: 20,
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    left: 6,
    bottom: 0,
  },
}));
export const MenuItemName = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 28,
  [theme.breakpoints.down("sm")]: {
    fontSize: 18,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
  },
}));

export const Description = styled(Box)(({ theme }) => ({
  fontSize: "16px",
  lineHeight: "24px",
  color: "#DBDBDE",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));
