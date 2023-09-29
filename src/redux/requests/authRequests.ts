import defaultAxios from "../../commons/utils/axios";

export const verifyToken = async (token: string) => {
  return defaultAxios.get(`auth/verify-token/${token}`);
};

export const loginTriApp = async (body: any) => {
  return defaultAxios.post<any>(`auth/verify-auth-token`, body);
};

export const updateUsers = async (body: LoginBody) => {
  return defaultAxios.put<any>("/users", body);
};

export const updateDefaultAddress = async (body: AddressDefaultBody) => {
  return defaultAxios.put<CreateUpdateAddressResponse>("/user-shipping-addresses/" + body.id, body);
};

export const createDefaultAddress = async (body: AddressDefaultBody) => {
  return defaultAxios.post<CreateUpdateAddressResponse>("/user-shipping-addresses", body);
};

export const putUpdatePreferences = async (body: any) => {
  return defaultAxios.put<any>(`users/preferences`, body);
};

export const postRateProduct = async (body: OrderProductRating, orderId: string) => {
  return defaultAxios.post<any>(`orders/${orderId}/rate`, body);
};

export const postRateStore = async (body: OrderStoreRating, orderId: string) => {
  return defaultAxios.post<any>(`orders/${orderId}/rate/store`, body);
};

export const postRefundRequest = async (body: RefundRequestBody, orderId: string) => {
  return defaultAxios.post<any>(`orders/${orderId}/request-refund`, body);
};
