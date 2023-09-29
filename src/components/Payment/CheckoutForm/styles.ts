import { Box, Button, Grid, Radio, Switch, styled } from "@mui/material";
import CustomInput from "@/components/commons/CustomInput/CustomInput";
import { isMobile } from "react-device-detect";
import { darkLinearGradient } from "@/themes/palette";

export const CheckoutContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: 16,
  background: theme.palette.grey[800],
  color: theme.palette.common.white,
  borderRadius: 8,
  overflow: "hidden",
  marginBottom: 24,
}));

export const CheckoutWrapperDesktop = styled(Box)(({ theme }) => ({
  width: "100%",
  background: theme.palette.grey[800],
  overflow: "hidden",
  marginBottom: 24,
  padding: "8px 16px",
  borderRadius: 8,
}));

export const Title = styled(Box)(() => ({
  fontWeight: 600,
  fontSize: 18,
  lineHeight: "26px",
  marginBottom: 16,
}));

export const TitleDesktop = styled(Title)(() => ({
  marginBottom: 0,
}));

export const TitleRegion = styled(Box)(({ theme }) => ({
  display: "inline-block",
  color: theme.palette.grey[100],
}));

export const PickupSelectMobile = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  gap: 10,
  position: "relative",
  zIndex: 1,
  marginBottom: 32,
}));

export const PickupSelectDesktop = styled(PickupSelectMobile)(() => ({
  position: "relative",
  width: "35%",
  margin: "1rem 0",
}));

export const PickupOptions = styled(Button)<{ active: number }>(({ theme, active }) => ({
  position: "relative",
  margin: isMobile ? "auto" : "0 0.5rem",
  flex: 1,
  height: isMobile ? 60 : "3rem",
  backgroundClip: "padding-box",
  border: `1px solid ${active ? "transparent" : theme.palette.grey[200]}`,
  backgroundColor: theme.palette.grey[800],
  borderRadius: 8,
  "&:before": {
    content: active ? `""` : "unset",
    position: "absolute",
    inset: 0,
    zIndex: -1,
    margin: "-1px",
    background: "linear-gradient(to right bottom, #FDCD9D, #F7EF82)",
    borderRadius: "inherit",
  },
  "&:hover": {
    backgroundColor: theme.palette.common.black,
    "&:before": {
      background: "#F4E85B",
    },
    div: {
      background: "none",
      WebkitTextFillColor: "#F4E85B",
    },
  },
  "&:disabled": {
    div: {
      color: "#7B7B84 !important",
    },
  },
}));

export const PickupText = styled(Box)<{ active: number }>(({ active, theme }) =>
  active
    ? {
        background: "linear-gradient(94.22deg, #FDCD9D 0%, #F7EF82 100%)",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }
    : {
        color: theme.palette.common.white,
        fontWeight: 400,
      }
);

export const AddressSelect = styled(Box)(() => ({
  marginBottom: 10,
}));

export const AddressShowDivider = styled(Box)(({ theme }) => ({
  height: 1,
  width: "100%",
  background: theme.palette.grey[500],
}));

export const AddressSelectDesktop = styled(Box)(({ theme }) => ({
  margin: "1rem auto",
}));

export const AddressShowWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const AddressShow = styled(Box)(() => ({
  width: "20%",
  height: "fit-content",
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
  marginRight: 8,
  cursor: "pointer",
}));

export const ArrowWrapper = styled(Box)<{ isActive: boolean }>(({ theme, isActive }) => ({
  paddingTop: 4,
  height: "fit-content",
  transform: isActive ? "rotate(180deg)" : "none",
}));

export const AddressOptions = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginBottom: 16,
}));

export const AddressOptionsDesktop = styled(AddressOptions)(() => ({
  alignItems: "flex-start",
}));

export const PlusCircleFillIconWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  background: theme.palette.common.black,
}));

export const CustomRadio = styled(Radio)(() => ({
  width: 20,
  height: 20,
  marginRight: 10,
}));

export const UserInfoDefault = styled(Box)(() => ({
  fontWeight: 500,
  display: "inline-block",
  marginBottom: 18,
}));

export const UserInfoDefaultDesktop = styled(UserInfoDefault)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 10,
  marginBottom: 0,
}));

export const Username = styled(Box)(() => ({
  fontWeight: 500,
  display: "inline-block",
}));

export const UserAddress = styled(Box)(() => ({
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "20px",
  color: "#C3C3C3",
}));

export const UserAddressText = styled("p")(() => ({
  fontSize: 14,
}));

export const DividerAddress = styled("span")(() => ({
  width: "0px",
  height: "20px",
  border: "1px solid #C3C3C3",
  marginLeft: "5px",
  marginRight: "5px",
}));

export const AddressForm = styled("form")(() => ({
  width: "100%",
  marginTop: 10,
  marginBottom: 0,
}));

export const TotalItem = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontWeight: 400,
  fontSize: 16,
  lineHeight: "24px",
  marginBottom: 12,
}));

export const TooltipWrapper = styled(Box)(() => ({
  display: "block",
  position: "relative",
  width: 20,
}));

export const StyledPopover = styled("div")(() => ({
  width: 270,
  position: "absolute",
  top: 20,
  left: -170,
  zIndex: 1100,
  borderRadius: 8,
  background: darkLinearGradient,
}));

export const PopoverItem = styled("div")(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  padding: 16,
}));

export const Detail = styled("div")(({ theme }) => ({
  color: "white",
  width: '100%',
}));

export const TotalValue = styled(Box)(() => ({
  fontWeight: 500,
  fontSize: 16,
}));

export const LoyaltyPointEarn = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 16,
  color: theme.palette.success.light,
}));

export const LoyaltyPoint = styled(Box)(({ theme }) => ({
  background: theme.palette.primaryColor[800],
  borderRadius: 8,
  padding: 12,
  fontWeight: 400,
  fontSize: 14,
}));
export const LoyaltyPointTitle = styled(Box)(() => ({
  marginBottom: 12,
}));

export const LoyaltyPointValue = styled(Box)(() => ({
  fontWeight: 500,
  fontSize: 14,
}));

export const LoyaltyPointUSD = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 14,
  color: theme.palette.success.light,
}));

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(15px)",
      color: theme.palette.common.white,
    },
  },
  "& .MuiSwitch-thumb": {
    width: 16,
    height: 16,
  },
  "& .MuiSwitch-track": {
    borderRadius: 40,
    width: 36,
    height: 20,
    backgroundColor: "#909193",
    opacity: 1,
  },
  ".Mui-checked+.MuiSwitch-track": {
    backgroundColor: "#12B76A",
  },
}));

export const StyledInput = styled(CustomInput)(() => ({
  width: "140px",
  flex: 0,
}));

export const SubmitDivider = styled(Box)(({ theme }) => ({
  margin: " 24px 0px",
  borderTop: `1px solid ${theme.palette.grey[600]}`,
}));

export const PaymentCardHeader = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 1,
  position: "relative",
  marginBottom: 8,
}));

export const AddCardButton = styled(PickupOptions)(() => ({
  width: "max-content",
  flex: "unset",
  height: 32,
  padding: "5px 16px",
  borderRadius: 16,
  marginBottom: 16,
  textTransform: "unset",
}));
export const AddCardText = styled(Box)(() => ({
  background: "linear-gradient(94.22deg, #FDCD9D 0%, #F7EF82 100%)",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

export const CardItem = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
}));

export const CardInformation = styled(Box)(() => ({
  flex: 1,
}));

export const CardNo = styled(Box)(() => ({
  color: "white",
  fontSize: "14px",
}));
export const CardExpDate = styled(Box)(() => ({
  color: "#ABABB1",
  fontSize: "12px",
}));

export const SaveAddressButton = styled(Button)(({ theme }) => ({
  border: "1.5px solid #FDCD9D",
  backgroundColor: "transparent",
  borderRadius: 24,
  padding: "10px 24px",
  lineHeight: "16px",
  textTransform: "none",
  color: theme.palette.text.primary,
  fontWeight: 500,
  width: "100%",
  marginTop: "1rem",
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    marginTop: "1rem",
    marginLeft: "5px",
  },
}));

export const ErrorMessage = styled(Box)(({ theme }) => ({
  width: "100%",
  color: theme.palette.error.light,
  textAlign: "left",
  marginTop: 8,
  fontSize: 14,
}));
