import { SHIPMENT_METHOD } from "@/commons/constants/order";
import { REDIRECT_TRI_APP } from "@/commons/constants/routers";
import useLoading from "@/commons/hooks/useLoading";
import useToast from "@/commons/hooks/useToast";
import { GradientButton, Loading } from "@/components/commons/GradientButton/GradientButton";
import { systemActions } from "@/redux/reducer/systemReducer";
import { addCartSync, checkoutSync, getCartsSync, removeCartSync } from "@/redux/saga/cartSagas";
import { isProductSelected } from "@/utils/product";
import { Box, Grid } from "@mui/material";
import BigNumber from "bignumber.js";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ProductsCart from "../ProductsCart/ProductsCart";
import CheckoutSummary from "./CheckoutSummary";
import ConfirmCheckoutModal from "./ConfirmCheckoutModal/ConfirmCheckoutModal";
import DifferentCheckoutModal from "./DifferentCheckoutModal/DifferentCheckoutModal";
import ShipmentMethod from "./ShipmentMethod/ShipmentMethod";
import { CheckoutContainer, SubmitDivider } from "./styles";

interface Props {
  storeSelected: CartItem | null;
  selectedProducts: CartProductV2[];
  setStoreSelected: (merchantStore: CartItem | null) => void;
  setSelectedProducts: (product: CartProductV2[]) => void;
  merchantBonusLP: number;
  voucher: any;
  freeItemByVoucher: any; // array get by first
  onSubTotal: (value: number) => void;
  getListVoucherForUser: () => void;
  loadingVoucher: boolean;
}

export default function CheckoutForm(props: Props) {
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [timestamp, setTimestamp] = useState(Date.now());
  const { carts } = useSelector(({ cart }: RootState) => cart);
  const { userInfo } = useSelector(({ user }: RootState) => user);
  const {
    storeSelected,
    setStoreSelected,
    selectedProducts,
    setSelectedProducts,
    merchantBonusLP,
    voucher,
    freeItemByVoucher,
    onSubTotal,
    getListVoucherForUser,
    loadingVoucher,
  } = props;

  const currentStore = storeSelected && carts[storeSelected?.store.name]?.[0];

  const loadSc = useLoading();
  const toast = useToast();
  const dispatch = useDispatch();

  const form = useForm<CreateOrderValues>({
    mode: "all",
    defaultValues: {
      shipment_method: SHIPMENT_METHOD.DELIVERY,
      loyalty_point: 0,
    },
  });

  const {
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = form;

  const oldValues = useRef(JSON.stringify(getValues()));

  const total =
    currentStore?.product_items
      .filter((product: CartProductV2) => selectedProducts.find(selected => isProductSelected(product, selected)))
      .reduce((sum, item) => {
        const bundlePrice = item.bundles.reduce((sum, variant) => new BigNumber(sum).plus(variant.price).toNumber(), 0);
        return new BigNumber(bundlePrice).times(item.quantity).plus(sum).toNumber();
      }, 0) || 0;

  useEffect(() => onSubTotal(total), [total]);

  const onSubmit = async (values: CreateOrderValues) => {
    setOpenConfirm(false);
    if (!userInfo) return dispatch(systemActions.setDisplayAuthModal("login"));
    if (!currentStore) return toast.error("Please select a product for checkout");
    setLoading(true);

    loadSc.show();
    try {
      const body: CreateOrderBody = {
        ...values,
        note_for_merchant: currentStore.meta?.merchantNote,
        note_for_driver: currentStore.meta?.driverNote,
        meta: currentStore.meta,
        merchant_store_id: currentStore.merchant_store_id,
        merchant_store_address_id: Number(values.merchant_store_address_id),
        loyalty_point: Number(values.loyalty_point) || undefined,
        product_items: currentStore.product_items.filter(product =>
          selectedProducts.find(selected => isProductSelected(product, selected))
        ),
      };
      if (voucher) {
        if (Number(voucher?.discount_amount) > 0) {
          if (new BigNumber(total).gte(voucher?.minimum_spending)) body.voucher_id = voucher.id;
        } else body.voucher_id = voucher.id;
      }

      dispatch(
        checkoutSync({
          payload: body,
          onSuccess: res => {
            // setStoreSelected(null);
            // setSelectedProducts([]);
            // reset();
            const newCart: CreateUpdateCartBodyV2 = {
              merchant_store_id: storeSelected.merchant_store_id,
              meta: storeSelected.meta,
              product_items: storeSelected.product_items.filter(
                (product: CartProductV2) => !selectedProducts.find(selected => isProductSelected(product, selected))
              ),
            };
            if (newCart.product_items.length) {
              dispatch(addCartSync({ payload: newCart }));
            } else {
              dispatch(removeCartSync({ payload: storeSelected.merchant_store_id }));
            }
            // if (Number(values.loyalty_point)) dispatch(getUserLoyaltyPointAsync({ payload: null }));
            // setLoading(false);
            loadSc.hide();
            // dispatch(systemActions.setCheckoutResult("success"));
            location.replace(REDIRECT_TRI_APP.PAYMENT_URL(res.paymentGatewayResult));
          },

          onError: error => {
            console.log(error);
            setLoading(false);
            const message =
              typeof error?.error.message === "string"
                ? error?.error.message
                : typeof error?.error.message?.[0] === "string"
                ? error.error.message[0]
                : "Payment fail";
            toast.error(message);
            loadSc.hide();
            dispatch(systemActions.setCheckoutResult("fail"));
          },
        })
      );
    } catch (error) {
      setLoading(false);
      loadSc.hide();
      dispatch(systemActions.setCheckoutResult("fail"));
    }
  };

  const handleFormValue = () => {
    const formValue = getValues();
    if (formValue.shipment_method === SHIPMENT_METHOD.PICKUP) {
      formValue.loading.shippingFee = false;
    }
    return formValue;
  };

  const onCheckout = () => {
    oldValues.current = JSON.stringify(handleFormValue());
    getListVoucherForUser();
    dispatch(getCartsSync({ payload: null }));
    setTimestamp(Date.now());
    setOpenConfirm(true);
  };

  const values = JSON.stringify(handleFormValue());
  const isDisabled = !!Object.keys(errors).length || loading;
  const allLoading = Object.values(watch("loading") || {}).includes(true);

  useEffect(() => {
    if (openConfirm) {
      return allLoading ? loadSc.show() : loadSc.hide();
    }
  }, [openConfirm, allLoading]);

  const renderCheckout = () => {
    return (
      <>
        <CheckoutContainer>
          <CheckoutSummary
            merchantMinOrder={storeSelected?.store.min_order || null}
            form={form}
            total={total}
            merchantBonusLP={merchantBonusLP}
            voucher={voucher}
            freeItemByVoucher={freeItemByVoucher}
            timestamp={timestamp}
            loadingVoucher={loadingVoucher}
          />
          <SubmitDivider />
          <GradientButton type="submit" disabled={isDisabled} onClick={() => onCheckout()}>
            {loading ? "Submitting" : "Proceed to check out"} {loading && <Loading size={20} />}
          </GradientButton>
        </CheckoutContainer>
        <ConfirmCheckoutModal
          isOpen={!allLoading && openConfirm && values === oldValues.current}
          onConfirm={handleSubmit(onSubmit)}
          onClose={() => setOpenConfirm(false)}
        />
        <DifferentCheckoutModal
          isOpen={!allLoading && openConfirm && values !== oldValues.current}
          onConfirm={() => setOpenConfirm(false)}
          onClose={() => setOpenConfirm(false)}
        />
      </>
    );
  };

  return (
    <>
      {!isMobile ? (
        <Grid spacing={4} container>
          <Grid item xs={9}>
            <ShipmentMethod form={form} currentStore={currentStore} />
            <ProductsCart
              storeSelected={currentStore}
              selectedProducts={selectedProducts}
              setStoreSelected={setStoreSelected}
              setSelectedProducts={setSelectedProducts}
              merchantBonusLP={merchantBonusLP}
            />
          </Grid>
          <Grid item xs={3}>
            {renderCheckout()}
          </Grid>
        </Grid>
      ) : (
        <Box>
          <ShipmentMethod form={form} currentStore={currentStore} />
          {renderCheckout()}
        </Box>
      )}
    </>
  );
}
