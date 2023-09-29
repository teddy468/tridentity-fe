import { Detail, NotificationWrapper, PaginationCover, PaginationWrapper, SelectPage, Title } from "./styles";
import { Date, FlexColumn, WrapDot, Wrapper } from "@/components/Layout/Header/HeaderMenu/styles";
import moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";
import useFetchList from "@/commons/hooks/useFetchList";
import { NOTIFICATION_URL, NOTIFICATION_URL_UN_READ_COUNT } from "@/commons/constants/apiUrl";
import { ThemeProvider } from "@mui/material";
import { PaginationCustom } from "@/components/MerchantDetail/Review/styles";
import { createTheme } from "@mui/material/styles";
import Select, { OnChangeValue } from "react-select";
import { MessageComponent, routerNotification } from "@/components/Layout/Header/HeaderMenu/NotificationPopover";
import { useRouter } from "next/router";
import defaultAxios from "@/commons/utils/axios";
import useLoading from "@/commons/hooks/useLoading";
import { systemActions } from "@/redux/reducer/systemReducer";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "@/commons/hooks/useFetch";

const theme = createTheme({
  palette: {
    mode: "light", // or 'dark'
    text: {
      primary: "#fff",
    },
    primary: {
      main: "#fff",
    },
  },
  mode: "light", // or 'dark'
  isDark: false, // or true
});

export interface PageOption {
  readonly value: string;
  readonly label: string;
}

export enum NotiEventName {
  OrderConfirmed = `ORDER_CONFIRMED`,
  OrderPrepared = `ORDER_PREPARED`,
  OrderPickedUp = `ORDER_PICKED_UP`,
  OrderDelivered = `ORDER_DELIVERED`,
  OrderCancelled = `ORDER_CANCELLED`,
  RefundResolved = `REFUND_RESOLVED`,
  RefundRefused = `REFUND_REFUSED`,
  LPEarned = `LP_EARNED`,
  LpSpentForPurchasing = `LP_SPENT_FOR_PURCHASING`,
  LpSpentForUpgradingMBS = `LP_SPENT_FOR_UPGRADING_MBS`,
  MBSUpgraded = `MSB_UPGRADED`,
}

const Notification = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const loadSc = useLoading();
  const dispatch = useDispatch();

  const param = { page: page, perPage: perPage, paginationMetadataStyle: "body" };
  const {
    data: notificationList,
    refresh,
    totalPage,
  } = useFetchList<NotificationMessage>(NOTIFICATION_URL, param as any);

  const { newNotiCount } = useSelector(({ system }: RootState) => system);
  useEffect(() => {
    refresh();
  }, [newNotiCount]);

  const { data: unread, refresh: refreshUnread } = useFetch<{ unread: number }>(NOTIFICATION_URL_UN_READ_COUNT);

  useEffect(() => {
    if (unread) {
      dispatch(systemActions.setNewNotiCount(unread.unread));
    }
  }, [unread]);

  const pageOptions = [
    { value: "10", label: "10 / page" },
    { value: "20", label: "20 / page" },
    { value: "50", label: "50 / page" },
  ];

  function handleChange(page: number) {
    setPage(page);
  }

  function onChangePageSize(newValue: OnChangeValue<PageOption, false>) {
    console.log(newValue);
    setPerPage(newValue ? Number(newValue.value) : 10);
  }

  const handleClickNoti = async (value: NotificationMessage) => {
    if (!value.read_at) {
      loadSc.show();
      await defaultAxios.put<any>("user-notifications/" + value.id + "/mark-as-read", {});
      loadSc.hide();
      refreshUnread();
      refresh();
    }
    routerNotification(value, router);
  };

  return (
    <>
      <NotificationWrapper>
        <Title>Notifications</Title>
        {notificationList?.map((value, index) => {
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

        <PaginationCover>
          <PaginationWrapper>
            <ThemeProvider theme={theme}>
              <PaginationCustom
                count={totalPage}
                variant="outlined"
                shape="rounded"
                color={"primary"}
                page={page}
                onChange={(event: React.ChangeEvent<unknown>, page: number) => handleChange(page)}
              />
            </ThemeProvider>
          </PaginationWrapper>

          <SelectPage>
            <Select
              className="select-pagination"
              classNamePrefix="select"
              defaultValue={pageOptions[0]}
              name="color"
              onChange={(event: any) => onChangePageSize(event)}
              options={pageOptions}
            />
          </SelectPage>
        </PaginationCover>
      </NotificationWrapper>
    </>
  );
};
export default Notification;
