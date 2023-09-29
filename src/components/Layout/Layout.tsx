import CheckoutResultModal from "@/components/Form/CheckoutResult/CheckoutResultModal";
import LoadingScreen from "@/components/Form/Loading/LoadingScreen";
import LoginForm from "@/components/Form/LoginForm/LoginForm";
import { systemActions } from "@/redux/reducer/systemReducer";
import { userActions } from "@/redux/reducer/userReducer";
import themes from "@/themes";
import { ThemeProvider } from "@mui/material";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatIcon from "../commons/ChatPopup/ChatIcon";
import ChatPopup from "../commons/ChatPopup/ChatPopup";
import QuickAddCart from "../commons/QuickAddCart/QuickAddCart";
import QuickUpdateCartModal from "../commons/QuickUpdateCart/QuickUpdateCart";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import SystemLoader from "./SystemLoader/SystemLoader";
import ToastContainer from "./ToastContainer/ToastContainer";
import { Wrapper } from "./styles";
import ClearCartWarning from "../Form/ClearCartWarning/ClearCartWarning";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { theme, onStoreChat, user, userInfo } = useSelector(({ user }: RootState) => user);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const ref = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) return dispatch(systemActions.setDisplayAuthModal("login"));
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(userActions.setonStoreChat(null));
  };

  useEffect(() => {
    if (onStoreChat && ref.current) setAnchorEl(ref.current);
  }, [onStoreChat]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <ThemeProvider theme={themes[theme]}>
      <Wrapper>
        <Header />
        {children}
        <Footer />
        {/* Disable chat function */}
        {/* <ChatButton onClick={handleClick} ref={ref}>
          <ChatIcon />
        </ChatButton>
        {userInfo?.id && <ChatPopup id={id} handleClose={handleClose} open={open} anchorEl={anchorEl} />} */}
        <LoginForm />
        <QuickAddCart />
        <QuickUpdateCartModal />
        <ToastContainer />
        <SystemLoader />
        <LoadingScreen />
        <CheckoutResultModal />
        <ClearCartWarning />
      </Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
