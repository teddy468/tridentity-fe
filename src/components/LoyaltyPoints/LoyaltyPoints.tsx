import { ReceivedIcon, SendIcon } from "@/assets/icons";
import { URL_USER_LP, URL_USER_LP_HISTORY } from "@/commons/constants/apiUrl";
import { details } from "@/commons/constants/routers";
import useFetch from "@/commons/hooks/useFetch";
import useFetchInfinity from "@/commons/hooks/useFetchInfinity";
import { getMembershipColor, getMembershipType } from "@/commons/utils/getMembershipType";
import { formatDateTime, getCurrency } from "@/utils/dataHelper";
import { formatLP } from "@/utils/formatNumber";
import { Box, Skeleton, Stack } from "@mui/material";
import BigNumber from "bignumber.js";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { UserGradle } from "../Profile/PersonalInformation/styles";
import NotFoundData from "../commons/NotFoundData/NotFoundData";
import {
  AmountTransaction,
  AreaMobile,
  CurrentBalance,
  Description,
  DescriptionMobile,
  Divider,
  IconStatus,
  IconWrapper,
  Info,
  LP,
  LPHistoryItemWrapper,
  LoyalPoint,
  LoyalPoints,
  LpRemaining,
  Panel,
  Title,
  TitleMobile,
  Type,
  Wrapper,
  WrapperRight,
} from "./styles";
import { isMobile } from "react-device-detect";

const LoyaltyPoints = () => {
  const { data: userLoyaltyPoint } = useFetch<UserLoyaltyPoint>(URL_USER_LP);
  const { userMembership } = useSelector(({ user }: RootState) => user);

  const {
    data: listTransaction,
    initialized: initializedTransaction,
    hasMore,
    loading,
    next,
  } = useFetchInfinity<LoyaltyPointHistory>(URL_USER_LP_HISTORY, { perPage: 5 }, "create_time");

  return (
    <LoyalPoints>
      <Title>
        LP transactions
        {!!userLoyaltyPoint && (
          <CurrentBalance display="flex">
            Current LP:
            <LoyalPoint>{new BigNumber(userLoyaltyPoint.point).toFormat(0, 1)} LP</LoyalPoint>
          </CurrentBalance>
        )}
      </Title>
      <AreaMobile>
        <TitleMobile>LP transactions</TitleMobile>
        {!!userLoyaltyPoint && (
          <CurrentBalance display="flex">
            Current LP:
            <LoyalPoint>{new BigNumber(userLoyaltyPoint.point).toFormat(0, 1)} LP</LoyalPoint>
          </CurrentBalance>
        )}
      </AreaMobile>
      <Panel>
        <Box id="scrollableDiv" sx={{ height: "500px", overflowY: "auto", paddingRight: "1rem" }}>
          <InfiniteScroll
            key={listTransaction.length}
            dataLength={listTransaction.length}
            next={next}
            hasMore={hasMore}
            loader={<Skeleton variant="rectangular" />}
            scrollableTarget="scrollableDiv"
            inverse={false}
          >
            {listTransaction.map(item => (
              <LPHistoryItem
                key={item.id}
                type={item.type}
                point={item.point}
                orderId={item.order_id}
                amount={item.amount}
                currency={item.currency}
                create_time={item.create_time}
                balance={item.balance}
                userMembership={userMembership}
              />
            ))}

            {initializedTransaction && !listTransaction.length && (
              <NotFoundData text="loyalty points transaction histories" />
            )}
          </InfiniteScroll>
        </Box>
      </Panel>
    </LoyalPoints>
  );
};

export default LoyaltyPoints;

export const format2Digit = (value: string | number) => {
  return new BigNumber(value).toFormat(2, 1);
};

interface LPHistoryItemProps {
  type: TripAppLpHistoryType;
  orderId: string;
  amount: string;
  point: number;
  currency: string;
  create_time: string;
  userMembership: UserMembership | null;
  balance: number;
}

const LPHistoryItem = ({
  type,
  orderId,
  point,
  amount,
  create_time,
  userMembership,
  balance,
  currency,
}: LPHistoryItemProps) => {
  const router = useRouter();

  const renderStatus = (status: TripAppLpHistoryType) => {
    switch (status) {
      case "reward_user_lp":
        return "Earn";
      case "upgrade_lp":
        return "Upgrade membership";
      default:
        return "Spend";
    }
  };

  return (
    <LPHistoryItemWrapper>
      <Wrapper>
        <IconWrapper>
          <IconStatus icon={type === "reward_user_lp" ? ReceivedIcon : SendIcon} originHeight={24} originWidth={24} />
        </IconWrapper>
        <Info>
          <Type>
            {renderStatus(type)}
            <UserGradle
              style={{
                background: getMembershipColor(userMembership?.level || 0),
              }}
            >
              {getMembershipType(userMembership?.level || 0)}
            </UserGradle>
          </Type>

          <>
            <Box>
              {!isMobile ? (
                <Description onClick={() => router.push(details.order(orderId))}>
                  Order ID: {orderId} <Divider>|</Divider> {formatDateTime(create_time)}
                </Description>
              ) : (
                <Box onClick={() => router.push(details.order(orderId))}>
                  <Description>Order ID: {orderId}</Description>
                  <Description>{formatDateTime(create_time)}</Description>
                </Box>
              )}
            </Box>

            <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
              <AmountTransaction>
                {getCurrency(currency)}$ {format2Digit(amount)} {type === "reward_user_lp" ? "spending" : "deducted"}
              </AmountTransaction>
            </Stack>
          </>
        </Info>
      </Wrapper>
      <WrapperRight>
        <Stack justifyContent={"space-between"} alignItems={"end"} height={"100%"}>
          <LP type={type}>
            {type === "reward_user_lp" ? "+" : "-"} {formatLP(point)} LP
          </LP>
          {!isMobile && (
            <Description>
              LP Balance:<LpRemaining sx={{ paddingLeft: 1 }}> {balance} LP</LpRemaining>
            </Description>
          )}
        </Stack>
        {isMobile && (
          <DescriptionMobile>
            <Box>LP Balance:</Box>
            <LpRemaining>{balance} LP</LpRemaining>
          </DescriptionMobile>
        )}
      </WrapperRight>
    </LPHistoryItemWrapper>
  );
};
