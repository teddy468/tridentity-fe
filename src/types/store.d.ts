declare type Direction = "horizontal" | "vertical" | "verticalWithFavorite";

declare interface StoreItem {
  id: number;
  name: string;
  description: string;
  rating: number;
  logo: string;
  tag?: string;
  reviews: number;
  banners: string[];
  tags: string[];
  isFavorite: boolean;
}

declare interface StoreItemNear extends StoreItem {
  distance_in_meter: number;
}

declare interface MerchantStoreConfig {
  merchantStore: StoreItem | null;
  position: number;
}
declare interface Store extends StoreItem {
  service_supports: any;
  addresses: MerchantAddress[];
  address: string;
  close_at: string;
  open_at: string;
  id: number;
  name: string;
  description: string;
  rating: number;
  logo: string;
  banners: string[];
  categoriesLevel1: Category[];
  categoriesLevel2?: Category[];
  categoriesLevel3?: Category[];
  closingHoursFri: string | null;
  closingHoursMon: string | null;
  closingHoursSat: string | null;
  closingHoursSun: string | null;
  closingHoursThu: string | null;
  closingHoursTue: string | null;
  closingHoursWed: string | null;
  isOpen24Hours: boolean;
  openingHoursFri: string | null;
  openingHoursMon: string | null;
  openingHoursSat: string | null;
  openingHoursSun: string | null;
  openingHoursThu: string | null;
  openingHoursTue: string | null;
  openingHoursWed: string | null;
}

declare interface StoreDetail extends Store {
  [key: string];
}

declare interface MerchantsQuery extends Query {
  keyword?: string;
  category_ids?: string;
  min_price?: number;
  max_price?: number;
  sort_by?: SortMerchantTypes;
  order_by?: ORDER_BYS;
  is_top?: boolean;
  lat?: number;
  lng?: number;
  address?: string;
  is_exclude_empty_store?: boolean;
}

declare type SortMerchantTypes = "rating" | "reviews" | "likes" | "create_time" | "name" | "distance";

declare interface MerchantStore {
  merchant_id: number;
  id: number;
  name: string;
  create_time: string;
  update_time: string;
  description: string;
  merchant_store_id: number;
  address: string;
  phone: string;
  status: number;
  open_at: string;
  close_at: string;
  logo: string;
  service_supports: string[];
  min_order: number | null;
  merchant: Store;
}

declare interface GetMerchantResponse extends Store {}

declare type GetMerchantsResponse = PaginationData<StoreItem>;

declare type GetMerchantStoreResponse = PaginationData<MerchantStore>;

declare interface GetMerchantsError {}

declare interface GetMerchantError {}

declare interface MerchantAddress {
  service_supports: ["delivery", "pickup", "dine in"];
  id: number;
  merchant_store_id: number;
  city_or_province: string;
  address: string;
  description: string;
  phone: string;
  country: string;
  coordinate: {
    lat: string;
    lng: string;
  };
  status: number;
}

declare interface LikeMerchant {
  create_time: string;
  id: number;
  name: string;
  ratting: number;
  likes: number;
}

declare interface LikeMerchantAction {
  is_liked: boolean;
}

declare type GetMerchantAddressesResponse = PaginationData<MerchantAddress>;

declare interface GetMerchantAddressesError {}

declare interface GetMerchantStoreParams {
  perPage?: number;
  page?: number;
  paginationMetadataStyle?: "header" | "body";
}

declare interface MemberShipExtra {
  extra_lp: number;
  upgrade_cost: number;
}
