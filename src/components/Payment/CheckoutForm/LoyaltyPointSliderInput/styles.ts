import styled from "@emotion/styled";
import { Box, Slider } from "@mui/material";

export const Wrapper = styled(Box)(() => ({
  width: "100%",
  paddingRight: 4,
}));

export const CustomSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.common.white,
}));
