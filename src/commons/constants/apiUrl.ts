export const URL_CATEGORIES = "categories";
export const URL_CATEGORIES_MERCHANT = (merchant_store_id: number | string) =>
  `merchant-stores/${merchant_store_id}/merchant-store-menus`;
export const URL_CATEGORY_DETAIL = (id: Category["id"]) => `categories/${id}`;
export const URL_TOP_CATEGORIES = "categories/top";
export const URL_USERS = "users";
export const URL_ADDRESS = "user-shipping-addresses";
export const URL_PAYMENT_CARDS = "user-payment-methods";
export const URL_ALL_CATEGORIES = "categories/tree";
export const URL_COUNT_SUB_CATEGORIES = (id: Category["id"]) => `categories/${id}/direct-children`;
export const URL_PRODUCT_ON_SALES = "products";
export const URL_PRODUCT_DETAIL = (id: Product["id"]) => `products/${id}`;
export const URL_PRODUCT_RATINGS = (id: Product["id"]) => `products/${id}/ratings`;
export const URL_TOP_MERCHANTS = "merchants";
export const URL_MERCHANTS = "merchants";

export const URL_MERCHANT_STORE_DETAIL = (id: Store["id"]) => `marketplace/merchant-stores/${id}`;
export const URL_MERCHANT_PRODUCTS = (id: Store["id"]) => `merchant-stores/${id}/products`;
export const URL_MERCHANT_STORE_DETAIL_2 = (id: string | number) => `marketplace/merchant-stores/${id}`;
export const URL_ALL_PRODUCTS = `/products`;
export const URL_CAMPAIGN_LIST = (campaignId: Store["id"]) => `/merchant-stores/${campaignId}/campaigns`;

export const URL_CARTS = "carts";
export const URL_ORDERS = "orders";
export const URL_ORDERS_DETAIL = (id: OrderV2["id"]) => `orders/${id}`;
export const URL_ORDER_PAYMENT = (id: OrderV2["id"]) => `orders/${id}/payment-token`;

export const URL_MERCHANT_FAVORITE = "users/liked-stores";
export const URL_MERCHANT_FAVORITE_LIKE_ACTION = (id: number) => `merchant-stores/${id}/like`;
export const URL_USER_BADGE = `badges/me`;

export const URL_GET_RATING_BY_ORDER_ID = (orderId: string) => `orders/${orderId}/ratings`;
export const URL_MERCHANT_STORE_ADDRESS = (id: MerchantStore["id"]) => `marketplace/merchant-stores/${id}/addresses`;
export const URL_PUBLIC_MERCHANT_STORE_ADDRESS = (id: MerchantStore["id"]) =>
  `marketplace/merchant-stores/${id}/addresses`;
export const URL_MERCHANT_STORES = (id: Store["id"]) => `merchants/${id}/merchant-stores`;
export const URL_PUBLIC_MERCHANT_STORES = (id: Store["id"]) => `marketplace/merchants/${id}/merchant-stores`;
export const URL_MERCHANT_STORE = (id: MerchantStore["id"]) => `merchant-stores/${id}`;
export const URL_PUBLIC_MERCHANT_STORE = (id: Store["id"]) => `marketplace/merchant-stores/${id}`;
export const URL_MERCHANT_STORE_LIST = "marketplace/merchant-stores";
export const URL_MERCHANT_STORE_LIST_BY_TAG = "marketplace/merchant-stores/product-tag";
export const URL_MERCHANT_STORE_LIST_BY_PRODUCT_NAME = "marketplace/merchant-stores/product-name";
export const URL_MERCHANT_STORE_RATING_LIST = (id: number) => `marketplace/merchant-stores/${id}/ratings`;

export const URL_TOP_SELLING_DISHES = "products";
export const URL_USER_LP_HISTORY = "user-loyalty-point-history";
export const URL_USER_LP = "user-loyalty-points";
export const URL_USER_MEMBERSHIP = "user-memberships";
export const URL_USER_MEMBERSHIP_COLLECTION = "user-memberships/collections";
export const URL_USER_MEMBERSHIP_CONFIG = "user-memberships/config";

export const URL_PRODUCT_DETAIL_V2 = (id: ProductV2["id"]) => `v2/products/${id}`;
export const URL_ORDERS_DETAIL_V2 = (id: OrderV2["id"]) => `v2/orders/${id}`;

export const URL_FAVORITES = "users/liked-stores";

export const CONVERSATIONS = "chats/users/conversations";
export const UNREAD_CONVERSATION = "chats/users/total-unread";
export const CONVERSATION_DETAIL = (store_id: MerchantStore["id"]) =>
  `chats/users/merchant-stores/${store_id}/conversation`;
export const SEND_MESSAGE = "chats/users/send-message-to-store";
export const READ_MESSAGE = (merchant_id: MerchantStore["id"]) => `chats/users/${merchant_id}/read`;
export const PRODUCTS_DASHBOARD_SETTING = (setting: "featured" | "top_selling") =>
  `products/dashboard-settings/${setting}`;
export const MERCHANT_STORE_DASHBOARD_SETTING = (setting: "featured") =>
  `marketplace/merchant-stores/dashboard-settings/${setting}`;
export const CATEGORIES_DASHBOARD_SETTING = "categories/dashboard-settings";
export const NOTIFICATION_URL = "user-notifications";
export const NOTIFICATION_URL_UN_READ_COUNT = "user-notifications/unread";

export const URL_SHIPPING_FEE = {
  GRAB: "logistic-calculations/request-quotation",
  LALAMOVE: "external/lalamove/request-quotation",
};

export const PLATFORM_MIN_ORDER = "parameter-config/platform-min-order";
export const EXCHANGE_RATE = `parameter-config/exchange-rate`;
export const LP_CONVERSION = `parameter-config/lp-conversion`;
export const MEMBERSHIP_EXTRA = `user-memberships/my-config`;

export const VOUCHER_OF_MERCHANT = (store_id: string | number) => `merchant-stores/${store_id}/vouchers?`;
export const VOUCHER_DETAIL = (id: string | number) => `vouchers/${id}`;
export const VOUCHER_USER_CLAIM = (id: string | number) => `users/vouchers/${id}/claim`;
export const MY_VOUCHER = `users/vouchers/claimed`;
export const VOUCHER_FREE_BY_ID = (id: string | number) => `vouchers/${id}/free-product`;
