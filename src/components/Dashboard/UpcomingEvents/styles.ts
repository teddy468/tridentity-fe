import { Box, Container, Rating, Skeleton, styled } from "@mui/material";
import Slider from "react-slick";

export const SectionContainer = styled(Container)(() => ({
  paddingTop: 60,
  marginBottom: 100,
}));

export const EventItem = styled(Box)(() => ({
  position: "relative",
  background: "#D9D9D9",
  border: "2px solid #7169D9",
}));

export const EventContainer = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  fontWeight: 400,
  fontSize: 25,
  lineHeight: "22px",
  padding: "50px 70px 40px",
}));

export const EventName = styled(Box)(() => ({
  marginBottom: 20,
}));

export const SkeletonEventName = styled(Skeleton)(() => ({
  height: 20,
  marginBottom: 20,
}));
export const EventDescription = styled(Box)(() => ({
  marginBottom: 20,
}));

export const SkeletonEventDescription = styled(Skeleton)(() => ({
  height: 20,
  marginBottom: 20,
}));

export const EventDetail = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
}));

export const EventPublisher = styled(Box)(() => ({}));

export const SkeletonEventPublisher = styled(Skeleton)(() => ({
  height: 20,
}));

export const EventDate = styled(Box)(() => ({}));

export const SkeletonEventDate = styled(Skeleton)(() => ({
  height: 20,
}));

export const EventBanner = styled("img")(() => ({
  width: "100%",
  height: "auto",
  aspectRatio: "1202/212",
  verticalAlign: "middle",
}));

export const SkeletonEventBanner = styled(Skeleton)(() => ({
  width: "100%",
  height: "auto",
  aspectRatio: "1202/212",
}));

export const StyledSlider = styled(Slider)`
  ul[class*="slick-dots"] {
    bottom: 0px;
    li {
      margin: 0;
      width: 30px;
      height: 30px;
      button {
        position: relative;
        text-align: center;
        width: 30px;
        height: 30px;

        &::before {
          content: "";
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 14px;
          background: #ffffff;
          opacity: 0.3;
          top: 50%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
        }
      }
      &[class*="slick-active"] {
        button::before {
          width: 14px;
          height: 14px;
          background: #7169d9;
          opacity: 1;
        }
      }
    }
  }
  button[class*="slick-arrow"] {
    top: unset;
    bottom: -6px;
    left: 50%;
    z-index: 1;
    &[class*="slick-prev"] {
      margin-left: -130px;
    }
    &[class*="slick-next"] {
      margin-left: 100px;
    }
  }
`;
