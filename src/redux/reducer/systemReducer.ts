import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

type AuthModalType = "login" | "not-active" | "warning-cart-not-empty" | null;

interface SystemState {
  categories: CategoryTree[];
  hydrate: boolean;
  authModal: AuthModalType;
  registerInfo: RegisterBody | null;
  toasts: ToastItem[];
  verificationInfo: string | null;
  verificationEmail: string | null;
  verificationCode: string | null;
  removeCardId: number | -1;
  confirmRemoveCardId: number | -1;
  addCardSuccess: string | null;
  checkoutResult: string | "none";
  loading: boolean;
  newCardId: number | -1;
  newNotiCount: number | 0;
}

const initialState: SystemState = {
  categories: [],
  hydrate: false,
  authModal: null,
  registerInfo: null,
  verificationEmail: null,
  toasts: [],
  verificationInfo: null,
  verificationCode: null,
  removeCardId: -1,
  confirmRemoveCardId: -1,
  addCardSuccess: null,
  checkoutResult: "none",
  loading: false,
  newCardId: -1,
  newNotiCount: 0,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<CategoryTree[]>) {
      return {
        ...state,
        categories: action.payload,
      };
    },
    setDisplayAuthModal(state, action: PayloadAction<AuthModalType>) {
      return {
        ...state,
        authModal: action.payload,
      };
    },
    setVerificationInfo(state, action: PayloadAction<string>) {
      return {
        ...state,
        verificationInfo: action.payload,
      };
    },
    setLoading(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setCheckoutResult(state, action: PayloadAction<string>) {
      return {
        ...state,
        checkoutResult: action.payload,
      };
    },
    setNewNotiCount(state, action: PayloadAction<number>) {
      return {
        ...state,
        newNotiCount: action.payload,
      };
    },
    addToast: (state, action: PayloadAction<Required<ToastItem>>) => ({
      ...state,
      toasts: [action.payload, ...state.toasts],
    }),
    removeToast: (state, action: PayloadAction<number>) => ({
      ...state,
      toasts: state.toasts.filter(item => item.id !== action.payload),
    }),
  },
  extraReducers(builder) {
    builder.addCase(HYDRATE, (state, action) => {
      if (!state.hydrate)
        return {
          ...state,
          ...(action as any).payload.system,
          hydrate: true,
        };
      return state;
    });
  },
});

export const systemActions = systemSlice.actions;

export default systemSlice.reducer;
