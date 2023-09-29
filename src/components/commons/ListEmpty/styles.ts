import { Box, styled, MenuItem, Select } from "@mui/material";
import Link from "next/link";

export const PageContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#000",
}));

export const PageInfo = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginRight: 20,
}));

export const PageSizeContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginRight: 15,
}));

export const PageSizeDropdown = styled(Select)(() => ({
  marginRight: 10,
  "> div": {
    padding: "3px 8px",
  },
}));

export const PageSizeOption = styled(MenuItem)(() => ({}));

export const TotalItems = styled(Box)(() => ({}));

export const PageList = styled(Box)(() => ({
  color: "white",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 25,
}));

export const PageItem = styled(Link)<{ disabled?: number }>(({ disabled }) => ({
  color: disabled ? "#667085" : "#000",
  pointerEvents: disabled ? "none" : "all",
}));

export const NumberOfItems = styled(Box)(() => ({
  color: "#000",
}));
