import * as React from "react";
import { useEffect, useState } from "react";
import {
  ContentLeft,
  EditImageButton,
  ModalTitle,
  StyledInput,
  StyledModal,
  Container,
  TabContainer,
  FormAction,
  AvatarOption,
  UserAvatarWrapper,
  UserAvatar,
  ButtonWrapper,
} from "./styles";
import { AxiosError, AxiosResponse } from "axios";
import { uploadSingleFile } from "@/redux/requests/storageRequest";
import useToast from "@/commons/hooks/useToast";
import useLoading from "@/commons/hooks/useLoading";
import { getUserInfoAsync, postUserAsync } from "@/redux/saga/userSagas";
import { useDispatch, useSelector } from "react-redux";
import CustomTabs from "@/components/commons/CustomTabs/CustomTabs";
import { BorderGradientButton } from "@/components/commons/GradientButton/BorderGradientButton";
import { GradientButton } from "@/components/commons/GradientButton/GradientButton";
import { GradientText } from "@/components/commons/GradientText/GradientText";
import useFetch from "@/commons/hooks/useFetch";
import { getMembershipType } from "@/commons/utils/getMembershipType";
import useAvatar from "@/commons/hooks/useAvatar";

const tabs = [
  { key: 0, label: "Profile Picture" },
  { key: 1, label: "Avatar" },
];

const UploadAvatar = () => {
  const { userInfo, userMembership } = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [thumbnail, setThumbnail] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [selected, setSelected] = useState<string>(userInfo?.avatar || "");
  const { data } = useFetch<MembershipAvatar[]>("user-memberships/avatars");
  const avatars = data?.filter(item => item.tier <= (userMembership?.level || 0)) || [];
  const toast = useToast();
  const loadSc = useLoading();
  const dispatch = useDispatch();
  const { avatar, getAvatar, getMembershipAvatar } = useAvatar();

  useEffect(() => {
    if (userInfo && userInfo.avatar) {
      if (avatars.length <= 1 && activeTab === 1) {
        setSelected(getMembershipAvatar(0));
      } else {
        userInfo.avatar !== "" ? setSelected(userInfo.avatar) : setSelected(getMembershipAvatar(0));
      }
    } else {
      setSelected(getMembershipAvatar(0));
    }
  }, [userInfo?.avatar, activeTab]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file || null);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else setThumbnail("");
  };

  const handleClose = () => {
    setThumbnail("");
    setFile(null);
    setOpen(false);
    setSelected(userInfo?.avatar || "");
  };

  const uploadAvatar = async (): Promise<string> => {
    if (!file) return "";
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response: AxiosResponse<UploadFileResponse> = await uploadSingleFile(formData);
      return response.data.file_url;
    } catch (err: any) {
      const error = (err as AxiosError<any>)?.response?.data;
      const message =
        typeof error?.error.message === "string"
          ? error?.error.message
          : typeof error?.error.message?.[0] === "string"
          ? error.error.message[0]
          : "Cannot update avatar";
      toast.error(message);
      return "";
    }
  };

  const handleUpdate = async (avatar: string) => {
    if (!avatar) return;

    loadSc.show();
    const newUserInfo = { ...userInfo, avatar };
    dispatch(
      postUserAsync({
        payload: newUserInfo,
        onSuccess: result => {
          toast.success("Update avatar success");
          dispatch(
            getUserInfoAsync({
              payload: undefined,
              onSuccess: () => {
                loadSc.hide();
                handleClose();
              },
              onError: () => {
                loadSc.hide();
              },
            })
          );
        },
        onError: (error: LoginError) => {
          setThumbnail("");
          toast.error("Update avatar error");
          loadSc.hide();
          return console.log("Post user error", error);
        },
      })
    );
  };

  const onSave = async () => {
    const avatar = await uploadAvatar();
    handleUpdate(avatar);
  };

  const handleChangeTab = (tab: number) => {
    setThumbnail("");
    setActiveTab(tab);
  };

  return (
    <ContentLeft>
      <UserAvatarWrapper>
        <UserAvatar src={avatar} />
      </UserAvatarWrapper>
      <EditImageButton onClick={() => setOpen(true)}>
        <GradientText>Edit profile picture</GradientText>
      </EditImageButton>
      <StyledModal open={open} onClose={handleClose}>
        <Container>
          <ModalTitle>Choose Avatar</ModalTitle>
          <CustomTabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={handleChangeTab}
            contentProps={{ sx: { marginTop: 2 } }}
          >
            {!activeTab ? (
              <TabContainer>
                <UserAvatarWrapper>
                  <UserAvatar src={thumbnail || avatar} />
                </UserAvatarWrapper>
                <EditImageButton onClick={() => setOpen(true)}>
                  <GradientText>Upload your picture</GradientText>
                  <StyledInput size="small" type="file" inputProps={{ accept: "image/*" }} onChange={handleChange} />
                </EditImageButton>
              </TabContainer>
            ) : (
              <TabContainer gap={5}>
                {avatars.map(item => {
                  return (
                    <AvatarOption key={item.tier}>
                      <UserAvatarWrapper
                        onClick={() => setSelected(getMembershipAvatar(item.tier))}
                        sx={{ cursor: "pointer" }}
                      >
                        <UserAvatar src={item.data} />
                      </UserAvatarWrapper>
                      <ButtonWrapper>
                        {selected === getMembershipAvatar(item.tier) ? (
                          <GradientButton>{getMembershipType(item.tier)} Avatar</GradientButton>
                        ) : (
                          <BorderGradientButton
                            sx={{ margin: 0 }}
                            onClick={() => setSelected(getMembershipAvatar(item.tier))}
                          >
                            <GradientText>{getMembershipType(item.tier)} Avatar</GradientText>
                          </BorderGradientButton>
                        )}
                      </ButtonWrapper>
                    </AvatarOption>
                  );
                })}
              </TabContainer>
            )}
          </CustomTabs>
          <FormAction>
            <BorderGradientButton sx={{ marginBottom: 0 }} onClick={handleClose}>
              <GradientText>Cancel</GradientText>
            </BorderGradientButton>
            <GradientButton onClick={() => (activeTab ? handleUpdate(selected) : onSave())}>Confirm</GradientButton>
          </FormAction>
        </Container>
      </StyledModal>
    </ContentLeft>
  );
};

export default UploadAvatar;
