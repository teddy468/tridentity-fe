import { createSelector } from "@reduxjs/toolkit";

export const getIsAuth = createSelector(
  (state: RootState) => state.user.isAuth,
  (isAuth) => isAuth
);
