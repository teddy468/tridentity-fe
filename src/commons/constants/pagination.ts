export enum ORDER_BYS {
  ASC = "ASC",
  DESC = "DESC",
}
export const ORDER_BY_OPTIONS: { value: ORDER_BYS; label: string }[] = [
  { value: ORDER_BYS.ASC, label: "Older" },
  { value: ORDER_BYS.DESC, label: "Recent" },
];
