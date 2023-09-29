import { call, put, takeLatest } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import * as authRequests from "../requests/authRequests";
import * as userRequests from "../requests/userRequests";
import { userActions } from "../reducer/userReducer";
import { AxiosError, AxiosResponse } from "axios";
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from "@/commons/constants";
import { handleRefreshToken } from "@/commons/utils/axios";
import { getCartsSync } from "./cartSagas";
import { cartActions } from "../reducer/cartReducer";
import Cookies from 'universal-cookie'
import { USER_INFO } from "@/commons/constants/user";

export const getUserAllDataSync = createAction<CallbackPayload<null, null, null>>("user/getUserAllDataSync");
function* getUserAllData() {
  try {
    yield put(getUserInfoAsync({ payload: undefined }));
    yield put(getCartsSync({ payload: null }));
  } catch (error) {}
}

export const loginLocalAsync = createAction<CallbackPayload<null, true, false>>("user/loginLocalAsync");
function* loginLocal({ payload: { onSuccess = () => null, onError = () => null } }: CallbackAction<null, true, false>) {
  try {
    const refreshToken: string = yield call(handleRefreshToken);
    if (!refreshToken) throw {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) throw {};
    const user = jwt<UserDecode>(token);
    yield put(userActions.setUser(user));
    yield put(getUserAllDataSync({ payload: null }));
    onSuccess(true);
  } catch (error) {
    yield put(userActions.logOut());
    onError(false);
  }
}

export const postTriAppLoginAsync = createAction<any>("user/postTridentLoginAsync");

function* postTriAppLogin({ payload: { payload, onSuccess = (data: any) => data, onError = () => null } }: any) {
  try {
    const res: AxiosResponse<any> = yield call(authRequests.loginTriApp, payload);
    if (!res.data) throw new Error("Can not login by QR");
    localStorage.setItem(TOKEN_KEY, res.data.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, res.data.refresh_token);
    const user = jwt<UserDecode>(res.data.access_token);
    
    const userName = res.data.user.username;
    const userAvatar = res.data.user.avatar;
    const cookie = new Cookies();
    cookie.set(USER_INFO.NAME, userName)
    cookie.set(USER_INFO.AVATAR, userAvatar)
    yield put(userActions.setUser(user));
    yield put(userActions.setUserInfo(res.data.user));
    yield put(getUserAllDataSync({ payload: null }));
    onSuccess(res.data);
  } catch (error) {
    onError((error as AxiosError<any>)?.response?.data || error);
  }
}

export const logoutAsync = createAction<CallbackPayload<null, true, false>>("user/logoutAsync");
function* logout({ payload: { onSuccess = () => null, onError = () => null } }: CallbackAction<null, true, false>) {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    yield put(userActions.logOut());
    yield put(cartActions.destroyCart());

    onSuccess(true);
  } catch (error) {
    yield put(userActions.logOut());
    onError(false);
  }
}

export const postUserAsync = createAction<CallbackPayload<any, any, LoginError>>("user/postUserAsync");

function* postUser({
  payload: { payload, onSuccess = () => null, onError = () => null },
}: CallbackAction<any, any, LoginError>) {
  try {
    const res: AxiosResponse<any> = yield call(authRequests.updateUsers, payload);

    onSuccess(res.data);
  } catch (error) {
    console.log(error as AxiosError<any>);
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const postDefaultAddressAsync =
  createAction<CallbackPayload<AddressDefaultBody, CreateUpdateAddressResponse, LoginError>>(
    "user/postDefaultAddressAsync"
  );

function* postDefaultAddress({
  payload: { payload, onSuccess = () => null, onError = () => null },
}: CallbackAction<AddressDefaultBody, CreateUpdateAddressResponse, LoginError>) {
  try {
    const res: AxiosResponse<any> = yield call(authRequests.createDefaultAddress, payload);
    console.log({ res });
    onSuccess(res.data);
  } catch (error) {
    console.log(error as AxiosError<any>);
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const putDefaultAddressAsync =
  createAction<CallbackPayload<AddressDefaultBody, CreateUpdateAddressResponse, LoginError>>(
    "user/putDefaultAddressAsync"
  );

function* putDefaultAddress({
  payload: { payload, onSuccess = () => null, onError = () => null },
}: CallbackAction<AddressDefaultBody, CreateUpdateAddressResponse, LoginError>) {
  try {
    const res: AxiosResponse<any> = yield call(authRequests.updateDefaultAddress, payload);
    console.log({ res });
    onSuccess(res.data);
  } catch (error) {
    console.log(error as AxiosError<any>);
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const getUserInfoAsync =
  createAction<CallbackPayload<undefined, GetUserInfoResponse, GetUserInfoError>>("user/getUserInfoAsync");

function* getUserInfo({
  payload: { onSuccess = () => null, onError = () => null },
}: CallbackAction<undefined, GetUserInfoResponse, GetUserInfoError>) {
  try {
    const res: AxiosResponse<GetUserInfoResponse> = yield call(userRequests.getUserInfo);

    yield put(userActions.setUserInfo(res.data));
    onSuccess(res.data);
  } catch (error) {
    yield put(userActions.logOut());
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const putUpdatePreferencesAsync =
  createAction<CallbackPayload<any, any, putUpdatePreferencesError>>("user/UpdatePreferencesAsync");

function* putUpdatePreferences({
  payload: { payload, onSuccess = () => null, onError = () => null },
}: CallbackAction<any[], any, putUpdatePreferencesError>) {
  try {
    const res: AxiosResponse<any> = yield call(authRequests.putUpdatePreferences, payload);
    onSuccess(res.data);
  } catch (error) {
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const getVerifyEmailAsync =
  createAction<CallbackPayload<string, VerifyEmailResponse, VerifyEmailError>>("user/getVerifyEmailAsync");

function* getVerifyEmail({
  payload: { payload, onSuccess = data => data, onError = () => null },
}: CallbackAction<string, VerifyEmailResponse, VerifyEmailError>) {
  try {
    const res: AxiosResponse<VerifyEmailResponse> = yield call(authRequests.verifyToken, payload);
    onSuccess(res.data);
  } catch (error) {
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const putUpdateUserBasicAsync =
  createAction<CallbackPayload<UpdateUserBasicBody, UpdateUserBasicResponse, UpdateUserBasicError>>(
    "user/putUpdateUserBasicAsync"
  );
function* putUpdateUserBasic({
  payload: { payload, onSuccess = () => null, onError = () => null },
}: CallbackAction<UpdateUserBasicBody, UpdateUserBasicResponse, UpdateUserBasicError>) {
  try {
    const res: AxiosResponse<UpdateUserBasicResponse> = yield call(userRequests.updateUserBasic, payload);
    onSuccess(res.data);
    yield put(userActions.setUserInfo(res.data));
    yield put(getUserInfoAsync({ payload: undefined }));
  } catch (error) {
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const getUserLoyaltyPointAsync = createAction<
  CallbackPayload<null, GetLoyaltyPointResponse, GetLoyaltyPointError>
>("user/getUserLoyaltyPointAsync");
function* getUserLoyaltyPoint({
  payload: { onSuccess = () => null, onError = () => null },
}: CallbackAction<null, GetLoyaltyPointResponse, GetLoyaltyPointError>) {
  try {
    const res: AxiosResponse<GetLoyaltyPointResponse> = yield call(userRequests.getUserLoyaltyPoint);
    yield put(userActions.setLoyaltyPoint(res.data));
    onSuccess(res.data);
  } catch (error) {
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const postRateProductAsync =
  createAction<CallbackPayload<OrderProductRating, any, ResponseError>>("user/postRateProductAsync");

function* postRateProduct({
  payload: { payload, onSuccess = () => null, onError = () => null },
}: CallbackAction<OrderProductRating, any, ResponseError>) {
  try {
    const res: AxiosResponse<any> = yield call(authRequests.postRateProduct, payload, payload.orderId);
    onSuccess(res.data);
  } catch (error) {
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const postRateStoreAsync =
  createAction<CallbackPayload<OrderStoreRating, any, ResponseError>>("user/postRateStoreAsync");

function* postRateStore({
  payload: { payload, onSuccess = () => null, onError = () => null },
}: CallbackAction<OrderStoreRating, any, ResponseError>) {
  try {
    const res: AxiosResponse<any> = yield call(authRequests.postRateStore, payload, payload.orderId);
    onSuccess(res.data);
  } catch (error) {
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const postRefundRequestAsync =
  createAction<CallbackPayload<RefundRequestBody, any, ResponseError>>("user/postRefundRequestAsync");

function* postRefundRequest({
  payload: { payload, onSuccess = () => null, onError = () => null },
}: CallbackAction<RefundRequestBody, any, ResponseError>) {
  try {
    const res: AxiosResponse<any> = yield call(authRequests.postRefundRequest, payload, payload.orderId);
    onSuccess(res.data);
  } catch (error) {
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const getMembershipAvatarsAsync = createAction<
  CallbackPayload<null, MembershipAvatarResponse, MembershipAvatarError>
>("user/getMembershipAvatarsAsync");
function* getMembershipAvatars({
  payload: { onSuccess = () => null, onError = () => null },
}: CallbackAction<null, MembershipAvatarResponse, MembershipAvatarError>) {
  try {
    const res: AxiosResponse<MembershipAvatarResponse> = yield call(userRequests.getMembershipAvatars);
    yield put(userActions.setMembershipAvatars(res.data));
    onSuccess(res.data);
  } catch (error) {
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export const getUserMembershipsAsync =
  createAction<CallbackPayload<null, UserMembershipResponse, UserMembershipError>>("user/getUserMembershipsAsync");
function* getUserMembership({
  payload: { onSuccess = () => null, onError = () => null },
}: CallbackAction<null, UserMembershipResponse, UserMembershipError>) {
  try {
    const res: AxiosResponse<UserMembershipResponse> = yield call(userRequests.getUserMembership);
    yield put(userActions.setUserMembership(res.data));
    onSuccess(res.data);
  } catch (error) {
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export default function* userSagas() {
  yield takeLatest(getUserAllDataSync, getUserAllData);
  yield takeLatest(loginLocalAsync, loginLocal);
  yield takeLatest(logoutAsync, logout);
  yield takeLatest(getUserInfoAsync, getUserInfo);
  yield takeLatest(getVerifyEmailAsync, getVerifyEmail);
  yield takeLatest(putUpdateUserBasicAsync, putUpdateUserBasic);
  yield takeLatest(getUserLoyaltyPointAsync, getUserLoyaltyPoint);
  yield takeLatest(postUserAsync, postUser);
  yield takeLatest(putUpdatePreferencesAsync, putUpdatePreferences);
  yield takeLatest(postDefaultAddressAsync, postDefaultAddress);
  yield takeLatest(putDefaultAddressAsync, putDefaultAddress);
  yield takeLatest(postRateProductAsync, postRateProduct);
  yield takeLatest(postRateStoreAsync, postRateStore);
  yield takeLatest(postRefundRequestAsync, postRefundRequest);
  yield takeLatest(getMembershipAvatarsAsync, getMembershipAvatars);
  yield takeLatest(getUserMembershipsAsync, getUserMembership);
  yield takeLatest(postTriAppLoginAsync, postTriAppLogin);
}
