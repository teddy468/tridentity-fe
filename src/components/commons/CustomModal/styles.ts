import { CloseIcon } from "@/assets/icons";
import { Dialog, IconButton, styled } from "@mui/material";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: 8,
  top: 16,
  color: theme.palette.grey[500],
}));

export const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
  width: "1rem",
  height: "1rem",
}));
