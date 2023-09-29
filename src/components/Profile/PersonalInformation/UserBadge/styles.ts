import { Box, Modal, styled, TextField } from "@mui/material";
import { primaryGradient } from "@/themes/palette";

export const BadgeContent = styled("div")(() => ({
  display: "flex",
  marginLeft: "auto"
}));

export const BadgeItemView = styled("div")(() => ({
  left: "auto",
  alignItems: "center",
  display: "flex",
  marginLeft: "12px"
}));

export const ShowMoreButton= styled("div")(() => ({
  left: "auto",
  alignItems: "center",
  width: "32px",
  height: "32px",
  display: "flex",
  justifyContent: "center",
  background: "transparent",
  border: "1px solid #38745E",
  borderRadius: "24px",
  color: "white",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "16px",
  cursor: "pointer"
}));

export const BadgeIcon= styled("img")(() => ({
  width: "32px",
  height: "32px",
}));

export const RepeatButton= styled("div")(() => ({
  left: "auto",
  alignItems: "center",
  width: "32px",
  height: "32px",
  display: "flex",
  justifyContent: "center",
  background: "transparent",
  border: "1px solid #FDCD9D",
  borderRadius: "24px",

  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "16px",
  cursor: "pointer"
}));


export const StyledModal = styled(Modal)(() => ({
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const Container = styled(Box)(() => ({
  background: "linear-gradient(324deg, rgba(11, 11, 11, 0.8) 38.44%, rgba(22, 26, 24, 0.8) 85.8%)",
  backdropFilter: "blur(12px)",
  color: "rgb(128, 128, 137)",
  padding: "32px 44px",
  width: 588,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #FDCD9D",
  borderRadius: 20,
}));
export const Title = styled("div")(({ theme }) => ({
  fontWeight: 600,
  fontSize: "32px",
  lineHeight: "40px",
  color: theme.palette.common.white,
  marginBottom: "40px",
  maxWidth: 384,
}));

export const Content = styled("div")(({ theme }) => ({
  fontSize: "16px",
  lineHeight: "24px",
  color: theme.palette.common.white,
  maxWidth: 384,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "80%",
}));


export const Footer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 32,
}));

export const CancelButton = styled("div")(() => ({
  position: "relative",
  background: "#151515",
  border: "1px solid transparent",
  padding: "2px",
  height: 40,
  width: 180,
  borderRadius: 24,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",

  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: "-1",
    margin: "-2px",
    borderRadius: "inherit",
    background: primaryGradient,
  },
}));

export const SubmitButton = styled("div")(({ theme }) => ({
  background: primaryGradient,
  height: 44,
  width: 184,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 24,
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.common.black,
  fontWeight: 500,
  marginLeft: 16,
  cursor: "pointer",
}));

export const SearchTextField = styled(TextField)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.primary}`,
  flex: 1,
  borderRadius: 8,
  marginTop: 10,
  marginBottom: 24,

  input: {
    height: 42,
    padding: "12px 15px",
    boxSizing: "border-box",
    color: theme.palette.common.white,
    borderRadius: 8,
    font: "revert",
    fontWeight: 400,
    fontSize: 14,
    fontStyle: "normal",
    "&:placeholder": {
      color: theme.palette.green[100],
    },
  },
  "& fieldset": {
    borderRadius: 8,
    fontWeight: 400,
  },

  width: "100%",
}));

export const BadgeListContent = styled("div")(({ theme }) => ({
  width: "100%",
  height: "280px",       /* Just for the demo          */
  overflowY: "auto",    /* Trigger vertical scroll    */
  overflowX: "hidden",  /* Hide the horizontal scroll */
}));

export const BadgeListItem = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  height: "56px",
  alignItems: "center",
  padding: "12px",
  borderBottom: "1px solid #38383C",
  "&:hover": {
    color: "#F4E85B",
    background: "#1D3B30"
  },
}));

export const BadgeListImg = styled("img")(({ theme }) => ({
  width: "28px",
  height: "28px",
}));

export const BadgeListName = styled("span")(({ theme }) => ({
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "24px",
  color: "inherit",
  marginLeft: "25px"
}));
