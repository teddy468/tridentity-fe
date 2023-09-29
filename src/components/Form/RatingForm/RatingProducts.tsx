import RatingItem from "./RatingItem";
import {
  CancelButton,
  CancelText,
  CountCharacters,
  ErrorMessage,
  Footer,
  OrderItem,
  ProductReviewWrapper,
  ReviewArea,
  SubmitButton,
  Toppings,
} from "./styles";
import { useEffect, useMemo, useState } from "react";
import useLoading from "@/commons/hooks/useLoading";
import useToast from "@/commons/hooks/useToast";
import { postRateProductAsync } from "@/redux/saga/userSagas";
import { REGISTER } from "@/commons/constants/message";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as React from "react";
import { Box } from "@mui/system";
import InputRating from "./InputRating";

interface RatingProductsProps {
  order: OrderV2;
  onCancel: () => void;
  product_ratings: CurrentProductRating[];
  onRateProductSuccess: () => void;
}

interface Note {
  [key: number]: number;
}

const RatingProducts = ({ order, onCancel, product_ratings, onRateProductSuccess }: RatingProductsProps) => {
  const [currentRates, setCurrentRate] = useState<Map<number, CurrentProductRating>>(new Map());
  const [errorDes, setErrorDes] = useState(new Map());
  const [count, setCount] = useState<Note>({});

  if (product_ratings) {
    product_ratings.forEach(value => {
      if (value) {
        currentRates.set(value.order_item_id, value);
      }
    });
  }

  const [orderItemRatingMap, setOrderItemRatingMap] = useState<Map<number, OrderItemRating>>(new Map());
  const loadSc = useLoading();
  const toast = useToast();
  const dispatch = useDispatch();

  const setNote = (itemId: number, note: string) => {
    setCount({ ...count, [itemId]: note.length });

    if (note && note.length > 0) {
      if (note.length >= 300) {
        errorDes.set(itemId, "Review maximum 300 characters allowed");
      } else {
        errorDes.delete(itemId);
      }
    }

    let orderItem: OrderItemRating | undefined = orderItemRatingMap.get(itemId);
    if (orderItem) {
      orderItem.description = note;
      // }
    } else {
      orderItem = { description: note, rating: 0, order_item_id: itemId };
      orderItemRatingMap.set(itemId, orderItem);
    }
  };

  const setRate = (itemId: number, rate: number | null) => {
    if (!rate) {
      return;
    }
    let orderItem: OrderItemRating | undefined = orderItemRatingMap.get(itemId);
    if (orderItem) {
      orderItem.rating = rate;
    } else {
      orderItem = { description: "", rating: rate, order_item_id: itemId };
      orderItemRatingMap.set(itemId, orderItem);
    }
  };

  const Info = ({ bundles }: any) => {
    return (
      <>
        {bundles.map((item: { price: number; attribute_name: string; attribute_value: string }) => (
          <Toppings>
            {item.attribute_name}: {item.attribute_value}
          </Toppings>
        ))}
      </>
    );
  };

  function onSubmit() {
    if (errorDes.size > 0) {
      return;
    }

    const orderProductRating: OrderProductRating = {
      order_item_ratings: Array.from(orderItemRatingMap.values()),
      orderId: order.id,
    };

    if (orderProductRating.order_item_ratings.length === 0) {
      toast.error("Please rate to help us improve our quality");
      return;
    }

    for (const element of orderProductRating.order_item_ratings) {
      if (element.rating === 0) {
        toast.error("Please rate to help us improve our quality");
        return;
      }
    }

    loadSc.show();
    dispatch(
      postRateProductAsync({
        payload: orderProductRating,
        onSuccess: result => {
          loadSc.hide();
          toast.success("Rating product success");
          onCancel();
          onRateProductSuccess();
          return console.log("update preferences success", result);
        },
        onError: (error: RegisterError) => {
          loadSc.hide();
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
    <>
      {/* {count && ( */}
      <ProductReviewWrapper>
        {order.items.map(orderItem => {
          const currentRate = currentRates.get(orderItem.id);
          return (
            <OrderItem key={orderItem.id}>
              <RatingItem
                disable={!!currentRate}
                defaultValue={currentRate ? (currentRate.rating ? currentRate.rating : 0) : 0}
                name={orderItem.product.name}
                image={orderItem.product.images[0]}
                onRate={rate => setRate(orderItem.id, rate)}
                info={<Info {...orderItem} />}
              />
              <InputRating
                currentRate={currentRate}
                orderItemId={orderItem.id}
                placeholder={"Leave review for product"}
                setNote={setNote}
              />
              <Box style={{ position: "relative" }}>
                <ErrorMessage>{errorDes.get(orderItem.id)}</ErrorMessage>
              </Box>
              <CountCharacters>{count[orderItem.id] ? count[orderItem.id] : 0}/300</CountCharacters>
            </OrderItem>
          );
        })}
      </ProductReviewWrapper>
      {/* )} */}
      <Footer>
        <CancelButton onClick={onCancel}>
          <CancelText>Cancel</CancelText>
        </CancelButton>
        <SubmitButton disabled={currentRates.size === order.items.length} onClick={onSubmit}>
          Submit
        </SubmitButton>
      </Footer>
    </>
  );
};

export default RatingProducts;
