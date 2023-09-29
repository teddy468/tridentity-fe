import { GENDER_OPTIONS } from "@/commons/constants/user";
import { convertIsoDateToDDMMYYYY } from "@/commons/utils/dateTimeHelper";
import { Box, Grid } from "@mui/material";
import * as React from "react";
import { InfoGroup, LabelTitle, LabelValue, PersonalInformationWrapper, TextPersonalLabel } from "./styles";

interface Props {
  userInfo: UserInfo;
}

const getGender = (value: number): string => {
  const gender = GENDER_OPTIONS.find(option => option.value == value);

  return gender ? gender.label : "-";
};

const PersonalInformationDetail: React.FC<Props> = ({ userInfo }) => {
  const gender = userInfo.gender || 0;
  const dob = userInfo.date_of_birth;

  const handleField = (field: string) => {
    return field ? field : "-";
  };

  return (
    <PersonalInformationWrapper>
      <Box>
        <TextPersonalLabel>
          <span>Your personal information</span>
        </TextPersonalLabel>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <InfoGroup>
              <LabelTitle>Full name</LabelTitle>
              <LabelValue>{handleField(userInfo.full_name)}</LabelValue>
            </InfoGroup>
            <InfoGroup>
              <LabelTitle>Date of Birth</LabelTitle>
              <LabelValue>{dob ? convertIsoDateToDDMMYYYY(dob) : "-"}</LabelValue>
            </InfoGroup>
            <InfoGroup>
              <LabelTitle>Gender</LabelTitle>
              <LabelValue>{getGender(gender)}</LabelValue>
            </InfoGroup>
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoGroup>
              <LabelTitle>Phone Number</LabelTitle>
              <LabelValue>{handleField(userInfo.phone)}</LabelValue>
            </InfoGroup>
            <InfoGroup>
              <LabelTitle>Email</LabelTitle>
              <LabelValue>{handleField(userInfo.email)}</LabelValue>
            </InfoGroup>
          </Grid>
        </Grid>
      </Box>
    </PersonalInformationWrapper>
  );
};

export default PersonalInformationDetail;
