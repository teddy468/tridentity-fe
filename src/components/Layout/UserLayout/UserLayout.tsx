import {
  FolderFavoriteWhiteIcon,
  LoyaltyWhiteIcon,
  MemberWhiteIcon,
  MyVoucherIcon,
  NotificationIcon,
  StructWhiteIcon,
  UserOctagonWhiteIcon,
} from "@/assets/icons";
import { URL_ORDERS, URL_USERS } from "@/commons/constants/apiUrl";
import { ON_GOING_ORDER_STATUS } from "@/commons/constants/order";
import { routers } from "@/commons/constants/routers";
import useFetch from "@/commons/hooks/useFetch";
import useFetchList from "@/commons/hooks/useFetchList";
import NotFoundPage from "@/components/commons/NotFoundPage/NotFoundPage";
import { Box, CssBaseline, Typography } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Content, FilterContainer, MenuSubTitle, MenuTitle, StyledContainer, StyledTab, StyledTabs } from "./styles";
import { formatNotifyNumber } from "@/commons/utils/formatNumber";

interface UserLayoutProps {
  children: React.ReactNode;
}

interface LabelCustomProps {
  text: string;
  count?: number;
}

export function TabLabelCustom({ text }: LabelCustomProps) {
  return (
    <React.Fragment>
      <span style={{ position: "absolute", left: "50px" }}> {text} </span>
    </React.Fragment>
  );
}

export function TabLabelCustomNoti({ text, count = 0 }: LabelCustomProps) {
  return (
    <React.Fragment>
      <Typography variant="h3" position={"absolute"} left={50} fontSize={14} fontWeight={500}>
        {text}
      </Typography>
      {count > 0 && (
        <Typography
          variant="caption"
          height={18}
          position={"absolute"}
          right={15}
          fontSize={10}
          fontWeight={500}
          bgcolor={"#F04438"}
          color={"white"}
          lineHeight={"12px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            width: count > 99 ? "auto" : 18,
            padding: count > 99 ? "0 4px" : null,
            borderRadius: count > 99 ? "10px" : "50%",
          }}
        >
          {formatNotifyNumber(count)}
        </Typography>
      )}
    </React.Fragment>
  );
}
const UserLayout = ({ children }: UserLayoutProps) => {
  const fetchDataRef = useRef(() => {});
  const { data, refresh } = useFetch<UserInfo>(URL_USERS);
  const { data: orderList } = useFetchList<OrderItem>(URL_ORDERS);
  const { user, initalized } = useSelector(({ user }: RootState) => user);

  fetchDataRef.current = () => {
    refresh();
  };
  const router = useRouter();

  useEffect(() => {
    refresh();
  }, [user]);

  if (initalized && !user) {
    return <NotFoundPage />;
  }

  const { newNotiCount } = useSelector(({ system }: RootState) => system);

  return (
    <StyledContainer>
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <CssBaseline />
        <Grid container>
          <FilterContainer xs={12} md={3}>
            <Box component="nav" sx={{ width: { md: "100%" }, flexShrink: { md: 0 } }} aria-label="mailbox folders">
              {/*Desktop*/}
              <Box sx={{ display: { xs: "none", md: "block" }, width: "100%", height: "100%" }}>
                <Box sx={{ with: "100%" }}>
                  <MenuTitle>Hi, {data?.full_name}</MenuTitle>
                  <MenuSubTitle>Thanks for being a Tridentity customer</MenuSubTitle>

                  <StyledTabs
                    onClick={undefined}
                    orientation="vertical"
                    TabIndicatorProps={{ style: { display: "none" } }}
                  >
                    <StyledTab
                      active={+router.pathname.includes(routers.USER.PROFILE)}
                      label={<TabLabelCustom text={"Personal Information"} />}
                      icon={<UserOctagonWhiteIcon />}
                      iconPosition="start"
                      onClick={() => router.push(routers.USER.PROFILE)}
                    />

                    <StyledTab
                      active={+router.pathname.includes(routers.USER.NOTIFICATION)}
                      label={<TabLabelCustomNoti text={"Notifications"} count={newNotiCount} />}
                      icon={<NotificationIcon />}
                      iconPosition="start"
                      onClick={() => router.push(routers.USER.NOTIFICATION)}
                    />
                    <StyledTab
                      active={+router.pathname.includes(routers.USER.MY_ORDERS)}
                      label={
                        <TabLabelCustomNoti
                          text={"My Order"}
                          count={orderList.filter(order => ON_GOING_ORDER_STATUS.includes(order.status)).length}
                        />
                      }
                      icon={<StructWhiteIcon />}
                      iconPosition="start"
                      onClick={() => router.push(routers.USER.MY_ORDERS)}
                    />

                    <StyledTab
                      active={+router.pathname.includes(routers.USER.LOYALTY_POINTS)}
                      label={<TabLabelCustom text={"Loyalty Points"} />}
                      icon={<LoyaltyWhiteIcon />}
                      iconPosition="start"
                      onClick={() => router.push(routers.USER.LOYALTY_POINTS)}
                    />

                    <StyledTab
                      active={+router.pathname.includes(routers.USER.MEMBERSHIP)}
                      label={<TabLabelCustom text={"Membership"} />}
                      icon={<MemberWhiteIcon />}
                      iconPosition="start"
                      onClick={() => router.push(routers.USER.MEMBERSHIP)}
                    />

                    <StyledTab
                      active={+router.pathname.includes(routers.USER.FAVOURITE)}
                      label={<TabLabelCustom text={"Favorites"} />}
                      icon={<FolderFavoriteWhiteIcon />}
                      iconPosition="start"
                      onClick={() => router.push(routers.USER.FAVOURITE)}
                    />
                    {/* Temporary disable for now */}
                    <StyledTab
                      active={+router.pathname.includes(routers.USER.VOUCHER)}
                      label={<TabLabelCustom text={"Vouchers"} />}
                      icon={<MyVoucherIcon />}
                      iconPosition="start"
                      onClick={() => router.push(routers.USER.VOUCHER)}
                      sx={{ display: "none" }}
                    />
                    {/* ------------------------- */}
                  </StyledTabs>
                </Box>
              </Box>
            </Box>
          </FilterContainer>
          <Grid xs={12} md={9} borderLeft={"1px solid #4E4E54"}>
            {/*Tab content*/}
            <Content>{children}</Content>
          </Grid>
        </Grid>
      </Box>
    </StyledContainer>
  );
};

export default UserLayout;
