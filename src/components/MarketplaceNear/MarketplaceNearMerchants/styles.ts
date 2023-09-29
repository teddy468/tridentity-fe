import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const MainContainer = styled(Box)(({ theme }) => ({
  zIndex: 0,
  [theme.breakpoints.down("md")]: {
    padding: "0 16px",
  },
}));
