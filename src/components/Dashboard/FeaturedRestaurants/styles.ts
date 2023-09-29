import CustomLink from "@/components/commons/CustomLink/CustomLink";
import { SSM_BREAKPOINT } from "@/themes/breakpoints";
import { Box, Container, Grid, styled } from "@mui/material";
import Slider from "react-slick";

export const FeaturedRestaurantsContainer = styled(Box)(({ theme }) => ({
  padding: "65px 0 16px 0",
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
  marginBottom: "0.5rem",
}));

export const Title = styled(Box)(({ theme }) => ({
  fontSize: 32,
  fontWeight: 600,
  lineHeight: "40px",
  whiteSpace: "nowrap",
  color: theme.palette.common.white,
  [theme.breakpoints.down("md")]: {
    fontSize: 24,
    lineHeight: "32px",
  },

  [theme.breakpoints.down(SSM_BREAKPOINT)]: {
    fontSize: 16,
  },
}));

export const ViewAll = styled(CustomLink)(({ theme }: any) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
  fontSize: "16px",
  lineHeight: "26px",
  fontWeight: 600,
  color: theme.palette.common.white,
  whiteSpace: "nowrap",
  "&:before": {
    content: "'View all restaurants'",
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

export const CardWrapper = styled("div")(({ theme }) => ({
  height: 350,
  margin: "1rem 0",
  [theme.breakpoints.down("md")]: {
    height: 230,
  },
}));

export const MobileDisplayWrapper = styled(Box)(({ theme }) => ({}));

export const FeaturedGridItem = styled(Grid)(({ theme }) => ({}));

export const StyledFeaturedSlider = styled(Slider)`
  .slick-list {
    margin: 0px -12px;
    .slick-track {
      margin-left: 0;
      .slick-slide {
        padding: 0 12px;
      }
    }
  }
  .slick-arrow {
    position: absolute;
    top: 50%;
    &::before {
      content: unset;
    }
    &:hover {
      color: ${({ theme }) => theme.palette.primary.main};
      path {
        fill: currentColor;
      }
    }
  }
  .slick-prev {
    left: -2rem;
  }
  .slick-next {
    right: -2rem;
  }
`;

export const ArrowButton = styled(Box, {
  shouldForwardProp: prop => prop !== "currentSlide" && prop !== "slideCount",
})(({ theme }) => ({
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));
