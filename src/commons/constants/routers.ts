import { APP_ID, TRI_APP_URL } from ".";

export const routers = {
  HOME: "/",
  LOGOUT: "/logout",
  NOT_FOUND: "/*",
  PRODUCT_ON_SALES: "/product-on-sales",
  TOP_MERCHANTS: "/top-merchants",
  CART: "/cart",
  CHECKOUT: "/checkout",
  MARKETPLACE: "/marketplace",
  SELLER_CENTER: "/seller-center",
  NEWS: "/news",
  FORGOT_PASSWORD: "/forgot-password",
  TERMS_AND_CONDITIONS: "/terms-and-conditions",
  VERIFY: "/verify",
  CATEGORIES: "/categories",
  PRODUCT_DETAIL: "/product/[id]",
  ALL_DISHES: "/all-dishes",
  NOTIFICATION: "/notification",
  USER: {
    PROFILE: "/user/profile",
    LOYALTY_POINTS: "/user/loyalty-points",
    NOTIFICATION: "/user/notification",
    MY_ORDERS: "/user/my-orders",
    MEMBERSHIP: "/user/membership",
    FAVOURITE: "/user/favourite",
    VOUCHER: "/user/voucher",
  },
};

export const titles = {
  HOME: "Home",
  PROFILE: "Profile",
  PRODUCT_ON_SALES: "Product on sales",
  TOP_MERCHANTS: "Top merchants",
  ALL_DISHES: "Featured dishes",
  MARKET_PLACE: "Marketplace",
  CHECKOUT: "Checkout",
  CART: "Cart",
  CATEGORIES: "All categories",
  VERIFY: "Verify Email",
  MY_ORDERS: "My Order",
  ORDER_DETAIL: "Order Detail",
  NOT_FOUND: "404: This page could not be found",
  FAVOURITES: "Favourites",
  NEWS: "News and Event",
};

export const details = {
  product: (id: Product["id"]) => `/product/${id}`,
  category: (id: Category["id"]) => `/category/${id}`,
  store: (id: Store["id"]) => `/store/${id}`,
  order: (id: OrderV2["id"]) => `/user/my-orders/${id}`,
  store2: (id: string | number) => `/store/${id}`,
  storeProducts: (id: Store["id"]) => `/store/${id}/all-dishes`,
  marketplace: (ids: number[], parentId: number) => {
    return `/marketplace?category_ids=${parentId}${ids?.length > 0 ? `,${ids?.join(",")}` : ""}`;
  },
};

export const REDIRECT_TRI_APP = {
  LOGIN_URL: `${TRI_APP_URL}oauth/login?app_id=${APP_ID}`,
  REGISTER_URL: `${TRI_APP_URL}oauth/login?app_id=${APP_ID}`,
  PAYMENT_URL: (token: string) => `${TRI_APP_URL}payment/gateway?token=${token}`,
};

export const NOT_FOUND = "Not Found";
