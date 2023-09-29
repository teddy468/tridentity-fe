import { URL_PRODUCT_DETAIL, URL_PRODUCT_DETAIL_V2, URL_PRODUCT_RATINGS } from "@/commons/constants/apiUrl";
import defaultAxios from "@/commons/utils/axios";

export const getProductDetail = async (id: Product["id"]) => {
  return defaultAxios.get<GetProductResponse>(URL_PRODUCT_DETAIL(id));
};

export const getProductRatings = async (id: Product["id"], params?: ProductRatingParams) => {
  return defaultAxios.get<GetProductRatingsResponse>(URL_PRODUCT_RATINGS(id), { params });
};

export const getProductDetailV2 = async (id: Product["id"]) => {
  return defaultAxios.get<GetProductV2Response>(URL_PRODUCT_DETAIL_V2(id));
};
