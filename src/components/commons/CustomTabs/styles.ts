import { primaryGradient } from "@/themes/palette";
import { Box, styled } from "@mui/material";

export const TabsContainer = styled(Box)(() => ({
  width: "100%",
}));

export const TabsHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: 44,
  borderRadius: "24px",
  background: theme.palette.grey[700],
  padding: "4px",
}));
export const TabBackground = styled(Box)<{ active: boolean }>(({ theme, active }) => ({
  height: "100%",
  width: "100%",
  borderRadius: "24px",
  overflow: "hidden",
  background: active ? " #1D3B30" : "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
export const Tab = styled(Box)<{ active: boolean }>(({ theme, active }) => ({
  position: "relative",
  borderRadius: "24px",
  padding: "1px",
  cursor: "pointer",
  background: active ? primaryGradient : "transparent",
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const TabLabel = styled(Box)<{ active: boolean }>(({ active }) =>
  !active
    ? {
        color: "#C3C3C3",
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "20px",
      }
    : {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "20px",
        background: primaryGradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        TextFillColor: "transparent",
      }
);

export const TabContent = styled(Box)(() => ({
  marginTop: 40,
}));
