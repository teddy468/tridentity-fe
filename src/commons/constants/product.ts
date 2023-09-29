export enum PRODUCT_SORT_BYS {
  create_time = "create_time",
  price = "price",
}
export const SORT_BY_OPTIONS: { value: PRODUCT_SORT_BYS; label: string }[] = [
  { value: PRODUCT_SORT_BYS.create_time, label: "Created At" },
  { value: PRODUCT_SORT_BYS.price, label: "Price" },
];

export enum MAIN_TAG {
  hot = "Hot",
  best_seller = "Best Seller",
  new = "New Dish",
}
