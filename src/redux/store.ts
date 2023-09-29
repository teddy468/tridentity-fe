import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware, { Task } from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import { createPersistReducer } from "./reducer";
import saga from "./saga";

declare module "redux" {
  export interface Store {
    sagaTask?: Task;
  }
}

export const makeStore = () => {
  const persistedReducer = createPersistReducer();
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(sagaMiddleware),
  });
  store.sagaTask = sagaMiddleware.run(saga);

  return store;
};

export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;

export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];

export const wrapper = createWrapper(makeStore, { debug: false });
