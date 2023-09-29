import { Box, styled } from "@mui/material";
import Image from "next/image";

export const ChatListWrapper = styled(Box)(({ theme }) => ({
  width: 400,
  maxWidth: "100%",
  height: "calc(100vh - 150px)",
  maxHeight: 500,
  borderRadius: 20,
  overflow: "hidden",
}));
export const ChatListContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  overflowY: "auto",
}));
export const ChatItemWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  gap: "12px",
  alignItems: "center",
  borderBottom: "1px solid #38383C",
  cursor: "pointer",
  "&:last-child": {
    borderBottom: "none",
  },
  height: 96,
  padding: 20,
  "&:hover": {
    background: "#38383C30",
  },
}));

export const AvatarWrapper = styled(Box)(() => ({
  position: "relative",
}));

export const OnlineStatus = styled(Box)(({ theme }) => ({
  width: 10,
  height: 10,
  backgroundColor: "#12B76A",
  border: "2px solid #fff",
  borderRadius: "50%",
  right: 0,
  position: "absolute",
  bottom: 0,
}));
export const Avatar = styled(Image)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: "50%",
}));

export const Info = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  overflow: "hidden",
  flex: 1,
  gap: "6px",
}));
export const Row = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
}));

export const Name = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "24px",
  color: theme.palette.common.white,
}));

export const Time = styled(Box)(() => ({
  fontSize: 12,
  lineHeight: "16px",
  textAlign: "right",
  color: "#ABABB1",
}));

export const ChatMessage = styled(Time)<{ active: number }>(({ active, theme }) => ({
  width: "100%",
  color: active ? theme.palette.common.white : "#ABABB1",
  fontWeight: active ? 500 : 400,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  textAlign: "left",
}));

export const NewMessagesNoti = styled(Box)(({ theme }) => ({
  height: 16,
  width: "fit-content",
  backgroundColor: "#F25A5A",
  borderRadius: "50%",
  minWidth: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 10,
  lineHeight: "10px",
  fontWeight: 500,
  color: theme.palette.common.white,
}));

export const TimeWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "6px",
  alignItems: "center",
}));

export const EndMessage = styled(Box)(({ theme }) => ({
  padding: 20,
  textAlign: "center",
}));

export const EmptyChat = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#B0B0B0",
  fontSize: 14,
  lineHeight: "20px",
}));
