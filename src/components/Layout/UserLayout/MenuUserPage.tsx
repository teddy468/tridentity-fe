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
import { Box, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { MenuSubTitle, MenuTitle, StyledDrawer, StyledTab, StyledTabs } from "./styles";
import { TabLabelCustom, TabLabelCustomNoti } from "./UserLayout";

interface MenuUserPageProps {
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
}

const MenuUserPage = (props: MenuUserPageProps) => {
  const { openDrawer, setOpenDrawer } = props;
  const { newNotiCount } = useSelector(({ system }: RootState) => system);
  const { data: orderList } = useFetchList<OrderItem>(URL_ORDERS);
  const { data } = useFetch<UserInfo>(URL_USERS);

  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setOpenDrawer(false);
  };

  const handleClick = (event: React.SyntheticEvent) => {
    setOpenDrawer(false);
  };

  return (
    <StyledDrawer
      sx={{ zIndex: 9 }}
      PaperProps={{
        sx: {
          width: "100%",
          height: "100vh",
          maxHeight: "fill-available",
          overflow: "hidden",
          background: "linear-gradient(324deg, #0B0B0B 38.44%, #161A18 85.8%)",
          padding: "24px 24px 0px",
          boxSizing: "border-box",
        },
      }}
      anchor="left"
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
    >
      <Toolbar />
      <Toolbar />
      <MenuTitle>Hi, {data?.full_name}</MenuTitle>
      <MenuSubTitle>Thanks for being a Tridentity customer</MenuSubTitle>
      <StyledTabs
        onChange={handleChange}
        onClick={handleClick}
        orientation="vertical"
        aria-label="styled tabs example"
        TabIndicatorProps={{ style: { display: "none" } }}
        visibleScrollbar
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
          label={
            <TabLabelCustomNoti
              text={"Notification"}
              count={newNotiCount}
            />
          }
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
          sx={{display: 'none'}}
        />
        {/* ------------------------- */}
      </StyledTabs>
    </StyledDrawer>
  );
};

export default MenuUserPage;
