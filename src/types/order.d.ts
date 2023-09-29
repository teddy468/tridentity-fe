declare type SHIPMENT_METHOD = import("../commons/constants/order").SHIPMENT_METHOD;

declare type ORDER_STATUS = import("../commons/constants/order").ORDER_STATUS;

declare type ORDER_PAYMENT_STATUS = import("../commons/constants/order").ORDER_PAYMENT_STATUS;

declare type DELIVERY_TYPES = import("../commons/constants/order").DELIVERY_TYPES;

declare interface PlatformMinOrder {
  min_order: number;
}

declare interface GetPlatformMinOrderError {}

declare interface GetPlatformMinOderResponse extends PlatformMinOrder {}

declare interface GetPlatformMinOderError extends ResponseError {}

declare interface OrderV2 {
  create_time: string;
  update_time: string;
  id: string;
  merchant_store_id: number;
  user_id: string;
  description: string;
  note: string;
  status: number;
  meta: {
    note: string;
  };
  shipment: {
    shipment_method: SHIPMENT_METHOD;
  };
  items: [
    {
      create_time: string;
      update_time: string;
      id: number;
      order_id: string;
      product_id: number;
      product_item_id: number;
      quantity: number;
      product_price: number;
      original_price: number;
      final_price: number;
      bundles: {
        price: number;
        attribute_name: string;
        attribute_value: string;
      }[];
      product: {
        name: string;
        images: string[];
        attributes: ProductV2["attributes"];
      };
    }
  ];
  store: {
    create_time: string;
    update_time: string;
    id: number;
    merchant_id: number;
    name: string;
    description: string;
    logo: string;
    banners: [string, string, string];
    is_restaurant: boolean;
    open_at: null;
    close_at: null;
    is_open_on_weekend: boolean;
    weekend_open_at: null;
    weekend_close_at: null;
    status: number;
    merchant: {
      create_time: string;
      update_time: string;
      id: number;
      name: string;
      merchant_user_id: string;
      description: string;
      rating: number;
      reviews: number;
      likes: number;
      status: number;
      logo: string;
      banners: [string];
      settings: {};
    };
  };
  payment: {
    create_time: string;
    update_time: string;
    id: number;
    order_id: string;
    amount: number;
    discount_amount: number;
    loyalty_point: number;
    loyalty_discount_amount: number;
    campaign_loyalty_point: number;
    delivery_fee: number;
    claim_description: null;
    description: null;
    min_order: number | null;
    total_amount: number;
    rewardLoyaltyPointForUser?: number;
  };
  transactions: [
    {
      amount: number;
      amount_breakdown: {
        discount_amount: number;
        delivery_fee: number;
        platform_fee: number;
        item_amount: number;
        net_amount: number;
      };
      meta: {
        attachments: string[];
        description: string;
      };
      type: number;
    }
  ];
}

declare interface OrderStore {
  create_time: string;
  update_time: string;
  id: number;
  merchant_id: number;
  name: string;
  description: string;
  logo: string;
  banners: string[];
  is_restaurant: boolean;
  open_at: string;
  close_at: string;
  is_open_on_weekend: boolean;
  weekend_open_at: string;
  weekend_close_at: string;
  status: number;
  merchant: Store;
}

declare interface OrderItemRating {
  order_item_id: number;
  rating: number;
  description: string;
}

declare interface OrderProductRating {
  order_item_ratings: OrderItemRating[];
  orderId: string;
}

declare interface OrderStoreRating {
  rating: number;
  description: string;
  data: { attachments: string[] };
  orderId: string;
}

declare interface RefundRequestBody {
  description: string;
  attachments: string[];
  orderId: string;
}

declare interface RefundRequest extends RefundRequestBody {
  avatar: FileList;
}

declare interface OrderStoreRatingValues extends OrderStoreRating {
  avatar: FileList;
}

declare interface OrderItem {
  create_time: string;
  id: string;
  merchant_store_id: MerchantStore["id"];
  user_id: User["id"];
  status: ORDER_STATUS;
  store: {
    name: string;
    merchant_id: Store["id"];
    logo: string;
    banners: string[];
    merchant: {
      name: string;
      logo: string;
      banners: string[];
    };
  };
  payment: {
    amount: number;
    discount_amount: number;
    delivery_fee: number;
    loyalty_discount_amount: number;
    loyalty_point: number;
  };
  items: [
    {
      product_id: Product["id"];
    }
  ];
  shipment?: {
    shipment_method: SHIPMENT_METHOD;
  };
}

declare interface BundleItem {
  name: string;
  price: number;
  quantity: number;
  product_item_id: number;
  detail: BundleItemDetail;
}

declare interface BundleItemDetail {
  create_time: string;
  update_time: string;
  id: number;
  product_id: number;
  name: string;
  description: string;
  current_quantity: number;
  total_quantity: number;
  price: number;
  status: number;
  type: number;
  attributes: {
    [key: string]: string;
  };
  images: string[];
  sku: string;
}

declare interface TotalBill {
  total: number;
}

declare interface CreateOrderBody extends CreateUpdateCartBodyV2 {
  shipment_method?: SHIPMENT_METHOD;
  note_for_merchant?: string;
  note_for_driver?: string;
  merchant_store_address_id: MerchantAddress["id"];
  recipient?: {
    name: string;
    phone: string;
  };
  note?: string;
  quotationId?: string;
  loyalty_point?: number;
  voucher_id?: number;
  min_order_amount?: number;
  recipient_address?: number;
}

declare interface CreateOrderValues extends CreateOrderBody {
  loyalty_point?: number;
  merchant_store_id?: string;
  merchant_store_address_id?: string;
  shippingFee: number;
  distance: number;
  product_items: {
    product_id: string;
    quantity: string;
    bundles: {
      attribute_name: string;
      attribute_value: string;
    }[];
  }[];
  loading: {
    shippingFee?: boolean;
    lpConversion?: boolean;
    membershipExtra?: boolean;
    configExchange?: boolean;
    cart?: boolean;
    voucher?: boolean;
  };
  merchantBonusLP?: number;
}

declare interface BadgeItem {
  id: number;
  image: string;
  name: string;
  supply: string;
  description: string;
  is_equipped: boolean;
}

declare interface WearBadgeMultiRequest {
  badge_ids: number[];
}

declare interface CreateOrderResponseV2 extends OrderV2 {
  paymentGatewayResult: string;
}
declare interface CreateOrderResponse extends Order {}
declare interface WearBadgeResponse {}

declare interface CreateOrderError extends ResponseError {}
declare interface CompleteOrderError extends ResponseError {}
declare interface WearBadgeError extends ResponseError {}

declare interface CompleteOrderResponse {
  badge: BadgeItem;
}

declare interface CurrentStoreRating {
  id: number;
  order_id: string;
  rating: number;
  description: string;
  data: { attachments: string[] };
}

declare interface CurrentProductRating {
  id: number;
  product_id: number;
  order_item_id: number;
  order_id: string;
  user_id: string;
  rating: number;
  description: string;
  data: { attachments: string[] };
}

declare interface CurrentOrderRating {
  store_rating: CurrentStoreRating;
  product_ratings: CurrentProductRating[];
}
