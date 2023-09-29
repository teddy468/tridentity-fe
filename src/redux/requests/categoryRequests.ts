import { URL_ALL_CATEGORIES, URL_CATEGORIES } from "@/commons/constants/apiUrl";
import defaultAxios from "../../commons/utils/axios";

export const getCategories = async (params?: PaginationQuery) => {
  return defaultAxios.get<GetCategoriesResponse>(URL_CATEGORIES, { params });
};

export const getAllCategories = async () => {
  return defaultAxios.get<GetCategoriesTreeResponse>(URL_ALL_CATEGORIES);
};
