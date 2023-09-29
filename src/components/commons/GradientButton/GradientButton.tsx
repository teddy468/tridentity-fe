import styled from "@emotion/styled";
import { Button, CircularProgress } from "@mui/material";

export const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(94.22deg, #FDCD9D 0%, #F7EF82 100%)",
  borderRadius: 24,
  padding: "12px 24px",
  lineHeight: "16px",
  textTransform: "none",
  color: theme.palette.text.primary,
  fontWeight: 500,
  width: "100%",
}));

export const Loading = styled(CircularProgress)(({}) => ({
  marginLeft: "20px",
}));
