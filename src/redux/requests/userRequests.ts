import { URL_USER_MEMBERSHIP } from "@/commons/constants/apiUrl";
import defaultAxios from "../../commons/utils/axios";

export const getUserInfo = async () => {
  return defaultAxios.get<GetUserInfoResponse>("users");
};

export const updateUserBasic = async (body: UpdateUserBasicBody) => {
  return defaultAxios.put<UpdateUserBasicResponse>("users/first-time", body);
};

export const getUserLoyaltyPoint = async () => {
  return defaultAxios.get<GetLoyaltyPointResponse>("user-loyalty-points");
};

export const upgradeMembership = async (body: UpgradeMembershipBody) => {
  return defaultAxios.put<UpgradeMembershipResponse>("user-memberships/upgrade", body);
};

export const deleteUserShippingAddress = async (id: number) => {
  return defaultAxios.delete<any>(`user-shipping-addresses/${id}`);
};

export const requestVerifyPhone = async (phoneNumber: string) => {
  return defaultAxios.get<any>(`users/request-verify-phone/${phoneNumber}`);
};

export const verifyPhone = async (phone: string, pin: string) => {
  return defaultAxios.put<any>(`users/verify-phone`, { phone, pin });
};

export const getMembershipAvatars = async () => {
  return defaultAxios.get<MembershipAvatar[]>("user-memberships/avatars");
};

export const getUserMembership = async () => {
  return defaultAxios.get<UserMembership>(URL_USER_MEMBERSHIP);
};
