import {
  URL_GET_RATING_BY_ORDER_ID,
  URL_ORDERS,
  URL_ORDERS_DETAIL_V2,
  URL_ORDER_PAYMENT,
} from "@/commons/constants/apiUrl";
import { ORDER_STATUS, ORDER_STATUS_NAMES, SHIPMENT_METHOD, SHIPMENT_METHOD_NAMES } from "@/commons/constants/order";
import { REDIRECT_TRI_APP, details } from "@/commons/constants/routers";
import useFetch from "@/commons/hooks/useFetch";
import useFetchList from "@/commons/hooks/useFetchList";
import useLoading from "@/commons/hooks/useLoading";
import useToast from "@/commons/hooks/useToast";
import NewBadgeModal from "@/components/MyOrders/NewBadgeModals/NewBadgeModal";
import { addCartSync, completeOrderSync, wearBadgeSync } from "@/redux/saga/cartSagas";
import { format2Digit } from "@/utils/formatNumber";
import { isPlural } from "@/utils/product";
import { Box } from "@mui/material";
import BigNumber from "bignumber.js";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import RatingForm from "../Form/RatingForm/RatingForm";
import NotFoundData from "../commons/NotFoundData/NotFoundData";
import {
  HeaderContainer,
  ImageLink,
  MerchantImage,
  MerchantName,
  MyOrderContainer,
  OrderId,
  OrderInfo,
  OrderInfoDesktop,
  OrderInfoMobile,
  OrderItem,
  OrderList,
  OrderStatus,
  PayNowButton,
  PriceValue,
  ProductCount,
  ProductPrice,
  ProductPriceDesktop,
  ReOrderButton,
  SearchIcon,
  SearchInput,
  ShipmentMethod,
} from "./styles";
import defaultAxios from "@/commons/utils/axios";
import { TRI_APP_URL } from "@/commons/constants";
import { isMobile } from "react-device-detect";

const MyOrders = () => {
  const [keyword, setKeyword] = useState<string>("");
  const query = {
    search_value: keyword,
  };
  const dispatch = useDispatch();
  const loadSc = useLoading();
  const { data, initialized, refresh } = useFetchList<OrderItem>(URL_ORDERS, query);
  const [selected, setSelected] = useState<OrderItem["id"] | null>(null);
  const [reOrderId, setReOrderId] = useState<OrderItem["id"] | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: orderRate } = useFetch<OrderV2>(selected ? URL_ORDERS_DETAIL_V2(selected) : "");
  const { data: orderReOrder } = useFetch<OrderV2>(reOrderId ? URL_ORDERS_DETAIL_V2(reOrderId) : "");
  const { data: rate, refresh: refreshRate } = useFetch<CurrentOrderRating>(
    selected ? URL_GET_RATING_BY_ORDER_ID(selected) : ""
  );
  const toast = useToast();
  useEffect(() => {
    // const interval = setInterval(() => refresh(), 10000);
    // return () => clearInterval(interval);
  }, [refresh]);

  const [openNewBadgeModal, setOpenNewBadgeModal] = useState<boolean>(false);
  const [newBadge, setNewBadge] = useState<BadgeItem | undefined>(undefined);

  useEffect(() => {
    if (orderReOrder) {
      loadSc.show();
      const newCart: CreateUpdateCartBodyV2 = {
        merchant_store_id: orderReOrder.merchant_store_id,
        meta: {},
        product_items: orderReOrder.items,
      };
      dispatch(
        addCartSync({
          payload: newCart,
          onSuccess: () => {
            toast.success("Add to cart successfully");
            loadSc.hide();
            setReOrderId(null);
          },
          onError: (error: AddCartError) => {
            loadSc.hide();
            const message =
              typeof error?.error.message === "string"
                ? error?.error.message
                : typeof error?.error.message?.[0] === "string"
                ? error.error.message[0]
                : "Re-Order fail";
            toast.error(message);
            setReOrderId(null);
          },
        })
      );
    }
  }, [orderReOrder]);

  const reOrderHandler = (id: OrderItem["id"] | null) => {
    if (!id) {
      return;
    }
    setReOrderId(id);
  };

  const handlePayment = async (orderId: string) => {
    try {
      const res = await defaultAxios.get<{ payment_token: string }>(URL_ORDER_PAYMENT(orderId));
      if (res.data.payment_token == null) return toast.error("Order is expired, please make another");
      location.replace(REDIRECT_TRI_APP.PAYMENT_URL(res.data.payment_token));
    } catch (error: any) {
      toast.error(error.error.message);
    }
  };

  const handleCompleted = async (id: OrderV2["id"]) => {
    setLoading(true);
    dispatch(
      completeOrderSync({
        payload: id,
        onSuccess: data => {
          setLoading(false);
          toast.success("Confirm successful");
          refresh();
          if (data && data.badge) {
            setNewBadge(data.badge);
            setOpenNewBadgeModal(true);
          }
        },

        onError: error => {
          setLoading(false);
          const message =
            typeof error?.error.message === "string"
              ? error?.error.message
              : typeof error?.error.message?.[0] === "string"
              ? error.error.message[0]
              : "Complete Order Fail";
          toast.error(message);
        },
      })
    );
  };

  const closeNewBadgeModal = () => {
    setOpenNewBadgeModal(false);
  };

  const onWearBadge = () => {
    if (newBadge) {
      dispatch(
        wearBadgeSync({
          payload: newBadge.id,
          onSuccess: data => {
            setLoading(false);
            toast.success("Wear badge success");
            setOpenNewBadgeModal(false);
          },

          onError: error => {
            setLoading(false);
            const message =
              typeof error?.error.message === "string"
                ? error?.error.message
                : typeof error?.error.message?.[0] === "string"
                ? error.error.message[0]
                : "Complete Order Fail";
            toast.error(message);
          },
        })
      );
    }
  };

  const search = debounce(e => {
    const value = e.target.value;
    setKeyword(value);
  }, 500);

  const renderStatus = (status: number, orderId: string, shipmentMethod?: number) => {
    switch (status) {
      case ORDER_STATUS.WAITING_FOR_PAYMENT:
        return <PayNowButton onClick={() => handlePayment(orderId)}>Payment now</PayNowButton>;
      case ORDER_STATUS.COMPLETED:
        return <ReOrderButton onClick={() => reOrderHandler(orderId)}>Re-Order</ReOrderButton>;
      case ORDER_STATUS.DELIVERED:
        return (
          <ReOrderButton onClick={() => handleCompleted(orderId)} disabled={loading}>
            Order received
          </ReOrderButton>
        );
      case ORDER_STATUS.PREPARED:
        if (shipmentMethod === SHIPMENT_METHOD.PICKUP) {
          return (
            <ReOrderButton onClick={() => handleCompleted(orderId)} disabled={loading}>
              Order received
            </ReOrderButton>
          );
        }
        return null;
      default:
        break;
    }
  };

  return (
    <MyOrderContainer>
      <HeaderContainer>
        <SearchInput
          placeholder="Search for merchant, order ID, product"
          InputProps={{ startAdornment: <SearchIcon /> }}
          onChange={search}
        />
      </HeaderContainer>
      <OrderList>
        {data.map(order => {
          const { amount, discount_amount, delivery_fee, loyalty_discount_amount } = order.payment;
          const total = new BigNumber(amount)
            .minus(discount_amount)
            .minus(loyalty_discount_amount)
            .plus(delivery_fee)
            .toNumber();

          const price = Math.max(0, total);

          return (
            <OrderItem key={order.id}>
              <Box display="flex" justifyContent={isMobile ? "flex-start" : "space-between"} gap={3}>
                <ImageLink href={details.order(order.id)}>
                  <MerchantImage src={order.store.logo} />
                </ImageLink>
                <Box
                  width={"calc(100% - 140px)"}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                >
                  <Box display="flex" justifyContent="space-between" gap={3}>
                    <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                      <OrderStatus status={order.status}>
                        {ORDER_STATUS_NAMES[order.status as ORDER_STATUS]}
                      </OrderStatus>
                      <MerchantName href={details.order(order.id)}>{order.store.name}</MerchantName>
                      {order.shipment && (
                        <ShipmentMethod>{SHIPMENT_METHOD_NAMES[order.shipment?.shipment_method]}</ShipmentMethod>
                      )}
                    </Box>
                    <ProductPriceDesktop>
                      <ProductCount>{isPlural(order.items.length, "product")}</ProductCount>
                      <PriceValue>S$ {format2Digit(price)}</PriceValue>
                    </ProductPriceDesktop>
                  </Box>
                  <OrderInfoDesktop>
                    <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                      <OrderId>Order ID: {order.id}</OrderId>
                      <OrderInfo>{moment(order.create_time).format("DD/MM/YYYY, HH:mm")}</OrderInfo>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                      {renderStatus(order.status, order.id, order.shipment?.shipment_method)}
                    </Box>
                  </OrderInfoDesktop>
                </Box>
              </Box>
              <OrderInfoMobile>
                <Box display="flex" justifyContent="space-between">
                  <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                    <OrderId>Order ID: {order.id}</OrderId>
                    <OrderInfo>{moment(order.create_time).format("DD/MM/YYYY, HH:mm")}</OrderInfo>
                  </Box>
                  <ProductPrice>
                    <ProductCount>{isPlural(order.items.length, "product")}</ProductCount>
                    <PriceValue>S$ {format2Digit(price)}</PriceValue>
                  </ProductPrice>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                  {renderStatus(order.status, order.id, order.shipment?.shipment_method)}
                </Box>
              </OrderInfoMobile>
            </OrderItem>
          );
        })}
        {initialized && !data.length && <NotFoundData text="orders" />}
      </OrderList>
      {orderRate?.id === selected && (
        <RatingForm
          order={orderRate}
          isOpen={true}
          onClose={() => setSelected(null)}
          orderRate={rate ? rate : undefined}
          onRateSuccess={refreshRate}
        />
      )}
      <NewBadgeModal
        isOpen={openNewBadgeModal}
        onClose={closeNewBadgeModal}
        wearBadge={onWearBadge}
        newBadge={newBadge}
      />
    </MyOrderContainer>
  );
};

export default MyOrders;
