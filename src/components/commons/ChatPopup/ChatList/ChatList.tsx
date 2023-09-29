import { Avatar, Divider, Skeleton } from "@mui/material";
import {
  AvatarWrapper,
  ChatItemWrapper,
  ChatListWrapper,
  ChatMessage,
  Info,
  Name,
  OnlineStatus,
  Row,
  Time,
  NewMessagesNoti,
  TimeWrapper,
  EndMessage,
  EmptyChat,
  ChatListContainer,
} from "./styles";
import moment from "moment";
import { CONVERSATIONS } from "@/commons/constants/apiUrl";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/redux/reducer/userReducer";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import useFetchInfinity from "@/commons/hooks/useFetchInfinity";

const perPage = 10;

const ChatList: React.FC = () => {
  const { data, hasMore, initialized, next, refresh } = useFetchInfinity<Conversation>(CONVERSATIONS, { perPage });
  const dispatch = useDispatch();

  useEffect(() => {
    // const interval = setInterval(() => {
    //   refresh();
    // }, 5000);
    // return () => clearInterval(interval);
  }, [refresh]);

  return (
    <ChatListWrapper id="scrollableDiv">
      <ChatListContainer>
        {initialized && !data.length && <EmptyChat>No conversation!</EmptyChat>}
        <InfiniteScroll
          dataLength={data.length}
          next={next}
          hasMore={hasMore}
          endMessage={data.length > perPage ? <EndMessage>It is all, nothing more 🤐</EndMessage> : null}
          loader={<Skeleton />}
          scrollableTarget="scrollableDiv"
        >
          {data.map(item => (
            <ChatItemWrapper key={item.id} onClick={() => dispatch(userActions.setonStoreChat(item.store.id))}>
              <AvatarWrapper>
                <Avatar src={item.store.logo} />
                <OnlineStatus />
              </AvatarWrapper>
              <Info>
                <Row>
                  <Name>{item.store.name}</Name>
                  <TimeWrapper>
                    <Time>{moment(item.latest_message?.timestamp).format("DD/MM/YYYY")}</Time>
                    {!!item.user_unread_count && <NewMessagesNoti>{item.user_unread_count}</NewMessagesNoti>}
                  </TimeWrapper>
                </Row>
                <ChatMessage active={Number(item.user_unread_count)}>
                  {!item.latest_message?.message && item.latest_message?.data?.image_url
                    ? item.latest_message?.speaker === "customer"
                      ? "You sent a picture"
                      : `${item.store.name} sent a picture`
                    : item.latest_message?.speaker === "customer"
                    ? `You: ${item.latest_message?.message}`
                    : item.latest_message?.message}
                </ChatMessage>
              </Info>
            </ChatItemWrapper>
          ))}
        </InfiniteScroll>
      </ChatListContainer>
    </ChatListWrapper>
  );
};

export default ChatList;
