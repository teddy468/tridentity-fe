import { Box, styled } from "@mui/material";
import Icon from "../commons/Icon/Icon";
import { SSM_BREAKPOINT } from "@/themes/breakpoints";

export const LoyalPoints = styled("div")(({ theme }) => ({}));

export const AreaMobile = styled(Box)(({ theme }) => ({
  display: "none",

  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
  },

  [theme.breakpoints.down(SSM_BREAKPOINT)]: {
    display: "block",
  },
}));

export const TitleMobile = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 20,
  color: theme.palette.common.white,
  marginTop: 10,
  display: "none",

  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

export const Title = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 24,
  lineHeight: "32px",
  color: theme.palette.common.white,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const CurrentBalance = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "24px",
  color: theme.palette.common.white,
}));

export const LoyalPoint = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 18,
  lineHeight: "24px",
  color: theme.palette.success.light,
  marginLeft: 10,
}));
export const Panel = styled("div")(({ theme }) => ({
  background: theme.palette.grey[800],
  borderRadius: 16,
  width: "100%",
  marginTop: 24,
  padding: "8px 16px 8px 32px",
  overflowY: "auto",
  [theme.breakpoints.down("sm")]: {
    padding: 8,
  },

  [theme.breakpoints.down(SSM_BREAKPOINT)]: {
    div: {
      "&::-webkit-scrollbar": {
        width: 10,
      },
    },
  },
}));

export const LPHistoryItemWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "stretch",
  borderBottom: `1px solid ${theme.palette.grey[600]}`,
  padding: "24px 0",
  ":last-child": {
    borderBottom: "none",
  },
  [theme.breakpoints.down(SSM_BREAKPOINT)]: {
    padding: "16px 0",
  },
}));

export const IconWrapper = styled("div")(({ theme }) => ({
  width: 52,
  height: 52,
  borderRadius: 12,
  background: theme.palette.grey[900],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 32,

  [theme.breakpoints.down("sm")]: {
    marginRight: 5,
    width: 50,
    height: 32,
    borderRadius: 8,
  },

  [theme.breakpoints.down(SSM_BREAKPOINT)]: {
    display: "none",
  },
}));

export const IconStatus = styled(Icon)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    transform: "scale(0.7)",
  },
}));

export const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  [theme.breakpoints.down("md")]: {
    width: "60%",
  },
}));

export const WrapperRight = styled(Box)(({ theme }) => ({
  display: "block",
  [theme.breakpoints.down("md")]: {
    width: "35%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
}));

export const Info = styled("div")(({ theme }) => ({}));

export const LP = styled("div")<{ type: TripAppLpHistoryType }>(({ type, theme }) => ({
  color: type === "reward_user_lp" ? "#12B76A" : "#F25A5A",
  fontWeight: 600,
  fontSize: 18,
  lineHeight: "26px",
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

export const Type = styled("div")(({ theme }) => ({
  fontWeight: 500,
  fontSize: 18,
  lineHeight: "18px",
  display: "flex",
  alignItems: "center",
  gap: 16,
  color: theme.palette.common.white,
  [theme.breakpoints.down("sm")]: {
    fontSize: 16,
  },
}));

export const Description = styled("div")(({ theme }) => ({
  fontSize: 16,
  lineHeight: "24px",
  color: theme.palette.grey[200],
  marginTop: 8,
  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
    marginTop: 0,
  },
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export const DescriptionMobile = styled(Box)(({ theme }) => ({
  width: "100%",
  fontSize: 12,
  lineHeight: "24px",
  color: theme.palette.grey[200],
  marginTop: 8,
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  [theme.breakpoints.down(SSM_BREAKPOINT)]: {
    flexDirection: "column",
  },
}));

export const AmountTransaction = styled("div")(({ theme }) => ({
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "24px",
  marginTop: 8,
  color: theme.palette.common.white,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

export const LpRemaining = styled("span")(({ theme }) => ({
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "24px",
  marginTop: 8,
  color: theme.palette.common.white,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
  },
}));

export const Divider = styled("div")(({ theme }) => ({
  display: "inline-block",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
