import { Popover, styled } from "@mui/material";

export const CloseButton = styled("div")(({ theme }) => ({
  border: "1px solid #64646C",
  borderRadius: 20,
  background: "#212124",
  width: 56,
  height: 56,
  position: "absolute",
  bottom: "102%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  right: 0,
}));
export const ContentWrapper = styled("div")(() => ({
  position: "relative",
}));

export const StyledPopover = styled(Popover)(({ theme }) => ({
  ".MuiPaper-root": {
    overflowX: "visible",
    overflowY: "visible",
    background: "#212124",
    borderRadius: 20,
  },
}));
