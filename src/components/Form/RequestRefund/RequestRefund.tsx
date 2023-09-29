import { ORDER_STATUS, SHIPMENT_METHOD } from "@/commons/constants/order";
import useLoading from "@/commons/hooks/useLoading";
import useToast from "@/commons/hooks/useToast";
import FileInput from "@/components/Form/RatingForm/FileInput";
import { RatingEvidenceWrapper } from "@/components/Form/RatingForm/styles";
import { systemActions } from "@/redux/reducer/systemReducer";
import { uploadSingleFile } from "@/redux/requests/storageRequest";
import { postRefundRequestAsync } from "@/redux/saga/userSagas";
import { format2Digit } from "@/utils/formatNumber";
import { isPlural } from "@/utils/product";
import { Typography } from "@mui/material";
import { AxiosError, AxiosResponse } from "axios/index";
import BigNumber from "bignumber.js";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  CancelButton,
  CancelText,
  Container,
  Content,
  ErrorMessage,
  Footer,
  Label,
  OrderDetailLeft,
  OrderDetailRight,
  OrderInformationLower,
  OrderInformationUpper,
  OrderInformationWrapper,
  OrderStoreImg,
  OrderStoreImgWrapper,
  OrderStoreInformation,
  ReviewArea,
  ReviewAreaContent,
  ReviewAreaTextCounter,
  StyledForm,
  StyledModal,
  SubmitButton,
  Title,
} from "./styles";
import { isFileSizeValid } from "@/utils/fileHelper";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  order: OrderV2;
  requestRefundSuccess: () => void;
}

const RequestRefund: React.FC<Props> = ({ isOpen, onClose, order, requestRefundSuccess }: Props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const loadSc = useLoading();
  const [count, setCount] = useState(0);

  const refundTrans = order.transactions ? order.transactions.find(trans => trans.type === 1) : undefined;

  const { amount, discount_amount, delivery_fee, loyalty_discount_amount } = order.payment;

  const total = new BigNumber(amount)
    .minus(discount_amount)
    .minus(loyalty_discount_amount)
    .plus(delivery_fee)
    .toNumber();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RefundRequest>();

  useEffect(() => {
    setValue("description", refundTrans ? refundTrans.meta.description : "");
  }, []);

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
      return "";
    }
  };

  const onSubmit = async (values: RefundRequest) => {
    if (values.description && values.description.length > 300) {
      toast.error("Please input less than 300 character");
      return;
    }

    const avatars: string[] = [];
    if (values.avatar && values.avatar.length > 0) {
      if (values.avatar.length > 3) {
        return toast.error("You can only upload up to 3 photos, each photo can not exceed 2MB");
      }
      for (let i = 0; i < values.avatar.length; i++) {
        if (!isFileSizeValid(values.avatar[i].size)) return toast.error("Each photo can not exceed 2MB");

        const avatar = await uploadAvatar(values.avatar[i]);
        avatars.push(avatar);
      }
    } else {
      return toast.error("Please upload your photo evidence");
    }
    const body: RefundRequestBody = {
      description: values.description,
      attachments: avatars,
      orderId: order.id,
    };
    loadSc.show();
    dispatch(
      postRefundRequestAsync({
        payload: body,
        onSuccess: result => {
          dispatch(systemActions.setDisplayAuthModal(null));
          toast.success("Request refund success");
          loadSc.hide();
          onClose();
          requestRefundSuccess();
        },
        onError: (error: LoginError) => {
          console.log(error);
          const message =
            typeof error?.error.message === "string"
              ? error?.error.message
              : typeof error?.error.message?.[0] === "string"
              ? error.error.message[0]
              : "Request refund error";
          toast.error(message);
          loadSc.hide();
        },
      })
    );
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleTextCounter = (event: any) => {
    setCount(event.target.value.length);
  };

  return (
    // Temporary disable for now
    <StyledModal open={false} onClose={onClose}>
      <Container>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Title>Request refund</Title>
          <Content>
            <OrderInformationWrapper>
              <OrderInformationUpper>
                <OrderStoreInformation>
                  <Typography fontWeight={500}>{order.store.name}</Typography>
                  <Typography fontSize={14}>
                    {order.shipment?.shipment_method === SHIPMENT_METHOD.DELIVERY ? "Delivery" : "Pick up"}
                  </Typography>
                </OrderStoreInformation>
                <OrderStoreImgWrapper>
                  <OrderStoreImg src={order.store.logo} />
                </OrderStoreImgWrapper>
              </OrderInformationUpper>
              <OrderInformationLower>
                <OrderDetailLeft>
                  <Typography fontSize={14}>Order ID: {order.id}</Typography>
                  <Typography fontSize={14} lineHeight={2}>
                    {moment(order.create_time).format("MM/DD/YYYY")}, {moment(order.create_time).format("HH:mm")}
                  </Typography>
                </OrderDetailLeft>
                <OrderDetailRight>
                  <Typography fontSize={14}>{isPlural(order.items.length, "product")}</Typography>
                  <Typography fontSize={18} fontWeight={500} color={"white"}>
                    S$ {format2Digit(total)}
                  </Typography>
                </OrderDetailRight>
              </OrderInformationLower>
            </OrderInformationWrapper>
            <ReviewArea>
              <ReviewAreaContent
                disabled={order.status !== ORDER_STATUS.COMPLETED}
                placeholder="Please let us know the reason"
                maxLength={300}
                {...register("description", {
                  onChange: e => handleTextCounter(e),
                  required: "Field is required",
                  validate: value => value.trim() !== "" || "Field is required",
                })}
              />
              <ReviewAreaTextCounter>{count}/300</ReviewAreaTextCounter>
            </ReviewArea>
            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            <Label>Photo evidence*</Label>

            {refundTrans && order.status !== ORDER_STATUS.COMPLETED ? (
              <RatingEvidenceWrapper>
                {refundTrans?.meta.attachments.map((item, index) => (
                  <img key={index} src={item} alt="avatar" />
                ))}
              </RatingEvidenceWrapper>
            ) : (
              <FileInput
                {...register("avatar", {
                  required: "Field is required",
                })}
                errorMessage={errors.avatar?.message}
              />
            )}

            <Footer>
              <CancelButton onClick={handleClose}>
                <CancelText>Cancel</CancelText>
              </CancelButton>
              <SubmitButton disabled={order.status !== ORDER_STATUS.COMPLETED} type={"submit"}>
                Submit
              </SubmitButton>
            </Footer>
          </Content>
        </StyledForm>
      </Container>
    </StyledModal>
    // -------------------------
  );
};

export default RequestRefund;
