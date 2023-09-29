import { CloseCircleIcon, GalleryIcon, RightArrowIcon, SendMsgIcon } from "@/assets/icons";
import moment from "moment";
import Icon from "../../Icon/Icon";
import {
  Avatar,
  AvatarReceiverWrapper,
  AvatarWrapper,
  BackButton,
  ChatDetailWrapper,
  Header,
  MessageItem,
  Messages,
  MessageWrapper,
  Name,
  OnlineStatus,
  Time,
  DateMsg,
  ChatBox,
  ImageInput,
  MessageInput,
  SendBtn,
  EmptyChat,
  MessageText,
  Preview,
  RemoveButton,
  Count,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/redux/reducer/userReducer";
import { CONVERSATION_DETAIL, SEND_MESSAGE, URL_MERCHANT_STORE_DETAIL } from "@/commons/constants/apiUrl";
import { useEffect, useRef, useState } from "react";
import defaultAxios from "@/commons/utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "../../Skeleton";
import useFetch from "@/commons/hooks/useFetch";
import useFetchInfinity from "@/commons/hooks/useFetchInfinity";
import useToast from "@/commons/hooks/useToast";
import { uploadSingleFile } from "@/redux/requests/storageRequest";
import { IMAGE_TYPE_ALLOW } from "@/commons/constants";
import { Box } from "@mui/material";
import { getKey } from "@/commons/utils/filterDuplicate";
import { IMAGE } from "@/commons/constants/message";

const perPage = 10;

const { SVG, JPG, JPEG, PNG } = IMAGE_TYPE_ALLOW;
const ACCEPTED = [SVG, JPG, JPEG, PNG].join(",");
const matchKeys: (keyof Message)[] = ["speaker_id", "timestamp", "message"];

const ChatDetail: React.FC = () => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loadingSend, setLoadingSend] = useState(false);
  const imageInput = useRef<HTMLInputElement | null>(null);
  const { onStoreChat } = useSelector(({ user }: RootState) => user);

  const { data, initialized, loading, hasMore, next, refresh } = useFetchInfinity<Message>(
    onStoreChat ? CONVERSATION_DETAIL(onStoreChat) : "",
    { perPage },
    matchKeys
  );
  const { data: store } = useFetch<Store>(onStoreChat ? URL_MERCHANT_STORE_DETAIL(onStoreChat) : "");
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    // const interval = setInterval(() => {
    //   refresh();
    // }, 2000);
    // return () => clearInterval(interval);
  }, [refresh]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const code = e.keyCode ? e.keyCode : e.which;
    if (code === 13 && !e.shiftKey) handleSubmit();
  };

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: File[] = Array.from(e.target.files);
      if (files.some(({ size }) => size >= 1024 * 1024 * 2)) {
        toast.error(IMAGE.NOT_EXCEED_2MB);
        return handleRemoveFile();
      }
      setFiles(files);
    }
  };

  const handleRemoveFile = () => {
    if (imageInput.current) imageInput.current.value = "";
    setFiles([]);
  };

  const handleSubmit = async () => {
    if (!onStoreChat) return;
    if (loadingSend) return;
    if (!text.trim() && !files.length) return;
    setLoadingSend(true);
    try {
      const urls = await Promise.all(
        files.map(async file => {
          try {
            const formData = new FormData();
            formData.append("file", file);
            const result = await uploadSingleFile(formData);
            return result?.data.file_url;
          } catch (error) {
            return null;
          }
        })
      );
      const failedCount = urls.filter(item => !item).length;
      if (failedCount) toast.error(`Update failed ${failedCount} picture`);
      else {
        const body: CreateMessageBody = {
          message: text,
          merchant_store_id: onStoreChat,
        };
        if (urls.length) body.data = { image_url: urls.filter(item => item).join(",") };

        await defaultAxios.post(SEND_MESSAGE, body);
        setText("");
        handleRemoveFile();
        refresh();
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingSend(false);
  };

  const readMessage = async () => {
    // if (!onStoreChat) return;
    // try {
    //   await defaultAxios.get(READ_MESSAGE(onStoreChat));
    //   refresh();
    // } catch (error) {
    //   console.log(error);
    // }
    // setLoadingSend(false);
  };

  const reverses = [...data].reverse();

  console.log(data, onStoreChat);
  return (
    <ChatDetailWrapper onClick={readMessage}>
      <Header>
        <BackButton onClick={() => dispatch(userActions.setonStoreChat(null))}>
          <Icon icon={RightArrowIcon} isFill />
        </BackButton>
        <AvatarWrapper>
          {store?.logo && <Avatar src={store.logo} alt={"avatar"} />}
          <OnlineStatus />
        </AvatarWrapper>
        <Name>{store?.name}</Name>
      </Header>
      <Messages id="scrollableDiv">
        <InfiniteScroll
          dataLength={data.length}
          next={() => !loading && next()}
          hasMore={hasMore}
          // endMessage={data.length > perPage ? <EndMessage>It is all, nothing more 🤐</EndMessage> : null}
          loader={<Skeleton variant="rectangular" />}
          scrollableTarget="scrollableDiv"
          inverse={true}
        >
          {reverses.map((message, index) => {
            const createdTime = message.timestamp;
            const lastMessage = reverses[index - 1];
            const nextMessage = reverses[index + 1];
            const isSender = message.speaker !== "store";
            const showAvatar = nextMessage?.speaker !== "store";
            const images = message.data?.image_url?.split(",") || [];
            return (
              <Box key={getKey(message, matchKeys)}>
                {index > 0 && !moment(createdTime).isSame(lastMessage.timestamp, "day") && (
                  <DateMsg>{moment(createdTime).format("DD/MM/YYYY")}</DateMsg>
                )}
                {index === 0 && !moment(createdTime).isSame(new Date(), "day") && (
                  <DateMsg>{moment(createdTime).format("DD/MM/YYYY")}</DateMsg>
                )}
                {isSender ? (
                  <MessageItem sender={1}>
                    <Time>{moment(createdTime).format("HH:mm")}</Time>
                    <MessageWrapper sender={1} width={message.data?.image_url ? "80%" : "auto"}>
                      {message.message && <MessageText sender={1}>{message.message}</MessageText>}
                      {images.map(image => (
                        <Preview src={image} alt="preview" />
                      ))}
                    </MessageWrapper>
                  </MessageItem>
                ) : (
                  <MessageItem key={index}>
                    <AvatarReceiverWrapper>
                      {showAvatar && <Avatar src={store?.logo} alt={"avatar"} />}
                    </AvatarReceiverWrapper>
                    <MessageWrapper width={message.data?.image_url ? "80%" : "auto"}>
                      {message.message && <MessageText>{message.message}</MessageText>}
                      {images.map(image => (
                        <Preview src={image} alt="preview" />
                      ))}
                    </MessageWrapper>
                    <Time>{moment(createdTime).format("HH:mm")}</Time>
                  </MessageItem>
                )}
              </Box>
            );
          })}
          {initialized && !data.length && <EmptyChat>The conversation hasn't started yet!</EmptyChat>}
        </InfiniteScroll>
      </Messages>
      <ChatBox>
        <ImageInput active={files.length}>
          <label htmlFor="image-input">
            <Icon icon={GalleryIcon} width={24} isFill />
            <input
              ref={imageInput}
              id="image-input"
              accept={ACCEPTED}
              type="file"
              multiple
              hidden
              onChange={handleChangeFile}
            />
            {!!files.length && <Count>{files.length}</Count>}
          </label>
          {!!files.length && (
            <RemoveButton onClick={handleRemoveFile}>
              <Icon icon={CloseCircleIcon} width={16} height={16} originWidth={24} originHeight={24} fill="#F25A5A" />
            </RemoveButton>
          )}
        </ImageInput>
        <MessageInput placeholder="Aa" value={text} onChange={handleChange} onKeyDown={onKeyDown} maxRows={4} />
        <SendBtn onClick={handleSubmit} disabled={!(files.length || text)} active={text} variant="text">
          <Icon icon={SendMsgIcon} isFill />
        </SendBtn>
      </ChatBox>
    </ChatDetailWrapper>
  );
};

export default ChatDetail;
