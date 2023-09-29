import { CloseCircleIcon } from "@/assets/icons";
import Icon from "../Icon/Icon";
import ChatDetail from "./ChatDetail/ChatDetail";
import ChatList from "./ChatList/ChatList";
import { CloseButton, ContentWrapper, StyledPopover } from "./styles";
import { useSelector } from "react-redux";

interface ChatPopupProps {
  handleClose: () => void;
  anchorEl: HTMLButtonElement | null;
  open: boolean;
  id: string | undefined;
}
const ChatPopup: React.FC<ChatPopupProps> = ({ handleClose, anchorEl, open, id }: ChatPopupProps) => {
  const { onStoreChat } = useSelector(({ user }: RootState) => user);
  return (
    <StyledPopover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: 320,
      }}
    >
      <ContentWrapper>
        {open && (
          <CloseButton onClick={handleClose}>
            <Icon icon={CloseCircleIcon} gradient />
          </CloseButton>
        )}
        {onStoreChat ? <ChatDetail /> : <ChatList />}
      </ContentWrapper>
    </StyledPopover>
  );
};

export default ChatPopup;
