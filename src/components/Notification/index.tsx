import { ArrowLeftIcon } from "@/assets/icons";
import { FlexDivLeft, TitlePageDetail } from "@/components/Profile/styles";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import MenuUserPage from "../Layout/UserLayout/MenuUserPage";
import Notification from './Notification';

export default function NotificationComp() {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleDrawerToggle = (value: boolean) => {
    setOpenDrawer(value);
  };

  return (
    <Box>
      <FlexDivLeft>
        <IconButton aria-label="back" onClick={() => setOpenDrawer(true)}>
          <ArrowLeftIcon />
        </IconButton>
        <TitlePageDetail >Notifications</TitlePageDetail>
      </FlexDivLeft>
      <Notification />
      <MenuUserPage openDrawer={openDrawer} setOpenDrawer={handleDrawerToggle} />
    </Box>
  );
}
