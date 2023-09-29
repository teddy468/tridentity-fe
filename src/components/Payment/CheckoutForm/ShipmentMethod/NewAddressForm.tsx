import { GOOGLE_MAPS_API_KEY } from "@/commons/constants";
import { ADDRESS, COUNTRY, POSTAL_CODE } from "@/commons/constants/message";
import { POSTAL_CODE_PATTERN } from "@/commons/constants/user";
import useToast from "@/commons/hooks/useToast";
import PlacesAutoComplete from "@/components/Map/PlacesAutoComplete";
import CustomInput from "@/components/commons/CustomInput/CustomInput";
import { postDefaultAddressAsync } from "@/redux/saga/userSagas";
import { Input } from "@mui/material";
import { useLoadScript } from "@react-google-maps/api";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { LatLng } from "use-places-autocomplete";
import { AddCardText, AddressForm, SaveAddressButton } from "../styles";

type Props = {
  currentStore: CartItem | null;
  onSubmit: (id: AddressItem["id"]) => void;
};

const NewAddressForm = (props: Props) => {
  const { onSubmit } = props;

  const dispatch = useDispatch();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddressValues>({
    defaultValues: { address_type: "" },
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const handleSaveAddress = (values: AddressValues) => {
    const body: AddressDefaultBody = {
      ...values,
      status: 1,
      is_default: false,
    };

    dispatch(
      postDefaultAddressAsync({
        payload: body,
        onSuccess: newAddress => {
          toast.success("Save successfully");
          onSubmit(newAddress.id);
        },
        onError: (error: LoginError) => {
          toast.error("Save address error");
          return console.log("Post user error", error);
        },
      })
    );
  };

  const handleChangeAddress = (value: LatLng | null) => {
    if (!value) return setValue("coordinate", undefined, { shouldValidate: true });
    setValue("coordinate", { lat: value.lat.toString(), lng: value.lng.toString() }, { shouldValidate: true });
  };

  const coordinate = watch("coordinate");

  if (!isLoaded) return null;

  return (
    <AddressForm onSubmit={handleSubmit(handleSaveAddress)}>
      <Input type="hidden" {...register("prefix")} />
      <CustomInput
        placeholder="Address Category"
        {...register("address_type")}
        errorMessage={errors.country?.message}
        groupProps={{ style: { marginBottom: errors.country?.message ? 30 : 8 } }}
        sx={{ width: "100%", marginBottom: 1 }}
      />
      <PlacesAutoComplete
        setSelected={handleChangeAddress}
        onChange={value => setValue("address", value?.label || "", { shouldValidate: true })}
        errorMessage={errors.address?.message || errors.coordinate?.message}
        placeholder="Enter Address*"
        groupProps={{ style: { marginBottom: errors.address?.message || errors.coordinate?.message ? 30 : 8 } }}
        sx={{ marginBottom: 1 }}
      />
      <input {...register("address", { required: ADDRESS.REQUIRED })} hidden />
      <input {...register("coordinate", { required: ADDRESS.INVALID })} hidden />
      <CustomInput
        placeholder="#[Unit Level] - [Unit No.] [Building Name]"
        {...register("landmark")}
        groupProps={{ style: { marginBottom: errors.landmark?.message ? 30 : 8 } }}
        sx={{ width: "100%", marginBottom: 1 }}
      />
      <CustomInput
        placeholder="Country*"
        {...register("country", { required: COUNTRY.REQUIRED })}
        defaultValue={"Singapore"}
        errorMessage={errors.country?.message}
        groupProps={{ style: { marginBottom: errors.country?.message ? 30 : 8 } }}
        sx={{ width: "100%", marginBottom: 1 }}
      />
      <CustomInput
        placeholder="Postal code*"
        {...register("postal_code", {
          required: POSTAL_CODE.REQUIRED,
          pattern: { value: POSTAL_CODE_PATTERN, message: POSTAL_CODE.FORMAT },
        })}
        errorMessage={errors.postal_code?.message}
        groupProps={{ style: { marginBottom: errors.postal_code?.message ? 30 : 8 } }}
        sx={{ width: "100%", marginBottom: 1 }}
        type="number"
      />
      <SaveAddressButton type="submit">
        <AddCardText>Save this address for later</AddCardText>
      </SaveAddressButton>
    </AddressForm>
  );
};

export default NewAddressForm;
