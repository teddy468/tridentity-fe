import { Box, styled } from "@mui/material";
export const Wrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
});
export const ActionButton = styled("div")<{ active: boolean }>(({ theme, active }) => ({
  width: 32,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  svg: {
    path: {
      fill: active ? theme.palette.common.white : theme.palette.grey[200],
    },
  },
}));
export const StyledInput = styled("input")(({ theme }) => ({
  background: "transparent",
  color: theme.palette.common.white,
  fontSize: 18,
  lineHeight: "26px",
  fontWeight: 600,
  border: "none",
  width: 50,
  textAlign: "center",
  "&:focus": {
    outline: "none",
  },
}));
