import { routers } from "@/commons/constants/routers";
import useToast from "@/commons/hooks/useToast";
import CustomModal from "@/components/commons/CustomModal/CustomModal";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { StyledForm, StyledInput, StyledLabel } from "./styles";

interface Props {
  open: boolean;
  price: number;
  handleClose: () => void;
}

interface CardInfo {
  card_number: string;
  exp: string;
  cvc: string;
}

export default function CardModal({ open, price, handleClose }: Props) {
  const toast = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardInfo>();

  const onSubmit = async (values: CardInfo) => {
    handleClose();
    toast.success("Payment sucessfully");
    router.push(routers.CART);
  };

  const isError = !!Object.keys(errors).length;
  return (
    <CustomModal open={open} title="Add credit card" onClose={handleClose}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledLabel>Credit Card Number*</StyledLabel>
        <StyledInput
          variant="outlined"
          type="number"
          {...register("card_number", { required: "This field is required", maxLength: 20 })}
        />
        {errors.card_number ? errors.card_number.message : ""}
        <StyledLabel>Expiration month and year*</StyledLabel>
        <StyledInput variant="outlined" {...register("exp", { required: "This field is required", maxLength: 20 })} />
        {errors.exp ? errors.exp.message : ""}
        <StyledLabel>CVC*</StyledLabel>
        <StyledInput variant="outlined" {...register("cvc", { required: "This field is required", maxLength: 20 })} />
        {errors.cvc ? errors.cvc.message : ""}
        <Button
          type="submit"
          variant="contained"
          disabled={isError}
          style={{ margin: "20px auto", width: "max-content" }}
        >
          Earn ${price}
        </Button>
      </StyledForm>
    </CustomModal>
  );
}
