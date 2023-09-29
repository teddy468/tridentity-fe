import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  platformMinOrder: number;
  totalBill: number;
  carts: CartListV2;
  initialized: boolean;
  loading: boolean;
  onAddToCart: ProductV2 | ProductItem | null;
  onUpdateCart: CartProductV2 | null;
  currentSelectedItem: ProductV2 | ProductItem | null;
}

const initialState: CartState = {
  platformMinOrder: 0,
  totalBill: 0,
  carts: {},
  initialized: false,
  loading: true,
  onAddToCart: null,
  onUpdateCart: null,
  currentSelectedItem: null,
};

const sortByCreateTime = (a: CartItem, b: CartItem) => {
  const timeA = new Date(a.create_time);
  const timeB = new Date(b.create_time);
  return timeB.getTime() - timeA.getTime();
};

const getAttributeFromBundles = (
  bundles: CreateUpdateCartBodyV2["product_items"][0]["bundles"]
): { [key: string]: string[] } => {
  return bundles.reduce<{ [key: string]: string[] }>(
    (sum, variant) => ({
      ...sum,
      [variant.attribute_name]: [...(sum[variant.attribute_name] || []), variant.attribute_value],
    }),
    {}
  );
};

const checkExistsVariant = (product: CartProductV2, attributes: { [key: string]: string[] }): boolean => {
  // for each attribute
  for (const [name, attribute] of Object.entries(attributes)) {
    // for attribute value
    for (const value of attribute) {
      // if product bundle don't have attributes
      if (!product.bundles.find(item => item.attribute_name === name && item.attribute_value === value)) return false;
    }
    // if attribute value length not equal product bundle of attribute (multi select a attribute)
    if (attribute.length !== product.bundles.filter(item => item.attribute_name === name).length) return false;
  }
  // if product bundles length not equal total of attribute length
  if (product.bundles.length !== Object.values(attributes).reduce((sum, item) => sum + item.length, 0)) return false;

  return true;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setPlatformMinOrder(state, action: PayloadAction<PlatformMinOrder>) {
      return {
        ...state,
        platformMinOrder: action.payload.min_order,
      };
    },

    setTotalBill(state, action: PayloadAction<TotalBill>) {
      return {
        ...state,
        totalBill: action.payload.total,
      };
    },

    initialCarts(state, action: PayloadAction<CartListV2>) {
      const cardNew: CartListV2 = {};
      const cartArray = Object.entries(action.payload);
      cartArray.sort((a, b) => sortByCreateTime(a[1][0], b[1][0]));
      cartArray.forEach(([key, value]) => {
        cardNew[key] = value;
      });

      return {
        ...state,
        carts: cardNew,
        initialized: true,
        loading: false,
      };
    },

    updateCart(state, action: PayloadAction<UpdateCartResponse>) {
      const merchantName = Object.keys(state.carts).find(key => state.carts[key][0]?.id === action.payload.id);
      if (merchantName) {
        state.carts[merchantName][0].product_items = state.carts[merchantName][0].product_items.filter(item => {
          const currentItem = action.payload.product_items.find(newItem => {
            if (newItem.product_id !== item.product_id) return false;
            const attributes = getAttributeFromBundles(newItem.bundles);
            return checkExistsVariant(item, attributes);
          });
          if (currentItem) {
            item.quantity = currentItem?.quantity || item.quantity;
            return true;
          }
          return false;
        });
        state.carts[merchantName][0].meta = action.payload.meta;
      }
      state.loading = false;
    },

    destroyCart(state) {
      return {
        ...state,
        carts: {},
        initialized: false,
      };
    },

    setAddCartModal(state, action: PayloadAction<ProductV2 | ProductItem | null>) {
      return {
        ...state,
        onAddToCart: action.payload,
      };
    },

    setUpdateCartModal(state, action: PayloadAction<CartProductV2 | null>) {
      return {
        ...state,
        onUpdateCart: action.payload,
      };
    },

    setLoading(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        loading: action.payload,
      };
    },

    setCurrentSelectedItem(state, action: PayloadAction<ProductV2 | ProductItem | null>) {
      return {
        ...state,
        currentSelectedItem: action.payload,
      };
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
