import { call, put, takeLatest } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import * as cartRequests from "../requests/cartRequests";
import * as orderRequests from "../requests/orderRequests";
import { AxiosError, AxiosResponse } from "axios";
import { cartActions } from "../reducer/cartReducer";

export const getCartsSync = createAction<CallbackPayload<null, GetCartsV2Response, GetCartsError>>("cart/getCartsSync");
function* getCarts({
  payload: { onSuccess = () => null, onError = () => null },
}: CallbackAction<null, GetCartsV2Response, GetCartsError>) {
  try {
    yield put(cartActions.setLoading(true));
    const res: AxiosResponse<GetCartsV2Response> = yield call(cartRequests.getUserCarts);
    yield put(cartActions.initialCarts(res.data));
    onSuccess(res.data);
  } catch (error) {
    yield put(cartActions.initialCarts({}));
    console.log(error as AxiosError<any>);
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const getPlatformMinOrderSync =
  createAction<CallbackPayload<null, GetPlatformMinOderResponse, GetPlatformMinOrderError>>(
    "cart/getPlatformMinOrderSync"
  );
function* getPlatformMinOrder({
  payload: { onSuccess = () => null, onError = () => null },
}: CallbackAction<null, GetPlatformMinOderResponse, GetPlatformMinOderError>) {
  try {
    const res: AxiosResponse<GetPlatformMinOderResponse> = yield call(orderRequests.getPlatformMinOrder);
    yield put(cartActions.setPlatformMinOrder(res.data));
    onSuccess(res.data);
  } catch (error) {
    yield put(cartActions.setPlatformMinOrder({ min_order: 0 }));
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const addCartSync =
  createAction<CallbackPayload<CreateUpdateCartBodyV2, AddCartResponseV2, AddCartError>>("cart/addCartSync");
function* addUserCart({
  payload: { payload, onSuccess = () => null, onError = () => null },
}: CallbackAction<CreateUpdateCartBodyV2, AddCartResponse, AddCartError>) {
  try {
    yield put(cartActions.setLoading(true));
    const res: AxiosResponse<AddCartResponseV2> = yield call(cartRequests.postCreateUpdateCart, payload);
    yield put(getCartsSync({ payload: null }));
    onSuccess(res.data);
  } catch (error) {
    console.log(error as AxiosError<any>);
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const updateCartSync =
  createAction<CallbackPayload<CreateUpdateCartBodyV2, UpdateCartResponse, AddCartError>>("cart/updateCartSync");
function* updateUserCart({
  payload: { payload, onSuccess = () => null, onError = () => null },
}: CallbackAction<CreateUpdateCartBodyV2, AddCartResponse, AddCartError>) {
  try {
    yield put(cartActions.setLoading(true));
    const res: AxiosResponse<UpdateCartResponse> = yield call(cartRequests.postCreateUpdateCart, payload);
    yield put(cartActions.updateCart(res.data));
    onSuccess(res.data);
  } catch (error) {
    console.log(error as AxiosError<any>);
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const removeCartSync =
  createAction<CallbackPayload<MerchantStore["id"], RemoveCartResponse, RemoveCartError>>("cart/removeCartSync");
function* removeCart({
  payload: { payload, onSuccess = () => null, onError = () => null },
}: CallbackAction<MerchantStore["id"], RemoveCartResponse, RemoveCartError>) {
  try {
    yield put(cartActions.setLoading(true));
    const res: AxiosResponse<RemoveCartResponse> = yield call(cartRequests.removeCart, payload);
    yield put(getCartsSync({ payload: null }));
    onSuccess(res.data);
  } catch (error) {
    console.log(error as AxiosError<any>);
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const setTotalBillSync = createAction<CallbackPayload<TotalBill>>("cart/setTotalBillSync");
function* setTotalBill({
  payload: { payload, onSuccess = () => null, onError = () => null },
}: CallbackAction<TotalBill>) {
  try {
    onSuccess(payload);
  } catch (error) {
    onError(error);
  }
}

export const getShippingDetailSync =
  createAction<CallbackPayload<ShippingFeeGrabBody, ShippingFeeResponseGrab>>("cart/getShippingDetailSync");
function* getShippingDetail({
  payload: { payload, onSuccess = () => null, onError = () => null },
}: CallbackAction<ShippingFeeGrabBody, ShippingFeeResponseGrab>) {
  try {
    const res: AxiosResponse<ShippingFeeResponseGrab> = yield call(orderRequests.getShippingFeeGrab, payload);
    onSuccess(res.data);
  } catch (error) {
    console.log(error as AxiosError<any>);
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const checkoutSync =
  createAction<CallbackPayload<CreateOrderBody, CreateOrderResponseV2, CreateOrderError>>("cart/checkoutSync");
function* checkout({
  payload: { payload, onSuccess = () => null, onError = () => null },
}: CallbackAction<CreateOrderBody, CreateOrderResponseV2, CreateOrderError>) {
  try {
    const res: AxiosResponse<CreateOrderResponseV2> = yield call(orderRequests.postCreateOrderV2, payload);
    onSuccess(res.data);
  } catch (error) {
    console.log(error as AxiosError<any>);
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const completeOrderSync =
  createAction<CallbackPayload<OrderV2["id"], CompleteOrderResponse, CompleteOrderError>>("order/completeOrder");
function* completeOrder({
  payload: { payload, onSuccess = () => null, onError = () => null },
}: CallbackAction<OrderV2["id"], CompleteOrderResponse, CompleteOrderError>) {
  try {
    const res: AxiosResponse<CompleteOrderResponse> = yield call(orderRequests.putCompleteOrder, payload);
    onSuccess(res.data);
  } catch (error) {
    console.log(error as AxiosError<any>);
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const wearBadgeSync =
  createAction<CallbackPayload<BadgeItem["id"], WearBadgeResponse, WearBadgeError>>("badge/wearBadge");
function* wearBadge({
  payload: { payload, onSuccess = () => null, onError = () => null },
}: CallbackAction<BadgeItem["id"], WearBadgeResponse, WearBadgeError>) {
  try {
    const res: AxiosResponse<CompleteOrderResponse> = yield call(orderRequests.wearBadge, payload);
    onSuccess(res.data);
  } catch (error) {
    console.log(error as AxiosError<any>);
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const wearBadgeMultiSync =
  createAction<CallbackPayload<WearBadgeMultiRequest, WearBadgeResponse, WearBadgeError>>("badge/wearBadgeMulti");
function* wearBadgeMulti({
  payload: { payload, onSuccess = () => null, onError = () => null },
}: CallbackAction<WearBadgeMultiRequest, WearBadgeResponse, WearBadgeError>) {
  try {
    const res: AxiosResponse<CompleteOrderResponse> = yield call(orderRequests.wearBadgeMulti, payload);
    onSuccess(res.data);
  } catch (error) {
    console.log(error as AxiosError<any>);
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export default function* userSagas() {
  yield takeLatest(getCartsSync, getCarts);
  yield takeLatest(addCartSync, addUserCart);
  yield takeLatest(updateCartSync, updateUserCart);
  yield takeLatest(removeCartSync, removeCart);
  yield takeLatest(checkoutSync, checkout);
  yield takeLatest(completeOrderSync, completeOrder);
  yield takeLatest(wearBadgeSync, wearBadge);
  yield takeLatest(wearBadgeMultiSync, wearBadgeMulti);
  yield takeLatest(getPlatformMinOrderSync, getPlatformMinOrder);
  yield takeLatest(setTotalBillSync, setTotalBill);
  yield takeLatest(getShippingDetailSync, getShippingDetail);
}
