import { ArrowLeftIcon } from "@/assets/icons";
import PersonalInformation from "@/components/Profile/PersonalInformation/Personal-information";
import { FlexDivLeft, TitlePageDetail } from "@/components/Profile/styles";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import MenuUserPage from "../Layout/UserLayout/MenuUserPage";

export default function Profile() {
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
        <TitlePageDetail>Personal Information</TitlePageDetail>
      </FlexDivLeft>
      <PersonalInformation />
      <MenuUserPage openDrawer={openDrawer} setOpenDrawer={handleDrawerToggle} />
    </Box>
  );
}
