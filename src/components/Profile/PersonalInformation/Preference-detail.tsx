import * as React from "react";
import { useState } from "react";
import {
  CancelButton,
  EditPIButton,
  InfoGroup,
  LabelTitle,
  LabelValue,
  PersonalInformationHeading,
  PersonalInformationWrapper,
  SaveButton,
  TextPersonalLabel,
} from "./styles";
import { Box, Grid } from "@mui/material";
import Select, { OnChangeValue } from "react-select";
import makeAnimated from "react-select/animated";
import useFetch from "@/commons/hooks/useFetch";
import { Category } from "@/components/Categories/styles";
import { URL_CATEGORIES } from "@/commons/constants/apiUrl";
import { getUserInfoAsync, putUpdatePreferencesAsync } from "@/redux/saga/userSagas";
import { REGISTER } from "@/commons/constants/message";
import { useDispatch } from "react-redux";
import useToast from "@/commons/hooks/useToast";

interface Props {
  userInfo: UserInfoDto;
}

interface UserInfoDto {
  preferences?: CategoriesBe[];
}

interface CategoriesBe {
  id: number;
  name: string;
}

interface CategoriesFe {
  value: number;
  label: string;
}

function convertPreferences(preferenceListBe: CategoriesBe[]): CategoriesFe[] {
  return preferenceListBe?.map((preference, index) => {
    return {
      value: preference.id,
      label: preference.name,
    };
  });
}

function getPreferencesByIds(ids: number[], preferenceList: CategoriesFe[]) {
  const preferences = preferenceList.filter(preference => ids.includes(preference.value));
  const preferenceNames = preferences.map(preference => preference.label);
  return preferenceNames.join(", ").trim()
}

const animatedComponents = makeAnimated();
const PreferenceDetail: React.FC<Props> = ({ userInfo }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { data } = useFetch<Category[]>(URL_CATEGORIES);
  const preferenceListFe = data ? convertPreferences(data) : [];

  const [categories, setCategories] = useState<number[]>(
    userInfo?.preferences ? userInfo?.preferences.map(preference => preference.id) : []
  );

  const onChangeCategories = (newValue: OnChangeValue<CategoriesFe, true>) => {
    setCategories(newValue.map((preference: any) => preference.value));
  };

  const cancelEdit =  ()=> {
    setIsEdit(false)
    setCategories(userInfo?.preferences ? userInfo?.preferences.map(preference => preference.id) : [])
  }

  function onSaveCategories() {
    setIsEdit(false);

    dispatch(
      putUpdatePreferencesAsync({
        payload: { category_ids: categories },
        onSuccess: result => {
          toast.success("Update preferences success");
          setIsEdit(false);
          dispatch(getUserInfoAsync({ payload: undefined }));
          return console.log("update preferences success", result);
        },
        onError: (error: RegisterError) => {
          // setIsEdit(false);
          const message =
            typeof error?.error.message === "string"
              ? error?.error.message
              : typeof error?.error.message?.[0] === "string"
              ? error.error.message[0]
              : REGISTER.FAILED;
          toast.error(message);
        },
      })
    );
  }

  return (
    <PersonalInformationWrapper>
      {!isEdit && (
        <Box>
          <TextPersonalLabel>
            <span>Preference</span>
            <EditPIButton onClick={() => setIsEdit(true)}> Edit</EditPIButton>
          </TextPersonalLabel>

          <InfoGroup>
            <LabelTitle>Your expected categories to find on our platform</LabelTitle>
            <LabelValue>{(categories && categories.length > 0) ? getPreferencesByIds(categories, preferenceListFe) : "-"}</LabelValue>
          </InfoGroup>
        </Box>
      )}
      {isEdit && (
        <Box>
          <PersonalInformationHeading>
            <p>Preference</p>
            <CancelButton onClick={cancelEdit}>Cancel</CancelButton>
            <SaveButton onClick={onSaveCategories}>Save</SaveButton>
          </PersonalInformationHeading>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <LabelTitle>What do you expect to find on our platform?</LabelTitle>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                onChange={(event: any) => onChangeCategories(event)}
                defaultValue={
                  categories ? preferenceListFe.filter(preference => categories.includes(preference.value)) : []
                }
                isMulti
                options={preferenceListFe}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </PersonalInformationWrapper>
  );
};
export default PreferenceDetail;
