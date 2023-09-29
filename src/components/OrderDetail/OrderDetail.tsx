import { LeftArrowIcon } from "@/assets/icons";
import { EXCHANGE_RATE, URL_GET_RATING_BY_ORDER_ID, URL_ORDERS_DETAIL_V2 } from "@/commons/constants/apiUrl";
import { ORDER_STATUS, ORDER_STATUS_NAMES, SHIPMENT_METHOD, SHIPMENT_METHOD_NAMES } from "@/commons/constants/order";
import { details, routers } from "@/commons/constants/routers";
import useFetch from "@/commons/hooks/useFetch";
import useLoading from "@/commons/hooks/useLoading";
import useToast from "@/commons/hooks/useToast";
import defaultAxios from "@/commons/utils/axios";
import { formatPrice } from "@/commons/utils/formatNumber";
import NewBadgeModal from "@/components/MyOrders/NewBadgeModals/NewBadgeModal";
import { userActions } from "@/redux/reducer/userReducer";
import { addCartSync, completeOrderSync, wearBadgeSync } from "@/redux/saga/cartSagas";
import { format2Digit } from "@/utils/formatNumber";
import { getNormalOrderBundles, isPlural } from "@/utils/product";
import { Box, Typography } from "@mui/material";
import BigNumber from "bignumber.js";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import RatingForm from "../Form/RatingForm/RatingForm";
import RequestRefund from "../Form/RequestRefund/RequestRefund";
import CustomLink from "../commons/CustomLink/CustomLink";
import { GradientText } from "../commons/GradientText/GradientText";
import NotFoundPage from "../commons/NotFoundPage/NotFoundPage";
import OrderReceivedModal from "./OrderReceivedModals/OrderReceivedModal";
import {
  AreaMobile,
  AreaPC,
  BackButton,
  Col,
  ContactStoreButton,
  Header,
  ImageBox,
  MerchantImage,
  MerchantName,
  MoreInfo,
  MyOrderContainer,
  OrderContainer,
  OrderId,
  OrderInfo,
  OrderInfoDesktop,
  OrderInfoMobile,
  OrderStatus,
  PayNowButton,
  PriceValue,
  ProductAttribute,
  ProductAttributeWrapper,
  ProductCount,
  ProductImage,
  ProductItem,
  ProductLink,
  ProductPrice,
  ProductPriceDesktop,
  RateOrderButton,
  ReOrderButton,
  RequestRefundButton,
  Row,
  ShipmentMethod,
  Title,
  TotalTitle,
  TotalValue,
  Value,
} from "./styles";

const OrderDetail = ({ id }: { id: OrderV2["id"] }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const loadSc = useLoading();
  const { data, initialized, refresh } = useFetch<OrderV2>(URL_ORDERS_DETAIL_V2(id));
  const { data: rate, refresh: refreshRate } = useFetch<CurrentOrderRating>(URL_GET_RATING_BY_ORDER_ID(id));
  const [openOrderReceivedModal, setOpenOrderReceivedModal] = useState<boolean>(false);

  const [openNewBadgeModal, setOpenNewBadgeModal] = useState<boolean>(false);
  const [newBadge, setNewBadge] = useState<BadgeItem | undefined>(undefined);
  const [openRatingModal, setOpenRatingModal] = useState<boolean>(false);
  const [openRequestRefundModal, setOpenRequestRefundModal] = useState<boolean>(false);
  const closeNewBadgeModal = () => {
    setOpenNewBadgeModal(false);
  };

  const [configExchange, setConfigExchange] = useState<{
    lp_rate: number;
    sgd_rate: number;
  }>({
    lp_rate: 1,
    sgd_rate: 1,
  });

  useEffect(() => {
    getExchangeRate();
  }, []);

  const getExchangeRate = async () => {
    try {
      const res = await defaultAxios.get<any>(EXCHANGE_RATE);
      const config = res.data;
      setConfigExchange(config);
    } catch (error) {}
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

  useEffect(() => {
    // const interval = setInterval(() => refresh(), 10000);
    // return () => clearInterval(interval);
  }, [refresh]);

  if (initialized && !data) return <NotFoundPage />;
  if (!data) return null;

  const { amount, discount_amount, delivery_fee, loyalty_discount_amount, min_order, total_amount } =
    data.payment || {};

  const price = new BigNumber(amount)
    .minus(discount_amount)
    .minus(loyalty_discount_amount)
    .plus(delivery_fee)
    .toNumber();

  const toast = useToast();

  const handleChat = () => {
    dispatch(userActions.setonStoreChat(data.store.id));
  };

  const handleCompleted = async () => {
    setLoading(true);
    dispatch(
      completeOrderSync({
        payload: id,
        onSuccess: data => {
          setLoading(false);
          toast.success("Confirm successful");
          refresh();
          setOpenOrderReceivedModal(false);
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

  const reOrderHandler = () => {
    loadSc.show();
    const newCart: CreateUpdateCartBodyV2 = {
      merchant_store_id: data.merchant_store_id,
      meta: {},
      product_items: data.items,
    };
    dispatch(
      addCartSync({
        payload: newCart,
        onSuccess: () => {
          toast.success("Add to cart successfully");
          loadSc.hide();
        },
        onError: (error: AddCartError) => {
          loadSc.hide();
          const message =
            typeof error?.error.message === "string"
              ? error?.error.message
              : typeof error?.error.message?.[0] === "string"
              ? error.error.message[0]
              : "Re-Order failed";
          toast.error(message);
        },
      })
    );
  };

  function requestRefundSuccess() {
    refresh();
  }

  const loyaltyPointBalance = new BigNumber(data.payment.campaign_loyalty_point)
    .multipliedBy(configExchange.sgd_rate)
    .div(configExchange.lp_rate)
    .toFixed(2, 1);

  const renderStatus = (status: number) => {
    switch (status) {
      case ORDER_STATUS.WAITING_FOR_PAYMENT:
        return (
          <PayNowButton onClick={() => setOpenOrderReceivedModal(true)} disabled={loading}>
            Payment Now
          </PayNowButton>
        );
      case ORDER_STATUS.DELIVERED:
        return (
          <ReOrderButton onClick={() => setOpenOrderReceivedModal(true)} disabled={loading}>
            Order Received
          </ReOrderButton>
        );
      case ORDER_STATUS.PREPARED:
        if (data.shipment.shipment_method === SHIPMENT_METHOD.PICKUP) {
          return (
            <ReOrderButton onClick={() => setOpenOrderReceivedModal(true)} disabled={loading}>
              Order Received
            </ReOrderButton>
          );
        }
        return null;
      case ORDER_STATUS.COMPLETED:
        return (
          <>
            <RateOrderButton onClick={() => setOpenRatingModal(true)}>
              <GradientText>Rate this order</GradientText>
            </RateOrderButton>
            <ReOrderButton onClick={reOrderHandler}>Re-Order</ReOrderButton>
          </>
        );
      default:
        return (
          <RateOrderButton onClick={handleChat}>
            <GradientText>Contact Store</GradientText>
          </RateOrderButton>
        );
    }
  };

  return (
    <MyOrderContainer>
      <BackButton color="reverse" href={routers.USER.MY_ORDERS}>
        <LeftArrowIcon /> Back
      </BackButton>
      <OrderContainer>
        <Box display="flex" justifyContent="space-between" gap={3}>
          <CustomLink href={details.store(data.store.id)}>
            <ImageBox>
              <MerchantImage src={data.store.logo} />
            </ImageBox>
          </CustomLink>
          <Box width={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
            <Box display="flex" justifyContent="space-between" gap={3}>
              <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                <OrderStatus status={data.status}>{ORDER_STATUS_NAMES[data.status as ORDER_STATUS]}</OrderStatus>
                <MerchantName href={details.store(data.store.id)}>{data.store.name}</MerchantName>
                {data.shipment && (
                  <ShipmentMethod>{SHIPMENT_METHOD_NAMES[data.shipment?.shipment_method]}</ShipmentMethod>
                )}
              </Box>
              <ProductPriceDesktop>
                <ProductCount>{isPlural(data.items.length, "product")}</ProductCount>
                <PriceValue>S$ {format2Digit(total_amount)}</PriceValue>
              </ProductPriceDesktop>
            </Box>
            <OrderInfoDesktop>
              <Box>
                <OrderId>Order ID: {data.id}</OrderId>
                <OrderInfo>{moment(data.create_time).format("DD/MM/YYYY, HH:mm")}</OrderInfo>
              </Box>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                {renderStatus(data.status)}
              </Box>
            </OrderInfoDesktop>
          </Box>
        </Box>
        <OrderInfoMobile>
          <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
            <OrderId>Order ID: {data.id}</OrderId>
            <OrderInfo>{moment(data.create_time).format("DD/MM/YYYY, HH:mm")}</OrderInfo>
          </Box>
          <ProductPrice>
            <ProductCount>{isPlural(data.items.length, "product")}</ProductCount>
            <PriceValue>S$ {format2Digit(total_amount)}</PriceValue>
          </ProductPrice>
        </OrderInfoMobile>
        <AreaMobile>
          <Box display={"flex"} justifyContent={"space-between"}>
            {data.status === ORDER_STATUS.COMPLETED && (
              <>
                <RateOrderButton style={{ border: "1px solid #F7EF82" }} onClick={() => setOpenRatingModal(true)}>
                  <GradientText>Rate this order</GradientText>
                </RateOrderButton>
                <ReOrderButton onClick={reOrderHandler}>Re-Order</ReOrderButton>
              </>
            )}
          </Box>
          <Box display={"flex"} justifyContent={"space-between"} marginTop={"10px"}>
            {data.status !== ORDER_STATUS.CANCELLED && (
              <ContactStoreButton style={{ border: "1px solid #F7EF82" }} onClick={handleChat}>
                <GradientText>Contact Store</GradientText>
              </ContactStoreButton>
            )}
            {data.status === ORDER_STATUS.DELIVERED ||
              (data.status === ORDER_STATUS.PREPARED && data.shipment?.shipment_method === SHIPMENT_METHOD.PICKUP && (
                <ReOrderButton onClick={() => setOpenOrderReceivedModal(true)} disabled={loading}>
                  Order Received
                </ReOrderButton>
              ))}
          </Box>
          <Box marginTop={4}>
            {data.items.map((item, index) => {
              const bundles = getNormalOrderBundles(item);

              return (
                <Row
                  sx={{ display: "block", borderTop: index === 0 ? "1px solid #4E4E54" : null }}
                  key={item.id + index}
                >
                  <Box paddingTop={2}>
                    <ProductItem>
                      <ProductImage src={item.product.images[0]} />
                      <Box overflow={"hidden"}>
                        <ProductLink href={details.product(item.product_id)} color="reverse">
                          {item.product.name}
                        </ProductLink>
                        {bundles.map(variant => {
                          return (
                            <ProductAttribute>
                              {variant.attribute_name}: {variant.attribute_value}
                            </ProductAttribute>
                          );
                        })}
                      </Box>
                    </ProductItem>
                  </Box>
                  <Box paddingY={1}>
                    <ProductAttributeWrapper>
                      <ProductAttribute>Price</ProductAttribute>
                      <Typography
                        variant="caption"
                        variantMapping={{ caption: "span" }}
                        fontSize={14}
                        fontWeight={500}
                        color={"white"}
                        paddingLeft={1}
                      >
                        S$ {format2Digit(item.original_price)}
                      </Typography>
                    </ProductAttributeWrapper>
                    <ProductAttributeWrapper>
                      <ProductAttribute>Quantity</ProductAttribute>
                      <Typography
                        variant="caption"
                        variantMapping={{ caption: "span" }}
                        fontSize={14}
                        fontWeight={500}
                        color={"white"}
                        paddingLeft={1}
                      >
                        {formatPrice(item.quantity)}
                      </Typography>
                    </ProductAttributeWrapper>
                    {data.payment.delivery_fee > 0 && (
                      <ProductAttributeWrapper>
                        <ProductAttribute>Delivery fee</ProductAttribute>
                        <Typography
                          variant="caption"
                          variantMapping={{ caption: "span" }}
                          fontSize={14}
                          fontWeight={500}
                          color={"white"}
                          paddingLeft={1}
                        >
                          S$ {format2Digit(data.payment.delivery_fee)}
                        </Typography>
                      </ProductAttributeWrapper>
                    )}
                    {data.payment.loyalty_discount_amount > 0 && (
                      <ProductAttributeWrapper>
                        <ProductAttribute>LP Deduction</ProductAttribute>
                        <Typography
                          variant="caption"
                          variantMapping={{ caption: "span" }}
                          fontSize={14}
                          fontWeight={500}
                          color={"white"}
                          paddingLeft={1}
                        >
                          - S$ {format2Digit(data.payment.loyalty_discount_amount)}
                        </Typography>
                      </ProductAttributeWrapper>
                    )}
                    {min_order && min_order > price && (
                      <ProductAttributeWrapper>
                        <ProductAttribute>Small order fee</ProductAttribute>
                        <Typography
                          variant="caption"
                          variantMapping={{ caption: "span" }}
                          fontSize={14}
                          fontWeight={500}
                          color={"white"}
                          paddingLeft={1}
                        >
                          S$ {format2Digit(min_order - price)}
                        </Typography>
                      </ProductAttributeWrapper>
                    )}
                    <ProductAttributeWrapper>
                      <ProductAttribute>Total</ProductAttribute>
                      <Typography
                        variant="caption"
                        variantMapping={{ caption: "span" }}
                        fontSize={14}
                        fontWeight={500}
                        color={"white"}
                        paddingLeft={1}
                      >
                        S$ {format2Digit(total_amount)}
                      </Typography>
                    </ProductAttributeWrapper>
                    {data.payment.rewardLoyaltyPointForUser && data.payment.rewardLoyaltyPointForUser > 0 && (
                      <ProductAttributeWrapper>
                        <ProductAttribute>LP Earn</ProductAttribute>
                        <Typography
                          variant="caption"
                          variantMapping={{ caption: "span" }}
                          fontSize={14}
                          fontWeight={500}
                          color={"white"}
                          paddingLeft={1}
                        >
                          {data.payment.rewardLoyaltyPointForUser} LP
                        </Typography>
                      </ProductAttributeWrapper>
                    )}
                  </Box>
                </Row>
              );
            })}
          </Box>
        </AreaMobile>

        <AreaPC>
          <Header>
            <Col width={"40%"} sx={{ paddingX: 0 }}>
              Product
            </Col>
            <Col width={"15%"} sx={{ paddingX: 0, textAlign: "center" }}>
              Quantity
            </Col>
            <Col width={"20%"} sx={{ paddingX: 0, textAlign: "center" }}>
              Price
            </Col>
            <Col width={"25%"} sx={{ paddingX: 0, textAlign: "right" }}>
              Total
            </Col>
          </Header>
          {data.items.map((item, index) => {
            const bundles = getNormalOrderBundles(item);

            return (
              <Row key={item.id + index}>
                <Col width={"40%"} sx={{ padding: 0 }}>
                  <ProductItem>
                    <ProductImage src={item.product.images[0]} />
                    <Box overflow={"hidden"} paddingLeft={2} paddingRight={2}>
                      <ProductLink href={details.product(item.product_id)} color="reverse">
                        {item.product.name}
                      </ProductLink>
                      {bundles.map(variant => (
                        <ProductAttribute>
                          {variant.attribute_name}: {variant.attribute_value}
                        </ProductAttribute>
                      ))}
                    </Box>
                  </ProductItem>
                </Col>
                <Col width={"15%"} sx={{ padding: 0, textAlign: "center" }}>
                  {formatPrice(item.quantity)}
                </Col>
                <Col width={"20%"} sx={{ padding: 0, textAlign: "center" }}>
                  S$ {format2Digit(item.original_price)}
                </Col>
                <Col width={"25%"} sx={{ padding: 0, textAlign: "right" }}>
                  S$ {format2Digit(item.final_price)}
                </Col>
              </Row>
            );
          })}
          <Box width={"full"}>
            <MoreInfo>
              <Title>Subtotal </Title> <Value>S$ {format2Digit(amount)}</Value>
            </MoreInfo>
            {min_order && min_order > price && (
              <MoreInfo>
                <Title>Small order fee </Title> <Value>S$ {format2Digit(min_order - price)}</Value>
              </MoreInfo>
            )}
            <MoreInfo>
              <Title>Delivery fee </Title> <Value>S$ {format2Digit(data.payment.delivery_fee)}</Value>
            </MoreInfo>
            {data.payment.loyalty_discount_amount > 0 && (
              <MoreInfo>
                <Title>LP Deduction </Title> <Value>- S$ {format2Digit(data.payment.loyalty_discount_amount)}</Value>
              </MoreInfo>
            )}
            {data.payment.campaign_loyalty_point > 0 && (
              <MoreInfo>
                <Title>LP Bonus </Title>
                <Value>
                  {format2Digit(data.payment.campaign_loyalty_point)} LP = S$ {format2Digit(loyaltyPointBalance)}
                </Value>
              </MoreInfo>
            )}
            {data.payment.discount_amount > 0 && (
              <MoreInfo>
                <Title>Voucher Discount </Title> <Value>- S$ {format2Digit(data.payment.discount_amount)}</Value>
              </MoreInfo>
            )}
            <MoreInfo>
              <TotalTitle>Total </TotalTitle> <TotalValue>S$ {format2Digit(total_amount)}</TotalValue>
            </MoreInfo>
            {data.payment.rewardLoyaltyPointForUser && data.payment.rewardLoyaltyPointForUser > 0 && (
              <MoreInfo borderTop={"1px solid #4E4E54"}>
                <TotalTitle>LP Earn </TotalTitle> <TotalValue>{data.payment.rewardLoyaltyPointForUser} LP</TotalValue>
              </MoreInfo>
            )}
          </Box>
        </AreaPC>
      </OrderContainer>

      {/* Temporary disable for now */}
      <Box width={"100%"} display={"none"} justifyContent={"center"} marginTop={3}>
        <RequestRefundButton
          disabled={data.status !== ORDER_STATUS.COMPLETED && data.status !== ORDER_STATUS.REFUNDED}
          onClick={() => setOpenRequestRefundModal(true)}
        >
          Request refund
        </RequestRefundButton>
      </Box>
      {/* //////////// */}

      <OrderReceivedModal
        isOpen={openOrderReceivedModal}
        onConfirm={handleCompleted}
        onClose={() => setOpenOrderReceivedModal(false)}
      />

      <NewBadgeModal
        isOpen={openNewBadgeModal}
        onClose={closeNewBadgeModal}
        wearBadge={onWearBadge}
        newBadge={newBadge}
      />
      <RatingForm
        onClose={() => setOpenRatingModal(false)}
        isOpen={openRatingModal}
        order={data}
        orderRate={rate ? rate : undefined}
        onRateSuccess={refreshRate}
      />
      <RequestRefund
        onClose={() => setOpenRequestRefundModal(false)}
        isOpen={openRequestRefundModal}
        order={data}
        requestRefundSuccess={requestRefundSuccess}
      />
    </MyOrderContainer>
  );
};

export default OrderDetail;
