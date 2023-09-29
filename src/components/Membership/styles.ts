import { primaryGradient } from "@/themes/palette";
import { Accordion, AccordionDetails, Button, styled } from "@mui/material";
import CustomTabs from "../commons/CustomTabs/CustomTabs";
import Icon from "../commons/Icon/Icon";
import MembershipCard from "./MembershipCard/MembershipCard";

export const MembershipWrapper = styled("div")(({ theme }) => ({
  width: "100%",
}));
export const MembershipUserInfoWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    alignItems: "end",
  },
}));
export const StyledMembershipCard = styled(MembershipCard)(({ theme }) => ({
  width: "45%",
}));

export const MembershipUserInfo = styled("div")(({ theme }) => ({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));
export const CurrentPoints = styled("div")(({ theme }) => ({
  fontWeight: 600,
  fontSize: 18,
  lineHeight: "26px",
  color: theme.palette.common.white,
}));

export const Point = styled("span")(({ theme }) => ({
  color: "#12B76A",
}));
export const UpgradeInfo = styled("div")(({ theme }) => ({
  marginTop: 12,
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.common.white,
}));
export const UpgradePointsNeeded = styled(Point)(({ theme }) => ({
  marginRight: 5,
}));
export const UpgradeButton = styled(Button)(({ theme }) => ({
  margin: "24px auto",
  background: primaryGradient,
  height: 44,
  width: 160,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 24,
  color: theme.palette.common.black,
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "20px",
  cursor: "pointer",
}));

export const MembershipPerksPanel = styled("div")(({ theme }) => ({
  marginTop: 40,
  width: "100%",
  background: theme.palette.grey[800],
  borderRadius: 16,
  padding: 24,
}));

export const Title = styled("div")(({ theme }) => ({
  fontWeight: 600,
  fontSize: 18,
  lineHeight: "26px",
  color: theme.palette.common.white,
}));

export const StyledCustomTabs = styled(CustomTabs)(({ theme }) => ({
  marginBottom: 24,
}));

export const MembershipCollection = styled(MembershipPerksPanel)(({ theme }) => ({}));

export const HeaderMembershipCollection = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
}));

export const StyledIcon = styled(Icon)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.common.white,
}));
export const TabsWrapper = styled("div")(({ theme }) => ({
  marginTop: 24,
}));

export const MembershipPerks = styled("div")(({ theme }) => ({
  marginTop: 24,
}));
export const MembershipTitle = styled("div")(({ theme }) => ({
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "24px",
  color: theme.palette.common.white,
}));

export const StyledUl = styled("ul")(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.common.white,
  marginTop: 8,
  li: {
    marginLeft: 8,
  },
}));

export const Collection = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  rowGap: 20,
  columnGap: 40,
}));

export const MembershipCardItem = styled("div")(({ theme }) => ({
  position: "relative",
  img: {
    width: "100%",
    height: "272px",
    objectFit: "contain",
  },
}));

export const MemberShipCollectionWrapper = styled("div")(({ theme }) => ({
  marginTop: "40px",
}));

export const CustomAccordion = styled(Accordion)(({ theme }) => ({
  borderRadius: "16px !important",
  // background: "#212124 !important",
  background: theme.palette.grey[800],
  padding: "12px 24px !important",
}));

export const CustomAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: "0px 0px !important",
}));
