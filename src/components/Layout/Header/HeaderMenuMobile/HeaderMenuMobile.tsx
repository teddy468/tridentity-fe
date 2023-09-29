import { HeaderSearchIcon, MenuIcon, ShoppingCartIcon } from "@/assets/icons";
import { routers } from "@/commons/constants/routers";
import Icon from "@/components/commons/Icon/Icon";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { CountNumber, IconButton, MenuMobileWrapper, StyledMenuIcon, StyledIcon } from "./styles";
import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { StyledHeaderLogo } from "../styles";
import { CloseOutlined } from "@mui/icons-material";
import styled from "@emotion/styled";
import { logoutAsync } from "@/redux/saga/userSagas";
import { systemActions } from "@/redux/reducer/systemReducer";
import HeaderSearch from "../HeaderSearch/HeaderSearch";
const LoginButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(94.22deg, #FDCD9D 0%, #F7EF82 100%)",
  borderRadius: 24,
  padding: "12px 24px",
  lineHeight: "16px",
  textTransform: "none",
  color: theme.palette.text.primary,
  fontWeight: 500,
  marginLeft: 10,
}));

const HeaderMenuMobile = () => {
  const router = useRouter();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { carts } = useSelector((state: RootState) => state.cart);
  const cartLength = Object.values(carts).reduce((sum, item) => sum + item[0].product_items.length, 0);
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpenMenu(open);
  };

  const toggleSearch = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpenSearch(open);
  };
  const handleLogout = async () => {
    await router.push(routers.HOME);
    dispatch(logoutAsync({ payload: null }));
  };

  const handlePopup = () => {
    dispatch(systemActions.setDisplayAuthModal("login"));
  };
  return (
    <>
      <MenuMobileWrapper>
        <StyledIcon
          onClick={() => setOpenSearch(true)}
          icon={HeaderSearchIcon}
          width={24}
          height={24}
          originWidth={21}
          originHeight={20}
        />
        <IconButton href={routers.CART} color={router.pathname === routers.CART ? "secondary" : "reverse"}>
          <Icon icon={ShoppingCartIcon} />
          {!!cartLength && <CountNumber>{cartLength} </CountNumber>}
        </IconButton>
        <StyledMenuIcon icon={MenuIcon} width={24} height={24} onClick={() => setOpenMenu(true)} />
      </MenuMobileWrapper>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            background: "linear-gradient(324deg, #0B0B0B 38.44%, #161A18 85.8%)",
            height: "100vh",
            padding: "20px",
          },
        }}
        anchor={"top"}
        open={openSearch}
        onClose={toggleSearch(false)}
      >
        <HeaderSearch onCloseIconClick={() => setOpenSearch(false)} />
      </Drawer>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            background: "linear-gradient(324deg, #0B0B0B 38.44%, #161A18 85.8%)",
          },
        }}
        anchor={"right"}
        open={openMenu}
        onClose={toggleDrawer(false)}
      >
        <Box display={"flex"} padding={"20px"} alignItems={"center"} justifyContent={"space-between"} color={"#fff"}>
          <StyledHeaderLogo onClick={() => router.push(routers.HOME)} />
          <CloseOutlined onClick={toggleDrawer(false)} />
        </Box>
        <Box
          sx={{
            width: "100vw",
            background: "transparent",
            color: "white",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  sx={{ color: router.pathname === routers.MARKETPLACE ? "#F4E85B" : "#fff" }}
                  primary={"Marketplace"}
                  onClick={() => router.push(routers.MARKETPLACE)}
                />
              </ListItemButton>
            </ListItem>

            {userInfo ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText
                      sx={{ color: router.pathname === routers.USER.NOTIFICATION ? "#F4E85B" : "#fff" }}
                      primary={"Notification"}
                      onClick={() => router.push(routers.USER.NOTIFICATION)}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText
                      sx={{ color: router.pathname === routers.USER.PROFILE ? "#F4E85B" : "#fff" }}
                      primary={"Profile"}
                      onClick={() => router.push(routers.USER.PROFILE)}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={"Logout"} onClick={handleLogout} />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <ListItem disablePadding>
                <LoginButton onClick={handlePopup}>Login or Signup</LoginButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default HeaderMenuMobile;
