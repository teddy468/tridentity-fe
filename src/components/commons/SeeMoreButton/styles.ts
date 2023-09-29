import { Box, styled } from "@mui/material";

export const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: 10,
  color: theme.palette.common.white,
}));

export const ArrowWrapper = styled(Box)<{ isOpen: boolean }>(({ isOpen }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
}));
