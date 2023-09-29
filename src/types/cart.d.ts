declare interface CartVariant {
  product_item_id: ProductVariant["id"];
  quantity: number;
  detail: ProductVariant;
}

declare interface CartVariantV2 {
  attribute_name: string;
  attribute_value: string;
  price: number;
  exist_total_quantity: number;
}
declare interface CartProduct {
  product_item_id: ProductVariant["id"];
  quantity: number;
  detail: Product;
  product: Product;
  bundles: CartVariant[];
}

declare interface CartProductV2 {
  create_time: string;
  product_id: number;
  quantity: number;
  product_detail: ProductV2;
  bundles: CartVariantV2[];
}

declare interface CartItem {
  id: number;
  create_time: string;
  update_time: string;
  merchant_store_id: number;
  meta?: { [key: string]: string };
  product_items: CartProductV2[];
  store: MerchantStore;
}

declare interface CartList {
  [key: Store["name"]]: [CartItem];
}

declare interface AddCartBody {
  merchant_store_id: MerchantStore["id"];
  meta?: { [key: string]: string };
  product_items: {
    product_item_id: number;
    quantity: number;
    bundles: {
      product_item_id: number;
      quantity: number;
    }[];
  }[];
}

declare interface AddCartResponse {}

declare interface AddCartError extends ResponseError {}

declare interface GetCartsResponse extends CartList {}

declare interface GetCartsError {}

declare interface GetCartsByMerchantResponse {}

declare interface GetCartsByMerchantError {}

declare interface RemoveCartResponse {}

declare interface RemoveCartError {}

declare interface CreateUpdateCartBodyV2 {
  merchant_store_id: MerchantStore["id"];
  meta?: { [key: string]: string };
  product_items: {
    product_id: number;
    quantity: number;
    bundles: {
      attribute_name: string;
      attribute_value: string;
    }[];
  }[];
}

declare interface CartListV2 {
  [key: MerchantStore["name"]]: [CartItem];
}

declare interface AddCartResponseV2 {}

declare interface UpdateCartResponse extends CreateUpdateCartBodyV2 {
  id: number;
}

declare interface UpdateCartError extends ResponseError {}

declare interface GetCartsV2Response extends CartListV2 {}
