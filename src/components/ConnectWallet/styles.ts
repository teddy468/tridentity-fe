import { Box, styled } from "@mui/material";

export const BoxConnect = styled("div")(() => ({
  border: "1px solid #FDCD9D",
  background: "transparent",
  borderRadius: 10,
  cursor: "pointer",
  width: "100%",
  padding: 20,
  textAlign: "center",

  "&:hover": {},

  "&:first-of-type": {
    marginRight: 10,
  },
}));

export const GroupContent = styled("div")(() => ({}));

export const TextConnect = styled("div")(() => ({
  color: "#ffffff",
}));
