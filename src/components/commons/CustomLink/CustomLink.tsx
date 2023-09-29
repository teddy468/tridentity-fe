import { primaryGradient } from "@/themes/palette";
import { Theme, styled } from "@mui/material";
import Link from "next/link";

type LinkColor = "primary" | "secondary" | "reverse" | "gradient";

const getColor = (theme: Theme, color?: LinkColor) => {
  switch (color) {
    case "primary":
      return theme.palette.primary.main;
    case "secondary":
      return theme.palette.secondary.main;
    default:
      return theme.palette.common.white;
  }
};

const getHoverColor = (theme: Theme, color?: LinkColor) => {
  switch (color) {
    case "primary":
      return theme.palette.primary.dark;
    case "secondary":
      return theme.palette.secondary.dark;
    default:
      return theme.palette.secondary.main;
  }
};

export const CustomLink = styled(Link)<{ color?: LinkColor }>(({ theme, color }) => ({
  color: getColor(theme, color),
  ...(color === "gradient"
    ? {
        background: primaryGradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }
    : {}),
  "&:hover": {
    color: getHoverColor(theme, color),
    ...(color === "gradient"
      ? {
          background: "none",
          WebkitTextFillColor: "unset",
        }
      : {}),
    "*": {
      color: "inherit",
    },
    svg: {
      path: {
        stroke: "currentColor",
      },
    },
  },
}));

export default CustomLink;
