import { Box, Button, TextareaAutosize, styled } from "@mui/material";

export const ChatDetailWrapper = styled(Box)(() => ({
  width: 400,
  maxWidth: "100%",
  height: "calc(100vh - 150px)",
  maxHeight: 500,
  borderRadius: 20,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
}));

export const Header = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  minHeight: "max-content",
  padding: "20px",
  width: "100%",
  gap: "20px",
  background: "#212124",
}));

export const BackButton = styled(Box)(({ theme }) => ({
  height: 24,
  cursor: "pointer",
  padding: 0,
  minWidth: "max-content",
  color: theme.palette.grey[200],
  transform: "rotate(180deg)",
  "&:hover": {
    color: "#fff",
  },
}));

export const AvatarWrapper = styled(Box)(() => ({
  position: "relative",
  width: 32,
  height: 32,
  background: "#7B7B84",
  borderRadius: "50%",
}));

export const Avatar = styled("img")(() => ({
  width: 32,
  height: 32,
  borderRadius: "50%",
}));

export const OnlineStatus = styled(Box)(({ theme }) => ({
  width: 10,
  height: 10,
  backgroundColor: "#12B76A",
  border: "1px solid #fff",
  borderRadius: "50%",
  right: 0,
  position: "absolute",
  bottom: 0,
}));

export const Name = styled(Box)(() => ({
  fontWeight: 600,
  fontSize: 18,
  lineHeight: "26px",
  color: "#fff",
}));

export const Messages = styled(Box)(() => ({
  padding: "0 20px 20px",
  height: "100%",
  overflowX: "hidden",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column-reverse",
}));

export const MessageItem = styled(Box)<{ sender?: number }>(({ sender }) => ({
  display: "flex",
  justifyContent: sender ? "flex-end" : "flex-start",
  alignItems: "flex-end",
  width: "100%",
  margin: "12px 0",
  gap: "12px",
}));

export const AvatarReceiver = styled("img")(() => ({
  width: 32,
  height: 32,
  objectFit: "contain",
}));

export const AvatarReceiverWrapper = styled(Box)(() => ({
  width: 32,
  height: 32,
}));

export const MessageWrapper = styled(Box)<{ sender?: number }>(({ sender }) => ({
  maxWidth: "60%",
  display: "flex",
  flexDirection: "column",
  alignItems: sender ? "flex-end" : "flex-start",
  gap: "5px",
}));

export const MessageText = styled(Box)<{ sender?: number }>(({ sender }) => ({
  background: sender ? "#1D3B30" : "#fff",
  borderRadius: "16px",
  padding: "8px 12px",
  wordBreak: "break-word",
  whiteSpace: "break-spaces",
  color: sender ? "#fff" : "#000",
  fontSize: 16,
  lineHeight: "24px",
  fontWeight: 400,
}));
export const Preview = styled("img")(() => ({
  borderRadius: "16px",
  width: "100%",
  height: "auto",
}));

export const Time = styled(Box)(() => ({
  color: "#ABABB1",
  fontSize: 12,
  lineHeight: "16px",
}));

export const DateMsg = styled(Box)(() => ({
  width: "100%",
  textAlign: "center",
  margin: "20px auto",
  color: "#ABABB1",
  fontSize: 12,
  lineHeight: "16px",
  fontWeight: 500,
}));

export const ChatBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-end",
  gap: "16px",
  width: "100%",
  padding: "20px",
  minHeight: "max-content",
}));

export const ImageInput = styled("div")<{ active: number }>(({ active }) => ({
  background: "#212124",
  position: "relative",
  width: 44,
  borderBottomLeftRadius: 20,
  cursor: "pointer",
  color: active ? "#fff" : "#7B7B84",
  "&:hover": {
    color: "#fff",
  },
  label: {
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0,
  },
}));

export const MessageInput = styled(TextareaAutosize)(({ theme }) => ({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "20px",
  background: "transparent",
  borderRadius: 8,
  width: "100%",
  border: `1px solid ${theme.palette.border.primary}`,
  marginBottom: 0,
  outline: "none",
  color: theme.palette.common.white,
  padding: "11px 16px",
  resize: "none",
  "&:placeholder": {
    color: theme.palette.text.disabled,
    fontSize: 14,
    lineHeight: "20px",
    fontFamily: "Graphik",
  },
}));

export const SendBtn = styled(Button)<{ active: string }>(({ active }) => ({
  cursor: "pointer",
  height: 44,
  width: 24,
  minWidth: 24,
  padding: "10px 0",
  color: active ? "#FFF" : "#7B7B84",
  "&:hover": {
    color: "#fff",
  },
  "&:disabled": {
    color: "#7B7B84",
  },
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

export const Thumbnail = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 44,
  maxWidth: 44,
  height: 44,
  maxHeight: 44,
  overflow: "hidden",
  border: "1px solid #7b7b84",
  borderRadius: 8,
  "*": {
    lineHeight: "1 !important",
  },
  img: {
    width: "auto",
    height: "auto",
    backgroundColor: "#ababb1",
    objectFit: "cover",
    overflow: "hidden",
  },
}));

export const RemoveButton = styled(Box)(() => ({
  position: "absolute",
  top: -2,
  right: -6,
  width: 16,
  height: 16,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#f25a5a",
  "&:hover": {
    color: "#f25a5a",
  },
}));

export const Count = styled(Box)(() => ({
  position: "absolute",
  top: -2,
  left: -6,
  width: 16,
  height: 16,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 10,
  lineHeight: "10px",
  color: "#FFF",
  background: "#f25a5a",
  borderRadius: 10,
}));
