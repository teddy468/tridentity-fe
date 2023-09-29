import { ArrowLeftIcon } from "@/assets/icons";
import { FlexDivLeft, TitlePageDetail } from "@/components/Profile/styles";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import MenuUserPage from "../Layout/UserLayout/MenuUserPage";
import MyOrders from "./MyOrders";

export default function MyOrderComp() {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Box>
      <FlexDivLeft>
        <IconButton aria-label="back" onClick={() => setOpenDrawer(true)}>
          <ArrowLeftIcon />
        </IconButton>
        <TitlePageDetail>My Order</TitlePageDetail>
      </FlexDivLeft>
      <MyOrders />
      <MenuUserPage openDrawer={openDrawer} setOpenDrawer={handleDrawerToggle} />
    </Box>
  );
}
