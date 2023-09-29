import {
  PLATFORM_MIN_ORDER,
  URL_SHIPPING_FEE
} from "@/commons/constants/apiUrl";
import defaultAxios from "../../commons/utils/axios";

export const postCreateOrder = async (body: CreateOrderBody) => {
  return defaultAxios.post<CreateOrderResponse>("orders", body);
};

export const getMyOrders = async (query: Query) => {
  return defaultAxios.get<OrderV2>("orders", { params: query });
};

export const getPlatformMinOrder = async () => {
  return defaultAxios.get<GetPlatformMinOderResponse>(PLATFORM_MIN_ORDER);
};

export const getShippingFeeLalamove = async (body: ShippingFeeLalamoveBody) => {
  return defaultAxios.post<ShippingFeeLalamoveResponse>(URL_SHIPPING_FEE.LALAMOVE, body);
};

export const getShippingFeeGrab = async (body: ShippingFeeGrabBody) => {
  return defaultAxios.post<ShippingFeeResponseGrab>(URL_SHIPPING_FEE.GRAB, body);
};

export const putCompleteOrder = async (id: OrderV2["id"]) => {
  return defaultAxios.put<CompleteOrderResponse>(`orders/${id}/complete`);
};

export const wearBadge = async (id: BadgeItem["id"]) => {
  return defaultAxios.put<WearBadgeResponse>(`badges/${id}/equip`);
};

export const wearBadgeMulti = async (body: WearBadgeMultiRequest) => {
  return defaultAxios.put<WearBadgeResponse>(`badges/equip-multiple`, body);
};

export const postCreateOrderV2 = async (body: CreateOrderBody) => {
  return defaultAxios.post<CreateOrderResponseV2>("v2/orders", body);
};
