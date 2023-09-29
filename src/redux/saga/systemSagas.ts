import { call, put, takeLatest } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import * as categoryRequests from "../requests/categoryRequests";
import { systemActions } from "../reducer/systemReducer";
import { AxiosError, AxiosResponse } from "axios";

export const getAllCategoriesAsync =
  createAction<CallbackPayload<undefined, GetCategoriesTreeResponse, GetCategoriesTreeError>>(
    "system/getAllCategoriesAsync"
  );

function* getAllCategories({
  payload: { onSuccess = () => null, onError = () => null },
}: CallbackAction<undefined, GetCategoriesTreeResponse, GetCategoriesError>) {
  try {
    const res: AxiosResponse<GetCategoriesTreeResponse> = yield call(categoryRequests.getAllCategories);
    yield put(systemActions.setCategories(res.data));
    onSuccess(res.data);
  } catch (error) {
    onError((error as AxiosError<any>)?.response?.data);
  }
}

export default function* systemSagas() {
  yield takeLatest(getAllCategoriesAsync, getAllCategories);
}
