import * as React from "react";
import { useEffect } from "react";
import {
  CountNumber,
  Date,
  Detail,
  FlexColumn,
  GrayText,
  IconNotiButton,
  PopoverItem2,
  StyledPopover,
  TextGreen,
  ViewAllNoti,
  WhiteText,
  WrapDot,
  Wrapper,
} from "@/components/Layout/Header/HeaderMenu/styles";
import { NotificationIcon } from "@/assets/icons";
import Icon from "@/components/commons/Icon/Icon";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import useFetchList from "@/commons/hooks/useFetchList";
import { NOTIFICATION_URL, NOTIFICATION_URL_UN_READ_COUNT } from "@/commons/constants/apiUrl";
import moment from "moment/moment";
import { routers } from "@/commons/constants/routers";
import { NextRouter, useRouter } from "next/router";
import { systemActions } from "@/redux/reducer/systemReducer";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "@/commons/hooks/useFetch";
import defaultAxios from "@/commons/utils/axios";
import { NotiEventName } from "@/components/Notification/Notification";
import useLoading from "@/commons/hooks/useLoading";
import { formatNotifyNumber } from "@/commons/utils/formatNumber";
import { isManyNotification } from "@/utils/notificationHelper";

interface Props {
  userInfo: any;
}

export function routerNotification(value: NotificationMessage, router: NextRouter) {
  switch (value.meta.eventName) {
    case NotiEventName.OrderConfirmed:
    case NotiEventName.OrderPrepared:
    case NotiEventName.OrderPickedUp:
    case NotiEventName.OrderDelivered:
    case NotiEventName.OrderCancelled:
    case NotiEventName.RefundResolved:
    case NotiEventName.RefundRefused:
      if (value && value.content && value.content.orderId) {
        const orderId = value.content.orderId;
        router.push(`${routers.USER.MY_ORDERS}/${orderId}`);
      } else {
        router.push(routers.USER.MY_ORDERS);
      }
      break;
    case NotiEventName.LPEarned:
    case NotiEventName.LpSpentForPurchasing:
    case NotiEventName.LpSpentForUpgradingMBS:
      router.push(routers.USER.LOYALTY_POINTS);
      break;
    case NotiEventName.MBSUpgraded:
      router.push(routers.USER.MEMBERSHIP);
      break;
  }
}

export const MessageComponent = ({ message }: { message: NotificationMessage }) => {
  const parts = message.content.message.split(/(:\w+)/);
  const renderedParts = parts.map((part, index) => {
    if (part.startsWith(":")) {
      const placeholder = part.slice(1);
      if (placeholder === "orderId") {
        return <TextGreen key={index}>{message.content.orderId}</TextGreen>;
      } else if (placeholder === "storeName") {
        return <TextGreen key={index}>{message.content.storeName}</TextGreen>;
      } else if (placeholder === "lp") {
        return <TextGreen key={index}>{message.content.lp ? Math.floor(message.content.lp) : 0}</TextGreen>;
      } else if (placeholder === "tier") {
        return <TextGreen key={index}>{message.content.tier}</TextGreen>;
      }
    }
    return part;
  });
  if (message.read_at) {
    return <GrayText>{renderedParts}</GrayText>;
  }
  return <WhiteText>{renderedParts}</WhiteText>;
};

const NotificationPopover: React.FC<Props> = ({ userInfo }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const loadSc = useLoading();

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const params = { page: 1, perPage: 5, paginationMetadataStyle: "body" };
  const { data, refresh } = useFetchList<NotificationMessage>(NOTIFICATION_URL, params as any);
  const { data: unreadBE, refresh: refreshUnread } = useFetch<{ unread: number }>(NOTIFICATION_URL_UN_READ_COUNT);

  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   refreshUnread();
    // }, 3000); // 1000 milliseconds = 1 second
    // return () => {
    //   clearInterval(intervalId);
    // };
  }, []);

  useEffect(() => {
    if (unreadBE) {
      dispatch(systemActions.setNewNotiCount(unreadBE.unread));
    }
  }, [unreadBE]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { newNotiCount } = useSelector(({ system }: RootState) => system);
  useEffect(() => {
    refresh();
  }, [newNotiCount]);

  function onClickViewAll() {
    router.push(routers.USER.NOTIFICATION);
  }

  const handleClickNoti = async (value: NotificationMessage) => {
    if (!value.read_at) {
      loadSc.show();
      await defaultAxios.put<any>("user-notifications/" + value.id + "/mark-as-read", {});
      refreshUnread();
      loadSc.hide();
    }
    handleClose();
    routerNotification(value, router);
  };

  return (
    <>
      <IconNotiButton onClick={handleClick}>
        <Icon icon={NotificationIcon} color="inherit" isFill />
        {!!newNotiCount && (
          <CountNumber isMany={isManyNotification(newNotiCount)}>{formatNotifyNumber(newNotiCount)}</CountNumber>
        )}
      </IconNotiButton>
      <StyledPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          onMouseLeave: handleClose,
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <PopoverItem2>
            {data &&
              data.map((value, index) => {
                return (
                  <Wrapper key={index} onClick={() => handleClickNoti(value)}>
                    <FlexColumn>
                      <Detail>
                        <MessageComponent message={value} />
                      </Detail>
                      <Date>{moment(value.create_time).format("YYYY/MM/DD HH:mm")}</Date>
                    </FlexColumn>
                    {!value.read_at && <WrapDot></WrapDot>}
                  </Wrapper>
                );
              })}
          </PopoverItem2>
        </ClickAwayListener>
        <ViewAllNoti onClick={() => onClickViewAll()}>
          <span>View all notifications</span>
        </ViewAllNoti>
      </StyledPopover>
    </>
  );
};

export default NotificationPopover;
