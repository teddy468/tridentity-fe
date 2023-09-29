import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const GradientText = styled(Box)(({ theme }) => ({
  background: "linear-gradient(94.22deg, #FDCD9D 0%, #F7EF82 100%)",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  // [theme.breakpoints.down("sm")]: {
  //   fontSize: 11,
  // },
}));

