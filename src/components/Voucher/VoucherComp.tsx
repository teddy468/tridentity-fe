import { ArrowLeftIcon } from "@/assets/icons";
import { FlexDivLeft, TitlePageDetail } from "@/components/Profile/styles";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { Voucher } from ".";
import MenuUserPage from "../Layout/UserLayout/MenuUserPage";

export default function VoucherComp() {
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
        <TitlePageDetail>Vouchers</TitlePageDetail>
      </FlexDivLeft>
      <Voucher />
      <MenuUserPage openDrawer={openDrawer} setOpenDrawer={handleDrawerToggle} />
    </Box>
  );
}
