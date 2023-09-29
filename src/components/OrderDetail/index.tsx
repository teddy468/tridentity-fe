import { ArrowLeftIcon } from "@/assets/icons";
import { FlexDivLeft, TitlePageDetail } from "@/components/Profile/styles";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import * as React from "react";
import OrderDetail from "./OrderDetail";

export default function OrderDetailComp({ id }: { id: string }) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleBack = () => {
    router.push('/user/my-orders');
  };

  return (
    <Box>
      <FlexDivLeft onClick={handleBack}>
        <IconButton aria-label="back" onClick={() => handleDrawerToggle()}>
          <ArrowLeftIcon />
        </IconButton>
        <TitlePageDetail>Order details</TitlePageDetail>
      </FlexDivLeft>
      <OrderDetail id={id} />
    </Box>
  );
}
