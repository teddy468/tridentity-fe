export const formatPrice = (value?: number | string) => {
  if (!value) return "0";
  return new Intl.NumberFormat("vi").format(value as any);
};

export const formatNotifyNumber = (value: number) => {
  return value > 99 ? "99+" : value;
};
