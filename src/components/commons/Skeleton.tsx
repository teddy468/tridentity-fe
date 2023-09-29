import { Skeleton as MUISeketon, styled } from "@mui/material";

export const Skeleton = styled(MUISeketon)(({ theme }) => ({
  background: theme.palette.primary.dark,
}));
