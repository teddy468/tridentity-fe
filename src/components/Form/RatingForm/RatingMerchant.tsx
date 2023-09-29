import { SHIPMENT_METHOD } from "@/commons/constants/order";
import moment from "moment";
import RatingItem from "./RatingItem";
import {
  CancelButton,
  CancelText,
  CountCharacters,
  DateTime,
  ErrorMessage,
  Footer,
  Label,
  OrderId,
  RatingEvidenceWrapper,
  ReviewArea,
  Service,
  SubmitButton,
} from "./styles";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AxiosError, AxiosResponse } from "axios";
import { uploadSingleFile } from "@/redux/requests/storageRequest";
import { postRateStoreAsync } from "@/redux/saga/userSagas";
import { systemActions } from "@/redux/reducer/systemReducer";
import { useDispatch } from "react-redux";
import useToast from "@/commons/hooks/useToast";
import useLoading from "@/commons/hooks/useLoading";
import { Box } from "@mui/system";
import FileInput from "@/components/Form/RatingForm/FileInput";
import { isFileSizeValid } from "@/utils/fileHelper";

interface RatingMerchantProps {
  order: OrderV2;
  onCancel: () => void;
  store_rating: CurrentStoreRating | undefined;
  onRateStoreSuccess: () => void;
}

const RatingMerchant = ({ order, onCancel, store_rating, onRateStoreSuccess }: RatingMerchantProps) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const loadSc = useLoading();
  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<OrderStoreRatingValues>();

  const [rate, setRate] = useState<number | null>(0);
  const [count, setCount] = useState<number>(0);

  const uploadAvatar = async (file?: File): Promise<string> => {
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
      setError("avatar", { message: message });
      throw new Error(err);
    }
  };

  const onSubmit = async (values: OrderStoreRatingValues) => {
    if (!rate) {
      return toast.error("Please rate to help us improve our quality");
    }

    const avatars: string[] = [];

    if (values.avatar && values.avatar.length > 0) {
      if (values.avatar.length > 3) return toast.error("You can only upload up to 3 photos");

      for (let i = 0; i < values.avatar.length; i++) {
        if (!isFileSizeValid(values.avatar[i].size)) return toast.error("Each photo can not exceed 2MB");

        try {
          const avatar = await uploadAvatar(values.avatar[i]);
          avatars.push(avatar);
        } catch (error) {
          return;
        }
      }
    }

    const body: OrderStoreRating = {
      description: values.description,
      rating: rate ? rate : 0,
      data: { attachments: avatars },
      orderId: order.id,
    };

    loadSc.show();
    dispatch(
      postRateStoreAsync({
        payload: body,
        onSuccess: () => {
          dispatch(systemActions.setDisplayAuthModal(null));
          toast.success("Rate store success");
          loadSc.hide();
          onCancel();
          onRateStoreSuccess();
        },
        onError: (error: LoginError) => {
          console.log(error);
          const message =
            typeof error?.error.message === "string"
              ? error?.error.message
              : typeof error?.error.message?.[0] === "string"
              ? error.error.message[0]
              : "Rate store failed";
          toast.error(message);
          loadSc.hide();
        },
      })
    );
  };

  useEffect(() => {
    if (store_rating) {
      setValue("description", store_rating.description);
    }
  }, [store_rating]);

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RatingItem
            name={order.store.name}
            image={order.store.logo}
            info={<Info order={order} />}
            onRate={rate => setRate(rate)}
            disable={!!store_rating}
            defaultValue={store_rating ? (store_rating.rating ? store_rating.rating : 0) : 0}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <ReviewArea
                {...field}
                disabled={!!store_rating}
                placeholder="Leave review for merchant"
                value={store_rating?.description}
                onChange={e => field.onChange(() => setCount(e.target.value.length))}
                maxLength={300}
              />
            )}
          />
          {count === 300 && (
            <Box style={{ position: "relative" }}>
              <ErrorMessage>Review maximum 300 characters allowed</ErrorMessage>
            </Box>
          )}
          <CountCharacters>{count}/300</CountCharacters>
          <Label>Photo evidence*</Label>
          {!!store_rating?.data.attachments?.length ? (
            <RatingEvidenceWrapper>
              {store_rating?.data.attachments.map((item, index) => (
                <img key={index} src={item} alt="avatar" />
              ))}
            </RatingEvidenceWrapper>
          ) : (
            <FileInput
              {...register("avatar", { required: "Please upload your evidence photo" })}
              errorMessage={errors.avatar?.message}
            />
          )}
          <Footer>
            <CancelButton onClick={onCancel}>
              <CancelText>Cancel</CancelText>
            </CancelButton>
            <SubmitButton disabled={!!store_rating} type="submit">
              {" "}
              Submit
            </SubmitButton>
          </Footer>
        </form>
      </Box>
    </>
  );
};

type PropsInfo = {
  order: OrderV2;
};
const Info = (props: PropsInfo) => {
  const { order } = props;
  return (
    <>
      <Service>{order.shipment?.shipment_method === SHIPMENT_METHOD.DELIVERY ? "Delivery" : "Pick up"}</Service>
      <OrderId>Order ID: {order.id}</OrderId>
      <DateTime>
        {moment(order.create_time).format("MM/DD/YYYY")}, {moment(order.create_time).format("HH:mm")}
      </DateTime>
    </>
  );
};

export default RatingMerchant;
