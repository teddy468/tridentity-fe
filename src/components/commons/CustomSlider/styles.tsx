import { primaryGradient } from "@/themes/palette";
import { Slider, styled } from "@mui/material";

export const StyledSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.grey[700],
  height: 8,
  maxWidth: "100%",
  "& .MuiSlider-track": {
    border: "none",
    background: primaryGradient,
  },
  "& .MuiSlider-thumb": {
    height: 14,
    width: 14,
    background: primaryGradient,
    border: "2px solid #fff",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-markLabel": {
    color: "#fff",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: "20px",
  },

  [theme.breakpoints.down("md")]: {
    maxWidth: "80%",
    "& .MuiSlider-markLabel": {
      fontSize: 12,
      left: "85%",
    },
  },
}));
