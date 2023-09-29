import BigNumber from "bignumber.js";

export const format2Digit = (value: string | number | null) => {
  if (!value) return BigNumber(0).toFormat(2, 1);
  return new BigNumber(value || 0).toFormat(2, 1);
};

export const formatLP = (value: string | number) => {
  return Math.round(Number(value));
};

export const roundingNumber = (value: string | number | null) => {
  if (value == 0 || value === null) return 0;
  return Number((Number(value) * 2).toFixed()) / 2;
};