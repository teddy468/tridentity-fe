import { darkLinearGradient, primaryGradient } from "@/themes/palette";
import { Box, styled } from "@mui/material";
import { isMobile } from "react-device-detect";
import Slider from "react-slick";

export const Images = styled(Box)(({ theme }) => ({
  display: "flex",
  height: 91,
  marginTop: 18,
  [theme.breakpoints.down("md")]: {
    height: 64,
  },
}));

export const Wrapper = styled(Box)(({ theme }) => ({
  width: "50%",
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    width: "100%",
  },
}));

export const ActiveImageWrapper = styled(Box)(({ theme }) => ({
  marginBottom: "0.5rem",
  position: "relative",
  height: "400px",
  width: "600px",
  maxWidth: "100%",
  borderRadius: 16,
  boxSizing: "border-box",
  overflow: "hidden",
  backgroundClip: "padding-box",
  border: "1px solid transparent",
  padding: "1px",

  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: "-1",
    margin: "-5px",
    borderRadius: "inherit",
    background: primaryGradient,
  },
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    height: "255px",
    width: "100%",
  },
}));

export const MainTagWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  top: "20px",
}));

export const MainTag = styled("span")(({ theme }) => ({
  color: "#FFFFFF",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "20px",
  background: "#F25A5A",
  borderRadius: "8px",
  padding: "8px 10px",
  marginRight: "16px",
  float: "right",
}));

export const CampaignTag = styled("span")(({ theme }) => ({
  color: "#F7EF82",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "24px",
  borderRadius: "8px",
  padding: "8px 10px",
  marginRight: "16px",
  background: "#2B5847",
  border: "2px solid #F7EF82",
  position: "absolute",
  bottom: "15px",
  left: "15px",
}));

export const ActiveImage = styled("img")(() => ({
  objectFit: "fill",
  cursor: "pointer",
  width: "100%",
  height: "100%",
  borderRadius: 16,
}));

export const ImageWrapper = styled(Box)({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  marginRight: 8,
  "&:end-of-type": {
    marginRight: 0,
  },
});

export const Extra = styled(Box)({});

export const SmallImage = styled("img")(() => ({
  objectFit: "cover",
  cursor: "pointer",
  width: "auto",
  height: "100%",
  borderRadius: 16,
}));

export const Overlay = styled(Box)({
  background: darkLinearGradient,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

export const ProductImagesWrapper = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
  padding: "2rem",
});

export const StyledSlider = styled(Slider)`
  height: 100%;
  .slick-prev {
    left: 40px;
    width: 40px;
    height: 40px;
  }
  .slick-arrow {
    &::before {
      font-size: 40px;
    }
  }
  .slick-next {
    right: 40px;
    width: 40px;
    height: 40px;
  }
  .slick-slide {
    div {
      height: 100%;
    }
  }
  .slick-list {
    height: 80%;
    .slick-track {
      height: 100%;
    }
  }
  .slick-dots {
    bottom: 30px;
    li {
      width: 40px;
      height: 40px;
      margin: 0 4px;
      a {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
`;

export const CloseButton = styled(Box)({
  position: "absolute",
  right: 30,
  top: isMobile ? 90 : 30,
  fontSize: 20,
  cursor: "pointer",
  width: 30,
  height: 30,
});

export const ProductDescriptionWrapper = styled(Box)(({ theme }) => ({
  marginTop: 36,
  [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
    display: "none",
  },
}));

export const FullScreenContainer = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  overflow: "hidden",
}));

export const FullScreenImageWrapper = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const FullScreenImage = styled("img")(() => ({
  width: isMobile ? "100%" : "auto",
  height: isMobile ? "auto" : "100%",
}));
