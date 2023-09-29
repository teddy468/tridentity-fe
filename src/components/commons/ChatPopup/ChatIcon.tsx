import { MessagesBoldIcon } from "@/assets/icons";
import Icon from "../Icon/Icon";
import { useSelector } from "react-redux";
import { styled } from "@mui/material";
import useFetch from "@/commons/hooks/useFetch";
import { UNREAD_CONVERSATION } from "@/commons/constants/apiUrl";
import { useEffect } from "react";

export const IconWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  width: 32,
  height: 32,
}));

export const NewNotiCount = styled("div")(({ theme }) => ({
  position: "absolute",
  top: -2,
  right: -2,
  minWidth: 14,
  height: 14,
  borderRadius: "50%",
  background: "#F25A5A",
  color: theme.palette.common.white,
  fontSize: 9,
  fontWeight: 500,
  lineHeight: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ChatIcon: React.FC = () => {
  const { userInfo } = useSelector(({ user }: RootState) => user);
  const { data, refresh } = useFetch<UnreadConversation>(userInfo?.id ? UNREAD_CONVERSATION : "");

  useEffect(() => {
    if (userInfo?.id) {
      // const interval = setInterval(() => {
      //   refresh();
      // }, 5000);
      // return () => clearInterval(interval);
    }
  }, [refresh, userInfo]);

  return (
    <IconWrapper>
      <Icon icon={MessagesBoldIcon} isFill gradient width={32} height={32} />
      {!!Number(data?.unread_conversations) && <NewNotiCount>{Number(data?.unread_conversations)}</NewNotiCount>}
    </IconWrapper>
  );
};

export default ChatIcon;
