export const getImageSrc = (src?: string) => {
  if (!src) return "";
  return "http://" + src;
};
