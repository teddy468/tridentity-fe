import * as React from "react";
import { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { StyledCloseIcon, StyledDialog, StyledIconButton } from "./styles";

interface Props extends Omit<DialogProps, "title"> {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  closeIcon?: React.ReactNode;
  disableScrollLock?: boolean;
}

const CustomModal = ({
  open,
  onClose,
  title,
  children,
  actions,
  closeIcon,
  disableScrollLock = true,
  ...props
}: Props) => {
  return (
    <StyledDialog onClose={onClose} open={open} {...props} disableScrollLock>
      {typeof title === "string" ? <DialogTitle textAlign="center">{title}</DialogTitle> : title}
      {closeIcon ??
        (!!onClose && (
          <StyledIconButton onClick={onClose}>
            <StyledCloseIcon />
          </StyledIconButton>
        ))}
      <DialogContent dividers>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </StyledDialog>
  );
};

export default CustomModal;
