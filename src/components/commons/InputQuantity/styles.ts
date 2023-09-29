import { Box, Button, styled, TextField } from "@mui/material";
export const Wrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const ActionButton = styled(Button)<{ disabled?: boolean }>(({ theme, disabled }) => ({
  width: 32,
  minWidth: 32,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  cursor: "pointer",
  border: "none",
  outline: "none",
  svg: {
    path: {
      fill: !disabled ? theme.palette.common.white : theme.palette.grey[200],
    },
  },
  "&:hover": {
    svg: {
      path: {
        fill: !disabled ? theme.palette.common.white : theme.palette.secondary.main,
      },
    },
  },

  "&::after": {
    content: '""',
    display: "block",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    transition: "all 0.5s",
    background: "rgba(143, 143, 143, 0.5)",
  },

  "&:active::after": {
    background: "rgba(143, 143, 143, 0.5)",
    position: "absolute",
    borderRadius: "50px",
    left: 0,
    top: 0,
    opacity: 1,
    transition: "0s",
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
