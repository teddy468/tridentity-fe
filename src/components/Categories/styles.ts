import { Container, styled } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import CustomLink from "../commons/CustomLink/CustomLink";
import { blurOverlayGradient, darkLinearGradient } from "@/themes/palette";

export const CategoriesWrapper = styled("div")(() => ({
  background: darkLinearGradient,
}));
export const CategoriesContainer = styled(Container)(({ theme }) => ({
  padding: "64px 0 100px 0",
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    padding: "30px 20px",
  },
}));

export const Title = styled("div")(({ theme }) => ({
  fontWeight: 600,
  fontSize: "32px",
  lineHeight: "40px",
  color: theme.palette.common.white,
  marginBottom: "24px",
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    fontSize: "24px",
    lineHeight: "30px",
  },
}));

export const CategoriesGrid = styled(Grid2)(() => ({}));
export const CategoriesGridItem = styled(Grid2)(({ theme }) => ({
  height: "250px",
}));
export const Category = styled(CustomLink)(({ theme }) => ({
  display: "block",
  position: "relative",
  borderRadius: "16px",
  overflow: "hidden",
  width: "100%",
  height: "100%",
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "16px",
  },
}));

export const CategorySkeleton = styled("div")(() => ({
  display: "block",
  position: "relative",
  borderRadius: "16px",
  overflow: "hidden",
  width: "100%",
  height: "100%",
  background: "#DBDBDE",
}));
export const CategoryInfo = styled("div")(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  height: "100%",
}));

export const Overlay = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  padding: "0 32px 24px 32px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  height: "50%",
  width: "100%",
  background: blurOverlayGradient,
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    padding: "0 16px 16px 16px",
  },
}));

export const Name = styled("div")(({ theme }) => ({
  fontWeight: 600,
  fontSize: "32px",
  lineHeight: "40px",
  color: theme.palette.common.white,
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  "-webkit-line-clamp": "1",
  "-webkit-box-orient": "vertical",
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    fontSize: "24px",
    lineHeight: "30px",
  },
}));

export const Description = styled("div")(({ theme }) => ({
  marginTop: "8px",
  color: "#DBDBDE",
  fontSize: "16px",
  lineHeight: "24px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  "-webkit-line-clamp": "2",
  "-webkit-box-orient": "vertical",
}));
