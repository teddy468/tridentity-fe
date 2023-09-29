import { URL_MERCHANT_STORE_DETAIL, URL_MERCHANT_STORES, URL_MERCHANT_STORE_ADDRESS } from "@/commons/constants/apiUrl";
import defaultAxios from "@/commons/utils/axios";

export const getMerchantDetail = async (id: Store["id"]) => {
  return defaultAxios.get<GetMerchantResponse>(URL_MERCHANT_STORE_DETAIL(id));
};
export const getMerchantStoreAddresses = async (id: MerchantStore["id"]) => {
  return defaultAxios.get<GetMerchantAddressesResponse>(URL_MERCHANT_STORE_ADDRESS(id));
};
export const getMerchantStores = async (merchantId: Store["id"], params?: GetMerchantStoreParams) => {
  return defaultAxios.get(URL_MERCHANT_STORES(merchantId), {
    params,
  });
};
