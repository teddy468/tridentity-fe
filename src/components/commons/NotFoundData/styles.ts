import { Box, styled } from "@mui/material";

export const NotFoundWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "70vh",
  textAlign: "center",
  width: "100%",
}));
export const TextContent = styled(Box)(({ theme }) => ({
  fontSize: 16,
  lineHeight: "24px",
  color: theme.palette.grey[500],
  marginTop: 44,
}));
