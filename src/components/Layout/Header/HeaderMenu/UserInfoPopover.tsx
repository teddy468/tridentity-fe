import * as React from "react";
import {
  PopoverItem,
  StyledPopover,
  UserAvatar,
  UserAvatarWrapper,
  UserButton,
} from "@/components/Layout/Header/HeaderMenu/styles";
import { ArrowDownIcon } from "@/assets/icons";
import { routers } from "@/commons/constants/routers";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "@/redux/saga/userSagas";
import { useRouter } from "next/router";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import useAvatar from "@/commons/hooks/useAvatar";
import { ellipseAddress } from "@/utils/dataHelper";

interface Props {
  userInfo: any;
}

const UserInfoPopover: React.FC<Props> = ({ userInfo }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { avatar } = useAvatar();

  const { address } = useSelector((state: RootState) => state.user);

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRedirect = (link: string) => {
    router.push(link);
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await router.push(routers.HOME);
    dispatch(logoutAsync({ payload: null }));
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <UserButton onClick={handleClick}>
        <UserAvatarWrapper>
          <UserAvatar src={avatar} />
        </UserAvatarWrapper>
        {/* {userInfo?.username} */}
        {ellipseAddress(address as string, 4, 4)}
        <ArrowDownIcon />
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
            <div>
              <PopoverItem onClick={() => handleRedirect(routers.USER.PROFILE)}>
                Profile setting
              </PopoverItem>
              <PopoverItem onClick={handleLogout}>
                Disconnect wallet
              </PopoverItem>
            </div>
          </ClickAwayListener>
        </StyledPopover>
      </UserButton>
    </>
  );
};

export default UserInfoPopover;
