import defaultAxios from "../../commons/utils/axios";

export const removeCart = async (merchantStoreId: MerchantStore["id"]) => {
  return defaultAxios.delete<RemoveCartResponse>(`merchant-stores/${merchantStoreId}/cart`);
};
export const getUserCarts = async () => {
  return defaultAxios.get<GetCartsV2Response>("v2/carts");
};

export const postCreateUpdateCart = async (body: CreateUpdateCartBodyV2) => {
  return defaultAxios.post<UpdateCartResponse>("v2/carts", body);
};
