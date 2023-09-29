import { uploadAxios } from "@/commons/utils/axios";

export const uploadSingleFile = async (body: FormData) => {
  return uploadAxios.post<UploadFileResponse>("/storage/upload", body);
};
