import { Button, styled } from "@mui/material";

export const BorderGradientButton = styled(Button)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  padding: "9px 24px",
  fontSize: 14,
  lineHeight: "20px",
  textTransform: "none",
  fontWeight: 500,
  width: "100%",
  backgroundClip: "padding-box",
  border: "1px solid transparent",
  backgroundColor: theme.palette.common.black,
  borderRadius: 24,
  marginBottom: 48,
  "&:before": {
    content: `""`,
    position: "absolute",
    inset: 0,
    zIndex: -1,
    margin: "-1px",
    background: "linear-gradient(to right bottom, #FDCD9D, #F7EF82)",
    borderRadius: "inherit",
  },
  div: {
    background: "linear-gradient(94.22deg, #FDCD9D 0%, #F7EF82 100%)",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  "&:hover": {
    backgroundColor: theme.palette.common.black,
    "&:before": {
      background: "#F4E85B",
    },
    div: {
      background: "none",
      WebkitTextFillColor: "#F4E85B",
    },
    svg: {
      path: {
        fill: "#F4E85B",
      },
    },
  },
}));
