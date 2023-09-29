import { all, fork } from "redux-saga/effects";
import systemSagas from "./systemSagas";
import userSagas from "./userSagas";
import cartSagas from "./cartSagas";

export default function* rootSagas() {
  yield all([fork(userSagas), fork(systemSagas), fork(cartSagas)]);
}
