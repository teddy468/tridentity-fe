import { ShoppingCartIcon, ShoppingCartIconActive } from "@/assets/icons";
import { HEADER_MENUS } from "@/commons/constants/menu";
import { routers } from "@/commons/constants/routers";
import { systemActions } from "@/redux/reducer/systemReducer";
import { useRouter } from "next/router";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CountNumber, IconButton, LoginButton, Menu, MenuItem } from "./styles";
import UserInfoPopover from "@/components/Layout/Header/HeaderMenu/UserInfoPopover";
import NotificationPopover from "@/components/Layout/Header/HeaderMenu/NotificationPopover";
import { formatNotifyNumber } from "@/commons/utils/formatNumber";
import { isManyNotification } from "@/utils/notificationHelper";

const HeaderMenu: FC = () => {
  const dispatch = useDispatch();
  const { userInfo, address } = useSelector((state: RootState) => state.user);
  const { carts } = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  const handlePopup = () => {
    dispatch(systemActions.setDisplayAuthModal("login"));
  };

  const cartLength = Object.values(carts).reduce(
    (sum, item) => sum + item[0].product_items.length,
    0
  );

  const getColor = (item: MenuItem) => {
    return router.pathname === item.link ? "#F4E85B" : "white";
  };

  return (
    <>
      <Menu>
        {HEADER_MENUS.map((item: MenuItem, index) => (
          <MenuItem key={index} href={item.link} color={getColor(item)}>
            {item.name}
          </MenuItem>
        ))}

        {userInfo && <NotificationPopover userInfo={userInfo} />}

        <IconButton href={routers.CART}>
          {router.pathname === routers.CART ? (
            <ShoppingCartIconActive />
          ) : (
            <ShoppingCartIcon />
          )}
          {!!cartLength && (
            <CountNumber isMany={isManyNotification(cartLength)}>
              {formatNotifyNumber(cartLength)}{" "}
            </CountNumber>
          )}
        </IconButton>
        {address ? (
          <UserInfoPopover userInfo={userInfo} />
        ) : (
          // <LoginButton onClick={handlePopup}>Login or Signup</LoginButton>
          <LoginButton onClick={handlePopup}>Connect wallet</LoginButton>
        )}
      </Menu>
    </>
  );
};

export default HeaderMenu;
