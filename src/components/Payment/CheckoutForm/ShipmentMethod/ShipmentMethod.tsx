import { ArrowDownIcon, PlusCircleFillIcon } from "@/assets/icons";
import { URL_ADDRESS, URL_MERCHANT_STORE_ADDRESS } from "@/commons/constants/apiUrl";
import { SHIPMENT_METHOD } from "@/commons/constants/order";
import useFetch from "@/commons/hooks/useFetch";
import useFetchList from "@/commons/hooks/useFetchList";
import { GradientText } from "@/components/commons/GradientText/GradientText";
import { getShippingDetailSync } from "@/redux/saga/cartSagas";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import { UseFormReturn } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  AddressOptions,
  AddressOptionsDesktop,
  AddressSelect,
  AddressSelectDesktop,
  AddressShow,
  AddressShowDivider,
  AddressShowWrapper,
  ArrowWrapper,
  CheckoutContainer,
  CheckoutWrapperDesktop,
  CustomRadio,
  ErrorMessage,
  PickupOptions,
  PickupSelectDesktop,
  PickupSelectMobile,
  PickupText,
  PlusCircleFillIconWrapper,
  Title,
  TitleDesktop,
  TitleRegion,
  UserAddress,
  UserAddressText,
  UserInfoDefault,
  UserInfoDefaultDesktop,
} from "../styles";
import NewAddressForm from "./NewAddressForm";

type Props = {
  form: UseFormReturn<CreateOrderValues, any>;
  currentStore: CartItem | null;
};

const ShipmentMethod = ({ form, currentStore }: Props) => {
  const [selected, setSelected] = useState<number | "new">("new");
  const [grabError, setGrabError] = useState("");
  const [seeMore, setSeeMore] = useState(false);
  const { userInfo } = useSelector(({ user }: RootState) => user);

  const { data: address } = useFetchList<MerchantAddress>(
    currentStore ? URL_MERCHANT_STORE_ADDRESS(currentStore.store.id) : ""
  );

  const { data: userAddresses, refresh } = useFetch<AddressItem[]>(URL_ADDRESS);

  const dispatch = useDispatch();

  const { register, watch, setValue, trigger } = form;

  const onAddressCreated = (id: AddressItem["id"]) => {
    setSelected(id);
    refresh();
  };

  useEffect(() => {
    if (!currentStore) setValue("shipment_method", SHIPMENT_METHOD.DELIVERY);
  }, [currentStore]);

  const storeAddresses = useMemo(() => {
    if (!currentStore?.merchant_store_id) {
      setValue("merchant_store_address_id", "");
      return [];
    }
    const storeSelectedAddresses = address.filter(item => item.merchant_store_id === currentStore.merchant_store_id);
    setValue("merchant_store_address_id", storeSelectedAddresses[0]?.id.toString() || "", { shouldValidate: true });

    return storeSelectedAddresses;
  }, [address, currentStore?.merchant_store_id]);

  const defaultAddress = userAddresses?.find(item => item.status === 1 && item.is_default);
  const otherAddresses = userAddresses?.filter(item => item.status === 1 && !item.is_default);

  const isDelivery = watch("shipment_method") === SHIPMENT_METHOD.DELIVERY;
  const storeAddress = watch("merchant_store_address_id");

  useEffect(() => {
    if (selected === "new" && defaultAddress?.id) setSelected(defaultAddress.id);
  }, [defaultAddress]);

  useEffect(() => {
    setGrabError("");
    setValue("loading.shippingFee", true, { shouldValidate: true });
    const currentStoreAddress = storeAddresses.find(item => item.id.toString() === storeAddress);
    const userAddress = userAddresses?.find(item => item.id === selected);

    if (!isDelivery || !currentStoreAddress || !userAddress) {
      setValue("distance", 0, { shouldValidate: true });
      return setValue("shippingFee", 0, { shouldValidate: true });
    }

    const storeLocation = { coordinate: currentStoreAddress.coordinate, address: currentStoreAddress.address };
    const userLocation = { coordinate: userAddress.coordinate, address: userAddress.address };

    const body = {
      time: new Date(),
      locations: [storeLocation, userLocation],
    };

    dispatch(
      getShippingDetailSync({
        payload: body,
        onSuccess: res => {
          setValue("recipient_address", Number(userAddress.id));
          setValue("shippingFee", Number(res.price), { shouldValidate: true });
          setValue("distance", res.distance, { shouldValidate: true });
          setValue("loading.shippingFee", false, { shouldValidate: true });
        },
        onError: error => {
          console.log({ error });
          setValue("loading.shippingFee", false, { shouldValidate: true });
          setValue("shippingFee", 0, { shouldValidate: true });
          setValue("distance", 0, { shouldValidate: true });
          setGrabError("Cannot get shipping fee");
        },
      })
    );
  }, [userAddresses, storeAddresses, selected, storeAddress, isDelivery]);

  useEffect(() => {
    if (selected === "new") {
      setValue("shippingFee", 0, { shouldValidate: true });
      setValue("distance", 0, { shouldValidate: true });
    } else {
      trigger(["shippingFee"]);
    }
  }, [isDelivery, selected]);

  useEffect(() => {
    const userAddress = userAddresses?.find(item => item.id === selected);
    if (isDelivery && userInfo && userAddress) {
      // Hard code for demo only, have to change back to `+${userInfo.phone}`
      setValue("recipient.phone", `+6512345678`, { shouldValidate: true });
      setValue("recipient.name", userInfo.full_name || userInfo.username, { shouldValidate: true });
    } else {
      setValue("recipient", undefined, { shouldValidate: true });
    }
  }, [isDelivery, selected, userAddresses]);

  const renderDefaultAddress = () => {
    return (
      selected === defaultAddress?.id && (
        <UserInfoDefault>
          <Box>{defaultAddress.address_type}</Box>
          <UserAddress>
            <UserAddressText>{defaultAddress?.address}</UserAddressText>
            <UserAddressText>{defaultAddress?.landmark}</UserAddressText>
            <UserAddressText>
              {defaultAddress?.country}, {defaultAddress?.postal_code}
            </UserAddressText>
          </UserAddress>
        </UserInfoDefault>
      )
    );
  };

  const renderAddress = () => {
    if (isDelivery) {
      return (
        <AddressSelect>
          <AddressOptions>
            <CustomRadio
              color="secondary"
              checked={selected === defaultAddress?.id}
              onChange={() => defaultAddress && setSelected(defaultAddress?.id)}
              disabled={!defaultAddress}
            />
            Default address
          </AddressOptions>
          {renderDefaultAddress()}
          {otherAddresses?.map((address, index) => {
            const isSelected = selected === address.id;
            return (
              <React.Fragment key={index}>
                <AddressOptions>
                  <CustomRadio color="secondary" checked={isSelected} onChange={() => setSelected(address.id)} />
                  {address.address}
                </AddressOptions>
                {isSelected && (
                  <UserInfoDefault>
                    <UserAddress>
                      <UserAddressText>{address?.address}</UserAddressText>
                    </UserAddress>
                  </UserInfoDefault>
                )}
              </React.Fragment>
            );
          })}
          <Box position={"relative"}>
            <AddressOptions>
              <CustomRadio color="secondary" checked={selected === "new"} onChange={() => setSelected("new")} />
              <PlusCircleFillIconWrapper>
                <PlusCircleFillIcon />
              </PlusCircleFillIconWrapper>
              New address
            </AddressOptions>
          </Box>
          {selected === "new" && <NewAddressForm currentStore={currentStore} onSubmit={onAddressCreated} />}
        </AddressSelect>
      );
    }
    return (
      <AddressSelect>
        {storeAddresses.map(item => (
          <AddressOptions key={item.id}>
            <CustomRadio
              color="secondary"
              checked={storeAddress === item.id.toString()}
              onChange={() => setValue("merchant_store_address_id", item.id.toString(), { shouldValidate: true })}
            />
            {item.address}
          </AddressOptions>
        ))}
      </AddressSelect>
    );
  };

  const renderSelectAddress = () => {
    const select = userAddresses?.find(item => item.id === selected);

    return (
      <UserInfoDefault>
        <Box>{select?.address_type}</Box>
        {select && (
          <UserAddress>
            <UserAddressText>{select.address}</UserAddressText>
            <UserAddressText>{select.landmark}</UserAddressText>
            <UserAddressText>
              {select.country}, {select.postal_code}
            </UserAddressText>
          </UserAddress>
        )}
      </UserInfoDefault>
    );
  };

  return (
    <>
      {/* Address for mobile display */}
      {isMobile && (
        <CheckoutContainer>
          <Title>
            Deliver Method <TitleRegion>(Singapore)</TitleRegion>
          </Title>
          <PickupSelectMobile>
            <PickupOptions
              active={isDelivery ? 1 : 0}
              onClick={() => setValue("shipment_method", SHIPMENT_METHOD.DELIVERY)}
            >
              <PickupText active={isDelivery ? 1 : 0}>Delivery</PickupText>
            </PickupOptions>
            <PickupOptions
              active={!isDelivery ? 1 : 0}
              onClick={() => setValue("shipment_method", SHIPMENT_METHOD.PICKUP)}
              disabled={!currentStore || !address.length}
            >
              <PickupText active={!isDelivery ? 1 : 0}>Pickup</PickupText>
            </PickupOptions>
          </PickupSelectMobile>
          {renderAddress()}
          {grabError && <ErrorMessage>{grabError}</ErrorMessage>}
        </CheckoutContainer>
      )}

      {/* Address for Desktop display */}
      {!isMobile && (
        <CheckoutWrapperDesktop>
          <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <TitleDesktop>
              Deliver Method <TitleRegion>(Singapore)</TitleRegion>
            </TitleDesktop>
            <PickupSelectDesktop>
              <PickupOptions
                active={isDelivery ? 1 : 0}
                onClick={() => setValue("shipment_method", SHIPMENT_METHOD.DELIVERY)}
              >
                <PickupText active={isDelivery ? 1 : 0}>Delivery</PickupText>
              </PickupOptions>
              <PickupOptions
                active={!isDelivery ? 1 : 0}
                onClick={() => setValue("shipment_method", SHIPMENT_METHOD.PICKUP)}
                disabled={!currentStore || !address.length}
              >
                <PickupText active={!isDelivery ? 1 : 0}>Pickup</PickupText>
              </PickupOptions>
            </PickupSelectDesktop>
          </Box>
          <AddressShowWrapper>
            {renderSelectAddress()}
            {userInfo && (
              <AddressShow onClick={() => setSeeMore(!seeMore)}>
                <Typography>Other address</Typography>
                <ArrowWrapper isActive={seeMore}>
                  <ArrowDownIcon />
                </ArrowWrapper>
              </AddressShow>
            )}
          </AddressShowWrapper>
          {seeMore && (
            <>
              <AddressShowDivider />
              <AddressSelectDesktop>
                {userAddresses?.map((address, index) => {
                  const isSelected = selected === address.id;
                  return (
                    <React.Fragment key={index}>
                      <AddressOptionsDesktop>
                        <CustomRadio color="secondary" checked={isSelected} onChange={() => setSelected(address.id)} />
                        <UserInfoDefaultDesktop>
                          <UserAddress>
                            <UserAddressText>{address?.address}</UserAddressText>
                          </UserAddress>
                          {address.is_default && isSelected && <GradientText>Default address</GradientText>}
                          {address.address_type && <Box>{address.address_type}</Box>}
                        </UserInfoDefaultDesktop>
                      </AddressOptionsDesktop>
                    </React.Fragment>
                  );
                })}
                <Box position={"relative"}>
                  <AddressOptions>
                    <CustomRadio color="secondary" checked={selected === "new"} onChange={() => setSelected("new")} />
                    <PlusCircleFillIconWrapper>
                      <PlusCircleFillIcon />
                    </PlusCircleFillIconWrapper>
                    <Box>New address</Box>
                  </AddressOptions>
                  {selected === "new" && <NewAddressForm currentStore={currentStore} onSubmit={onAddressCreated} />}
                </Box>
              </AddressSelectDesktop>
            </>
          )}
        </CheckoutWrapperDesktop>
      )}

      <input {...register("shipment_method", { required: true })} hidden />
      <input {...register("merchant_store_address_id", { required: true })} hidden />
      <input {...register("shippingFee", { required: isDelivery })} hidden />
      <input {...register("distance", { required: isDelivery })} hidden />
      <input {...register("recipient_address")} hidden />
      <input {...register("recipient.phone")} hidden />
      <input {...register("loading.shippingFee", { validate: value => !isDelivery || !value })} hidden />
    </>
  );
};

export default ShipmentMethod;
