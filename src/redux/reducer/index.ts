import { combineReducers } from "redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { persistReducer } from "redux-persist";
import { WebStorage } from "redux-persist/lib/types";
import user from "./userReducer";
import system from "./systemReducer";
import cart from "./cartReducer";

const createPersistStorage = (): WebStorage => {
  if (typeof window === "undefined") {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }

  return createWebStorage("local");
};

const persistConfig = {
  key: "root",
  storage: createPersistStorage(),
  blacklist: ["system"],
};

export const createPersistReducer = () => {
  const reducer = combineReducers({
    user,
    system,
    cart,
  });

  return persistReducer(persistConfig, reducer);
};
