import { PaletteMode } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: UserDecode | null;
  initalized: boolean;
  loading: boolean;
  userInfo: UserInfo | null;
  loyaltyPoint: LoyaltyPoint | null;
  theme: PaletteMode;
  onStoreChat: MerchantStore["id"] | null;
  newMessage: number;
  userMembership: UserMembership | null;
  membershipAvatars: MembershipAvatar[];
}

const initialState: UserState = {
  user: null,
  initalized: false,
  loading: true,
  userInfo: null,
  loyaltyPoint: null,
  theme: "dark",
  onStoreChat: null,
  newMessage: 0,
  membershipAvatars: [],
  userMembership: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserDecode>) {
      return {
        ...state,
        user: action.payload,
        initalized: true,
      };
    },
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
    setLoyaltyPoint(state, action: PayloadAction<LoyaltyPoint>) {
      return {
        ...state,
        loyaltyPoint: action.payload,
      };
    },
    setonStoreChat(state, action: PayloadAction<MerchantStore["id"] | null>) {
      return {
        ...state,
        onStoreChat: action.payload,
      };
    },
    seNewMessage(state, action: PayloadAction<number>) {
      return {
        ...state,
        newMessage: action.payload,
      };
    },
    setMembershipAvatars(state, action: PayloadAction<MembershipAvatar[]>) {
      return {
        ...state,
        membershipAvatars: action.payload,
      };
    },
    setUserMembership(state, action: PayloadAction<UserMembership>) {
      return {
        ...state,
        userMembership: action.payload,
      };
    },
    logOut(state) {
      return {
        ...state,
        user: null,
        userInfo: null,
      };
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
