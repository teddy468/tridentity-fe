import { InfoCircleIcon, ProgressDoneIcon, ProgressNotDoneIcon, TicketCircleIcon } from "@/assets/icons";
import { URL_ADDRESS } from "@/commons/constants/apiUrl";
import useFetch from "@/commons/hooks/useFetch";
import { getMembershipColor, getMembershipType } from "@/commons/utils/getMembershipType";
import PreferenceDetail from "@/components/Profile/PersonalInformation/Preference-detail";
import ShippingAddressDetail from "@/components/Profile/PersonalInformation/Shipping-address-detail";
import UploadAvatar from "@/components/Profile/PersonalInformation/UploadAvatar";
import UserBadges from "@/components/Profile/PersonalInformation/UserBadge/UserBadges";
import Icon from "@/components/commons/Icon/Icon";
import { Box, ClickAwayListener, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import PersonalInformationDetail from "./Personal-information-detail";
import {
  BoxProgress,
  BoxProgressText,
  CompletionStatus,
  ContentRight,
  ContentWrapper,
  Detail,
  DetailRequire,
  FlexColumn,
  IconButton,
  PopoverItem2,
  ProfileCompletionWrapper,
  ProfileContent,
  StyledPopover,
  StyledRating,
  Text,
  Title,
  UploadAvatarWrapper,
  UserGradle,
  UserLP,
  Wrapper,
} from "./styles";
import { GradientText } from "@/components/commons/GradientText/GradientText";

const PersonalInformation: React.FC = () => {
  const { userInfo, userMembership, loyaltyPoint } = useSelector(({ user }: RootState) => user);

  const { data: addressInfos, refresh } = useFetch<AddressDefaultBody[]>(URL_ADDRESS);
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  // const { doneStep, requireStep } = useMemo(() => {
  //   let doneStep: number = 0;
  //   let requireStep = [];

  //   if (userInfo?.full_name) {
  //     doneStep++;
  //   } else {
  //     requireStep.push("Enter Your full name");
  //   }
  //   if (!!addressInfos && addressInfos?.length > 0) {
  //     doneStep++;
  //   } else {
  //     requireStep.push("Enter your shipping address");
  //   }
  //   if (userInfo?.date_of_birth) {
  //     doneStep++;
  //   } else {
  //     requireStep.push("Enter your date of birth");
  //   }
  //   if (userInfo?.gender) {
  //     doneStep++;
  //   } else {
  //     requireStep.push("Choose your gender");
  //   }

  //   if (userInfo?.phone) {
  //     doneStep++;
  //   } else {
  //     requireStep.push("Verify your phone number");
  //   }

  //   if (userInfo?.email) {
  //     doneStep++;
  //   } else {
  //     requireStep.push("Enter your email");
  //   }

  //   if (userInfo?.preferences?.length) {
  //     doneStep++;
  //   } else {
  //     requireStep.push("Let us know your preference");
  //   }
  //   return { doneStep, requireStep };
  // }, [userInfo, addressInfos]);

  const handleClick = (event: any) => {
    setOpenPopover(true);
  };

  const handleClose = () => {
    setOpenPopover(false);
  };

  return (
    <ProfileContent>
      {/* {doneStep < 7 && (
        <ProfileCompletionWrapper>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <Text>Complete your profile now to receive our amazing welcome gift!</Text>
            </Grid>
            <Grid item xs={12} md={5}>
              <BoxProgress>
                <BoxProgressText>
                  <Text sx={{ paddingRight: "6px" }}>{doneStep}/7 completed</Text>

                  <IconButton href={""} onMouseEnter={handleClick} onMouseLeave={handleClose} onClick={handleClick}>
                    <Icon sx={{ color: "white" }} icon={InfoCircleIcon} />
                    {openPopover && (
                      <StyledPopover onMouseLeave={handleClose}>
                        <ClickAwayListener onClickAway={handleClose}>
                          <PopoverItem2>
                            <Wrapper>
                              <FlexColumn>
                                <Detail>
                                  <span>Complete the following information to receive our welcome gift</span>
                                </Detail>

                                {requireStep.map((value, index) => {
                                  return (
                                    <DetailRequire key={index}>
                                      <TicketCircleIcon />
                                      <span style={{ marginLeft: "10px" }}>{value}</span>
                                    </DetailRequire>
                                  );
                                })}
                              </FlexColumn>
                            </Wrapper>
                          </PopoverItem2>
                        </ClickAwayListener>
                      </StyledPopover>
                    )}
                  </IconButton>
                </BoxProgressText>
                <StyledRating
                  name="read-only"
                  defaultValue={1}
                  value={doneStep}
                  precision={0.5}
                  max={7}
                  icon={<ProgressDoneIcon fontSize="inherit" />}
                  emptyIcon={<ProgressNotDoneIcon fontSize="inherit" />}
                  readOnly
                />
              </BoxProgress>
            </Grid>
          </Grid>
        </ProfileCompletionWrapper>
      )} */}

      <ContentWrapper>
        <ContentRight>
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <Title>{userInfo?.username}</Title>
            <UserGradle
              style={{
                background: getMembershipColor(userMembership?.level || 0),
              }}
            >
              {getMembershipType(userMembership?.level || 0)}
            </UserGradle>
            <UserBadges />
            {loyaltyPoint && loyaltyPoint.point > 0 && (
              <Box>
                <UserLP>
                  Current LP:{" "}
                  <Typography variant="body1" variantMapping={{ body1: "span" }}>
                    {loyaltyPoint?.point}
                  </Typography>
                </UserLP>
              </Box>
            )}
          </Box>
          {userInfo && <PersonalInformationDetail userInfo={userInfo}></PersonalInformationDetail>}
          {userInfo && <ShippingAddressDetail onUpdateAddress={refresh} />}
          {userInfo && <PreferenceDetail userInfo={userInfo} />}
        </ContentRight>
      </ContentWrapper>
    </ProfileContent>
  );
};

export default PersonalInformation;
