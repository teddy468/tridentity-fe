import { primaryGradient } from "@/themes/palette";
import { Box, styled } from "@mui/material";
import { red } from "@mui/material/colors";

export const DescriptionWrapper = styled(Box)(({ theme }) => ({}));
export const DescriptionLabel = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.grey[200],
}));
export const DescriptionContent = styled("div")(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.common.white,
  WebkitLineClamp: "2",
}));

export const ContentWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-end",
  marginTop: "16px",
}));

export const SeeMore = styled("span")(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  background: primaryGradient,
  whiteSpace: "nowrap",
  WebkitTextFillColor: "transparent",
  WebkitBackgroundClip: "text",
  cursor: "pointer",
}));

export const TagWrapper = styled(Box)(() => ({
  display: "flex",
  marginTop: "20px",
  alignItems: "center",
}));

export const SubTag = styled("span")(() => ({
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "20pz",
  color: "#54AC8B",
  marginLeft: "12px",
  "&:first-of-type": { marginLeft: 0 },
}));

export const StoreLinkWrapper = styled(Box)(() => ({
  display: "flex",
  marginTop: "20px",
}));

export const StoreImg = styled("img")(() => ({
  width: "70px",
  height: "70px",
  borderRadius: 8,
}));

export const StoreNameAndChat = styled("div")(() => ({
  display: "flex",
  marginLeft: "20px",
  flexDirection: "column",
}));

export const StoreName = styled("a")(() => ({
  fontWeight: 500,
  fontSize: "20px",
  lineHeight: "32px",
  color: "#fff",
  marginBottom: "10px",
}));
