import { Box, Button, Modal, Popover, Select, styled, TextField } from "@mui/material";
import Rating from "@mui/material/Rating";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomLink from "@/components/commons/CustomLink/CustomLink";
import { BorderGradientButton } from "@/components/commons/GradientButton/BorderGradientButton";

export const ProfileContent = styled("div")(() => ({}));

export const ProfileCompletionWrapper = styled("div")(() => ({
  border: "1px solid #FDCD9D",
  padding: "20px",
  marginBottom: "30px",
  borderRadius: "8px",
}));

export const Text = styled("div")(({ theme }) => ({
  fontWeight: 450,
  fontSize: "16px",
  lineHeight: "26px",
  color: "white",
  fontStyle: "normal",
  fontFamily: "Graphik",
}));

export const ContentWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    flexDirection: "column",
    gap: "20px",
  },
}));

export const ContentLeft = styled("div")(({ theme }) => ({
  width: "216px",
  alignItems: "left",
  display: "block",
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
}));

export const UserAvatarWrapper = styled("div")(({ theme }) => ({
  width: "184px",
  height: "184px",
  border: `3px solid ${theme.palette.secondary.main}`,
  borderRadius: "50%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    width: "170px",
    height: "170px",
  },
}));

export const UserAvatar = styled("img")(() => ({
  width: "auto",
  height: "100%",
}));

export const EditImageButton = styled(BorderGradientButton)(({ theme }) => ({
  boxShadow: "none",
  textTransform: "none",
  width: "183px",
  marginTop: "25px",
  color: "#FDCD9D",
  fontWeight: "500",
  fontSize: "14px",
  lineHeight: "20px",
  textAlign: "center",
  marginBottom: 8,
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    width: "100%",
    marginTop: "1.5rem",
  },
}));

export const ButtonWrapper = styled("div")(() => ({
  marginTop: "25px",
}));

export const UploadAvatarWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const CompletionStatus = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontWeight: 500,
  textAlign: "center",
  marginRight: 28,
  [theme.breakpoints.down("sm")]: {
    margin: "auto",
  },
}));

export const ContentRight = styled("div")(({ theme }) => ({
  flex: "1",
}));

export const Title = styled("div")(() => ({
  fontWeight: 600,
  fontSize: "24px",
  lineHeight: "32px",
  color: "white",
}));

export const UserLP = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.common.white,
  span: {
    color: theme.palette.success.light,
    paddingLeft: 8,
    fontWeight: 500,
  },
}));

export const UserGradle = styled("div")(() => ({
  borderRadius: "12px",
  fontSize: "11px",
  fontWeight: 600,
  color: "#0B0B0C",
  padding: "4px 8px",
  height: "25px",
}));

export const PersonalInformationWrapper = styled("div")(({ theme }) => ({
  background: "#212124",
  borderRadius: "16px",
  padding: "30px 24px",
  marginTop: "20px",
}));

export const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    marginLeft: "2px",
    marginRight: "2px",
  },
  "& .MuiRating-iconEmpty": {
    marginLeft: "2px",
    marginRight: "2px",
  },
});

export const BoxProgress = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

export const BoxProgressText = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  paddingBottom: "4px",
});

export const TextPersonalLabel = styled("div")(({ theme }) => ({
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "26px",
  color: "white",
  fontStyle: "normal",
  display: "flex",
  textAlign: "left",
  alignItems: "center",
}));

export const EditPIButton = styled(Button)(({ theme }) => ({
  boxShadow: "none",
  textTransform: "none",
  height: "20px",
  color: "#FDCD9D",
  fontWeight: "500",
  fontSize: "14px",
  lineHeight: "20px",
  marginLeft: "auto",
}));

export const LabelTitle = styled("div")(({ theme }) => ({
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "20px",
  color: "#ABABB1",
  fontStyle: "normal",
  marginBottom: "12px",
}));

export const LabelValue = styled("div")(({ theme }) => ({
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "24px",
  color: "white",
  fontStyle: "normal",
}));

export const LabelWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  marginBottom: "20px",
}));

export const InfoGroup = styled("div")(({ theme }) => ({
  display: "block",
  marginTop: "24px",
  alignItems: "center",
}));

export const VerifyButton = styled(Button)(({ theme }) => ({
  boxShadow: "none",
  textTransform: "none",
  height: "20px",
  color: "white",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "20px",
  textDecoration: "underline",
}));

export const FlexDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
}));

export const PersonalInformationHeading = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
  p: {
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "26px",
    color: "white",
  },
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  marginTop: 4,
}));

export const SaveButton = styled(Button)(({ theme }) => ({
  background: "#12B76A",
  color: "white",
  fontWeight: 500,
  fontSize: "14px",
  textTransform: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  "&:hover": {
    background: "#12B76A",
    color: "white",
  },
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  background: "transparent",
  color: "#ABABB1",
  fontWeight: 500,
  fontSize: "14px",
  textTransform: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  "&:hover": {
    background: "transparent",
    color: "#ABABB1",
  },
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
    padding: 8,
  },
}));

export const DatePickerCustom = styled(DatePicker)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ABABB1",
    backgroundColor: "transparent",
    textAlign: "center",
    borderRadius: "8px",
    color: "#ABABB1",
    "&:focus": {
      color: "#ABABB1",
    },
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#ABABB1" },
    "&:hover fieldset": { borderColor: "#ABABB1" },
    "&.Mui-focused fieldset": { borderColor: "#54AC8B" },
  },
  path: {
    fill: `${theme.palette.border.primary} !important`,
  },
  ".Mui-focused": {
    path: {
      fill: `${theme.palette.primary.main} !important`,
    },
  },
}));

export const StyledInput = styled(TextField)(() => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  opacity: 0,
  top: 0,
  left: 0,
  zIndex: 200,
}));

export const BootstrapInput = styled(TextField)(({ theme }) => ({
  "label + &": { marginTop: theme.spacing(3) },
  "& .MuiInputBase-input": {
    width: "100%",
    borderRadius: 8,
    position: "relative",
    color: "white",
    // height: "24px",
    backgroundColor: "transparent",
    border: "1px solid #ABABB1",
    fontSize: 16,
    padding: "8px 26px 10px 10px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      borderRadius: 8,
      border: "none",
      boxShadow: "0",
    },
    "&:focus": {
      borderRadius: 8,
      border: "none",
      boxShadow: "0",
    },
  },
}));

export const PayMentCartDetail = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "16px",
}));

export const CardInformation = styled("div")(({ theme }) => ({
  flex: 1,
  marginLeft: "12px",
  p: {
    color: "white",
    fontSize: "14px",
  },
  span: {
    color: "#ABABB1",
    fontSize: "12px",
  },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  border: "1px solid #ABABB1",
  borderRadius: 8,

  color: theme.palette.common.white,
  "&::placeholder": {
    color: theme.palette.common.white,
  },
  path: {
    fill: `${theme.palette.border.primary} !important`,
  },
  ".Mui-focused": {
    path: {
      fill: `${theme.palette.primary.main} !important`,
    },
  },
}));

export const FormContent = styled("form")(() => ({}));

export const StyledPopover = styled("div")(() => ({
  width: "fit-content",
  borderRadius: 8,
  overflow: "hidden",
  background: "linear-gradient(324deg, #0B0B0B 38.44%, #161A18 85.8%)",
}));

export const PopoverItem = styled("div")(({ theme }) => ({
  width: 260,
  height: 50,
  display: "flex",
  paddingLeft: 44,
  alignItems: "center",
  color: theme.palette.common.white,
  fontSize: 14,
  lineHeight: "20px",
  cursor: "pointer",
  "&:hover": {
    background: "#1D3B30",
    color: "#F7EF82",
  },
}));

export const PopoverItem2 = styled("div")(({ theme }) => ({
  position: "relative",
  zIndex: 1000,
  width: 389,
  background: "linear-gradient(324deg, #0B0B0B 38.44%, #161A18 85.8%)",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: 14,
  lineHeight: 20,
  "&:hover": {
    background: "linear-gradient(324deg, #0B0B0B 38.44%, #161A18 85.8%)",
  },
}));

export const FlexColumn = styled("div")(({ theme }) => ({
  flexDirection: "row",
}));

export const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  padding: 16,
  cursor: "pointer",
}));

export const Detail = styled("div")(({ theme }) => ({
  width: 269,
  color: "white",
  lineHeight: "20px",
  height: 50,
  marginLeft: 12,
}));

export const DetailRequire = styled("div")(({ theme }) => ({
  width: 269,
  color: "#ABABB1",
  height: 30,
  marginLeft: 12,
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  display: "flex",
  lineHeight: "20px",
  alignItems: "center",
}));

export const Date = styled("div")(({ theme }) => ({
  color: "#ABABB1",
  fontWeight: 400,
  fontSize: 12,
  lineHeight: "16px",
  marginLeft: 12,
}));

export const IconButton = styled("a")(() => ({
  display: "block",
  position: "relative",
  padding: 10,
  width: 44,
  height: 44,
}));

export const CheckboxWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: "30px",
  marginLeft: "20px",
}));

export const CheckboxLabel = styled("div")(({ theme }) => ({
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "14px",
  color: "white",
}));

export const IconWrapper = styled("div")(({ theme }) => ({
  cursor: "pointer",
}));

export const StyledModal = styled(Modal)(() => ({
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const Container = styled(Box)(({ theme }) => ({
  background: "linear-gradient(324deg, rgba(11, 11, 11, 0.8) 38.44%, rgba(22, 26, 24, 0.8) 85.8%)",
  backdropFilter: "blur(12px)",
  color: "rgb(128, 128, 137)",
  padding: "32px 24px",
  width: 588,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #FDCD9D",
  borderRadius: 20,
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "32px 20px",
  },
}));

export const ModalTitle = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 32,
  lineHeight: "40px",
  color: theme.palette.common.white,
  width: "100%",
  textAlign: "center",
  marginBottom: 10,
  [theme.breakpoints.down("sm")]: {
    fontSize: 24,
  },
}));

export const TabContainer = styled(Box)(() => ({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "max-content",
  maxHeight: "calc(100vh - 300px)",
  overflowX: "hidden",
  overflowY: "auto",
  marginBottom: 40,
  overscrollBehavior: "contain",
}));

export const FormAction = styled(Box)(() => ({
  width: "100%",
  maxWidth: 384,
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 16,
}));

export const AvatarOption = styled(Box)(() => ({
  textAlign: "center",
  width: 183,
}));
