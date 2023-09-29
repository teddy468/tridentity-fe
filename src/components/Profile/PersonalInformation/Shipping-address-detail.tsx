import { TickSquareBoldIcon, TickSquareIcon, TrashIcon } from "@/assets/icons";
import { GOOGLE_MAPS_API_KEY } from "@/commons/constants";
import { URL_ADDRESS } from "@/commons/constants/apiUrl";
import { ADDRESS, ADDRESS_NAME, COUNTRY, LANDMARK, POSTAL_CODE } from "@/commons/constants/message";
import { POSTAL_CODE_PATTERN } from "@/commons/constants/user";
import useFetch from "@/commons/hooks/useFetch";
import useToast from "@/commons/hooks/useToast";
import PlacesAutoComplete, { Option } from "@/components/Map/PlacesAutoComplete";
import NumericFormatCustom from "@/components/commons/CustomNumberInput/CustomNumberInput";
import { deleteUserShippingAddress } from "@/redux/requests/userRequests";
import { postDefaultAddressAsync, putDefaultAddressAsync } from "@/redux/saga/userSagas";
import { Box, Checkbox, Grid, Typography } from "@mui/material";
import { useLoadScript } from "@react-google-maps/api";
import { AxiosError, AxiosResponse } from "axios";
import * as React from "react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { LatLng } from "use-places-autocomplete";
import CustomInput from "./CustomInput";
import {
  ButtonContainer,
  CancelButton,
  CheckboxLabel,
  CheckboxWrapper,
  EditPIButton,
  FormContent,
  IconWrapper,
  InfoGroup,
  LabelTitle,
  LabelValue,
  LabelWrapper,
  PersonalInformationHeading,
  PersonalInformationWrapper,
  SaveButton,
  TextPersonalLabel,
} from "./styles";
import { isMobile } from "react-device-detect";

interface Props {
  onUpdateAddress: () => void;
}

type Library = ["places" | "drawing" | "geometry" | "localContext" | "visualization"];

const libraries: Library = ["places"];

const ShippingAddressDetail: React.FC<Props> = ({ onUpdateAddress }) => {
  const toast = useToast();
  const { data: addressInfos, loading, refresh } = useFetch<AddressDefaultBody[]>(URL_ADDRESS);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddressDefaultBody>({
    mode: "onChange",
  });

  const defaultAddress: AddressDefaultBody | null = useMemo(() => {
    if (addressInfos) {
      const defaultAddress = addressInfos.find(add => add.status === 1 && add.is_default);
      if (defaultAddress) {
        return defaultAddress;
      }
    }
    return null;
  }, [addressInfos]);

  const otherSaveAddress: AddressDefaultBody[] = useMemo(() => {
    if (addressInfos) {
      const otherAddress = addressInfos.filter(add => add.status === 1 && !add.is_default);
      if (otherAddress) {
        return otherAddress;
      }
    }
    return [];
  }, [addressInfos]);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [buttonTitle, setButtonTitle] = useState<string>();
  const [isDefault, setIsDefault] = useState(true);

  //Select a position that is suggested by google map on the selector
  //Update this position to google map UI
  const [selectedAddress, setSelectedAddress] = useState<LatLng | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [address, setAddress] = useState<Option | undefined>();
  const [addressErrorMessage, setAddressErrorMessage] = useState<string | undefined>();

  const dispatch = useDispatch();

  const onSubmit = async (values: AddressDefaultBody) => {
    values.is_default = isDefault;

    if (!selectedAddress) return setAddressErrorMessage("Address is required");

    values.coordinate = {
      lat: selectedAddress.lat.toString(),
      lng: selectedAddress.lng.toString(),
    };

    if (values.id) {
      dispatch(
        putDefaultAddressAsync({
          payload: values,
          onSuccess: result => {
            setIsEdit(false);
            toast.success("Update Default Address Success");
            refresh();
            onUpdateAddress();
          },
          onError: (error: LoginError) => {
            toast.success("Update Default Address Error");
            return console.log("Update Default Address Error", error);
          },
        })
      );
    } else {
      dispatch(
        postDefaultAddressAsync({
          payload: values,
          onSuccess: result => {
            toast.success("Create Default Address Success");
            setIsEdit(false);
            onUpdateAddress();
            refresh();
          },
          onError: (error: LoginError) => {
            toast.error("Create Default Address Error");
            return console.log("Post user error", error);
          },
        })
      );
    }
  };

  const handleChangeAddress = (newAddress: Option | null): void => {
    setValue("address", newAddress === null ? "" : newAddress.label);
    setAddress({ label: newAddress === null ? "" : newAddress.label, value: "" });

    if (!newAddress || newAddress.label === "") {
      setAddressErrorMessage("Address is required");
    } else {
      setAddressErrorMessage("");
    }
  };

  const setEditAddress = (address: AddressDefaultBody | null) => {
    setIsEdit(true);

    if (address) {
      setAddress({ label: address.address, value: "" });
      setValue("landmark", address.landmark, { shouldValidate: true });
      setValue("country", address.country, { shouldValidate: true });
      setValue("postal_code", address.postal_code, { shouldValidate: true });
      setValue("id", address.id, { shouldValidate: true });
      setValue("address_type", address.address_type);
      setValue("address", address.address, { shouldValidate: true });
      setIsDefault(address.is_default);
      setButtonTitle("Update address");

      if (address.coordinate)
        setSelectedAddress({ lat: Number(address.coordinate.lat), lng: Number(address.coordinate.lng) });
    } else {
      reset();
      setAddress(undefined);
      setIsDefault(true);
      setSelectedAddress(null);
      setButtonTitle("Create new address");
    }
  };

  const deleteAddress = async (id: number) => {
    if (!id) {
      return;
    }
    try {
      const res: AxiosResponse | AxiosError = await deleteUserShippingAddress(id);
      if (res.status === 200) {
        toast.success("Delete Address Success");
        onUpdateAddress();
        refresh();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || error?.response?.data?.error);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  const renderAddress = (address: AddressDefaultBody) => {
    if (address.address_type) {
      return `${address.address_type}, ${address.address}`;
    }
    return address.address;
  };

  return (
    <PersonalInformationWrapper>
      {!isEdit && (
        <Box>
          <TextPersonalLabel>
            <Typography>Shipping address</Typography>
            <EditPIButton onClick={() => setEditAddress(null)}> Add new address</EditPIButton>
          </TextPersonalLabel>
          <InfoGroup>
            <LabelTitle>Default Address</LabelTitle>
            <LabelWrapper>
              <LabelValue>{defaultAddress && renderAddress(defaultAddress)}</LabelValue>
              {defaultAddress && (
                <>
                  <EditPIButton onClick={() => setEditAddress(defaultAddress)}> Edit</EditPIButton>
                  <IconWrapper onClick={() => defaultAddress.id && deleteAddress(defaultAddress.id)}>
                    <TrashIcon />
                  </IconWrapper>
                </>
              )}
            </LabelWrapper>
          </InfoGroup>
          <InfoGroup>
            <LabelTitle>Save address</LabelTitle>
            {otherSaveAddress.map((saveAddress, index) => {
              return (
                <LabelWrapper>
                  <LabelValue key={index}>{saveAddress && renderAddress(saveAddress)}</LabelValue>
                  <EditPIButton onClick={() => setEditAddress(saveAddress)}> Edit</EditPIButton>
                  <IconWrapper onClick={() => saveAddress.id && deleteAddress(saveAddress.id)}>
                    <TrashIcon />
                  </IconWrapper>
                </LabelWrapper>
              );
            })}
          </InfoGroup>
        </Box>
      )}
      {isEdit && (
        <FormContent onSubmit={handleSubmit(onSubmit)}>
          <CustomInput sx={{ display: "none" }} {...register("id")} />
          <PersonalInformationHeading>
            <Typography>Shipping address</Typography>
            <ButtonContainer>
              <CancelButton onClick={() => setIsEdit(false)}>Cancel</CancelButton>
              <SaveButton type="submit">{isMobile ? "Save" : buttonTitle}</SaveButton>
            </ButtonContainer>
          </PersonalInformationHeading>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <LabelTitle>Name</LabelTitle>
              <Controller
                control={control}
                name="address_type"
                render={({ field }) => <CustomInput {...field} size="small" placeholder="e.g. Gym, School " />}
                rules={{ required: ADDRESS_NAME.REQUIRED }}
              />
            </Grid>
            <Grid item xs={12}>
              <LabelTitle>Address*</LabelTitle>
              <Controller
                control={control}
                name="address"
                render={({ field }) => (
                  <PlacesAutoComplete
                    {...field}
                    setSelected={setSelectedAddress}
                    defaultValue={address}
                    onChange={value => handleChangeAddress(value)}
                    errorMessage={errors.address?.message}
                    placeholder="Address Line"
                    reset={setValue}
                  />
                )}
                rules={{
                  required: ADDRESS.REQUIRED,
                }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <LabelTitle>Delivery to*</LabelTitle>
              <Controller
                control={control}
                name="landmark"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    size="small"
                    placeholder="e.g. Floor, unit number"
                    errorMessage={errors.landmark?.message}
                  />
                )}
                rules={{ required: LANDMARK.REQUIRED }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <LabelTitle>Country*</LabelTitle>
              <Controller
                control={control}
                name="country"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    size="small"
                    errorMessage={errors.country?.message}
                    defaultValue="Singapore"
                  />
                )}
                rules={{
                  required: COUNTRY.REQUIRED,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LabelTitle>Postal code*</LabelTitle>
              <Controller
                control={control}
                name="postal_code"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    size="small"
                    placeholder="Postal code"
                    InputProps={{ inputComponent: NumericFormatCustom as any }}
                    errorMessage={errors.postal_code?.message}
                  />
                )}
                rules={{
                  required: POSTAL_CODE.REQUIRED,
                  pattern: { value: POSTAL_CODE_PATTERN, message: POSTAL_CODE.FORMAT },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CheckboxWrapper>
                <Checkbox
                  icon={<TickSquareIcon />}
                  checkedIcon={<TickSquareBoldIcon />}
                  checked={isDefault}
                  onChange={(event, checked) => setIsDefault(checked)}
                />
                <CheckboxLabel>Mark as default address</CheckboxLabel>
              </CheckboxWrapper>
            </Grid>
          </Grid>
        </FormContent>
      )}
    </PersonalInformationWrapper>
  );
};

export default ShippingAddressDetail;
