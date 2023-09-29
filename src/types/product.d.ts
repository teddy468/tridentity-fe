type MAIN_TAG = keyof typeof import("@/commons/constants/product").MAIN_TAG;

declare interface ProductItem {
  id: number;
  name: string;
  description: string;
  total_quantity: number;
  price: number;
  attributes: { [key: string]: string };
  images: string[];
  status: number;
  reviews: number;
  rating: number;
  merchant_store_id: number;
  settings: { is_featured: boolean };
  type: ProductItemType;
  store: {
    id: number;
    merchant: {
      id: number;
      name: string;
    };
    reviews: number;
    rating: number;
    merchant_id: number;
    name: string;
  };
  is_sold_out: boolean;
  main_tags: MAIN_TAG[];
  onGoingCampaigns: CampaignInfo[];
}
enum ProductItemType {
  MAIN = 1,
  SUB = 0,
}
declare interface Product extends ProductItem {
  brand: string;
  items: Array<ProductVariant>;
  product_id: number;
}

declare interface ProductVariant extends Product {
  total_quantity: number;
}

declare interface GetProductResponse extends Product {}

declare type GetProductsResponse = PaginationData<ProductItem>;

declare interface GetProductsError {}

declare interface GetProductError {}

declare interface Variant {
  name: string;
  values: Array<string>;
}

declare type GetProductRatingsResponse = PaginationData<ProductRating>;
declare interface ProductRating {
  create_time: string;
  id: number;
  product_id: number;
  user_id: string;
  rating: number;
  description: string;
  user?: {
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

declare interface StoreRatingOrder {
  id: string;
  user_id: string;
  user?: {
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

declare interface StoreRating {
  create_time: string;
  id: number;
  merchant_store_id: number;
  user_id: string;
  rating: number;
  order_id: string;
  description: string;
  order: StoreRatingOrder;
  data: { attachments: string[] };
}

declare interface ProductRatingParams {
  page?: number;
  perPage?: number;
  paginationMetadataStyle?: "header" | "body";
  sort_by?: "rating" | "create_time";
  order_by?: "asc" | "desc";
}

declare interface ProductV2 {
  create_time: string;
  update_time: string;
  id: number;
  name: string;
  description: string;
  merchant_store_id: number;
  category_id: number;
  thumbnail: string;
  brand: string;
  manufacturer: string;
  manufacturer_address: string;
  product_warranty: string;
  shipment_weight: number;
  width: number;
  height: number;
  depth: number;
  lead_time: number;
  price: number;
  condition: number;
  slug: string;
  day_to_prepare_order: number;
  sku: string;
  attributes: Array<AttributeV2>;
  items: AttributeVariantV2[];
  images: Array<string>;
  videos: Array<string>;
  settings: {
    is_featured: boolean;
  };
  rating: number;
  reviews: number;
  total_sales: number;
  status: number;
  main_tags: MAIN_TAG[];
  sub_tags: string[];
  is_sold_out: boolean;
  store: {
    id: number;
    merchant: {
      id: number;
      name: string;
    };
    merchant_id: number;
    name: string;
    rating: number;
    reviews: number;
  };
  category: {
    create_time: string;
    update_time: string;
    id: numner;
    name: string;
    description: string;
    cover: string;
    image: string;
    parent_category_id: number;
    attributes: {};
    settings: {
      is_top: boolean;
      is_highlight: boolean;
    };
    status: number;
  };
  onGoingCampaigns: CampaignInfo[];
}

declare interface CampaignInfo {
  id: number;
  campaign_id: number;
  single_lp_amount: number;
  lp_amount: number;
  used_lp_amount: number;
  campaign: Campaign;
}

declare interface Campaign {
  start_date: string;
  end_date: string;
  status: number;
  name: string;
  id: number;
}

declare interface AttributeV2 {
  attribute_name: string;
  is_required: boolean;
  is_multiple_choice: boolean;
  variants: Array<AttributeVariantV2>;
}

declare interface AttributeVariantV2 {
  create_time: string;
  update_time: string;
  id: number;
  product_id: number;
  name: string;
  description: string;
  attribute_name: string;
  attribute_value: string;
  current_quantity: number;
  total_quantity: number;
  price: number;
  attributes: { [key: string]: string };
  images: Array<string>;
  sku: string;
}

declare interface SearchProduct {
  searchValue: string;
}

declare interface GetProductV2Response extends ProductV2 {}

declare interface ProductDashboardConfig {
  position: number;
  product: ProductV2 | null;
}

declare interface NotificationMessage {
  id: number;
  create_time: string;
  update_at: string;
  read_at: string;
  notify_at: string;
  content: { message: string; orderId: number; tier: string; lp: number; storeName: string };
  meta: { orderId: number; eventName: string };
}
