import ProductsCart from "../ProductsCart/ProductsCart";
import {
  AddVoucherButton,
  BackButton,
  CartCount,
  CartWrapper,
  FlexBox,
  StepFooter,
  StyledGrid,
  SubTotal,
  Temp,
  TextNoVoucher,
  Title,
  VoucherContainer,
} from "./styles";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import EmptyShoppingCart from "@/components/commons/EmptyShoppingCart/EmptyShoppingCart";
import { isPlural, isProductSelected } from "@/utils/product";
import { BigText } from "@/components/Voucher/styles";
import ChooseVoucher from "./ChooseVoucher";
import defaultAxios from "@/commons/utils/axios";
import { VOUCHER_FREE_BY_ID } from "@/commons/constants/apiUrl";
import { VoucherInfoByProduct } from "./FreeProductCard";
import { isEmpty } from "lodash";
import { GradientText } from "@/components/commons/GradientText/GradientText";
import { GradientButton } from "@/components/commons/GradientButton/GradientButton";
import { LeftArrowIcon } from "@/assets/icons";
import { isMobile } from "react-device-detect";
import { format2Digit } from "@/utils/formatNumber";

export default function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [freeProduct, setFreeProduct] = useState<any[]>([]);

  const [subTotal, setSubTotal] = useState(0);
  const { carts } = useSelector(({ cart }: RootState) => cart);
  const [storeSelected, setStoreSelected] = useState<CartItem | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<CartProductV2[]>([]);
  const currentMerchant = storeSelected && carts[storeSelected?.store.name]?.[0];
  const [voucherSelect, setVoucherSelect] = useState<{ id: string } | null>();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (voucherSelect && Number(voucherSelect.id) > 0) {
      getListVoucherForUser();
    }
  }, [voucherSelect]);

  useEffect(() => {
    if (selectedProducts.length === 0) {
      return setVoucherSelect(null);
    }
  }, [selectedProducts]);

  const getListVoucherForUser = async () => {
    setLoading(true);
    if (voucherSelect) {
      try {
        const res = await defaultAxios.get(VOUCHER_FREE_BY_ID(voucherSelect.id));
        if (res.data && res.status === 200) {
          setFreeProduct([res.data]);
        }
      } catch (error) {
        console.log({ error });
      }
    } else {
      setFreeProduct([]);
    }
    setLoading(false);
  };

  const merchantBonusLP = useMemo(() => {
    const products = (currentMerchant?.product_items || []).filter(item =>
      selectedProducts.find(product => isProductSelected(product, item))
    );
    return products.reduce((sum, product) => {
      const onGoingCampaigns = product.product_detail.onGoingCampaigns || [];
      const sumCampaign = onGoingCampaigns.reduce((sumOne, { single_lp_amount, lp_amount, used_lp_amount }) => {
        const validProductBonus = Math.floor((lp_amount - used_lp_amount) / single_lp_amount);
        return sumOne + Math.min(product.quantity * single_lp_amount, validProductBonus * single_lp_amount);
      }, 0);
      return sum + sumCampaign;
    }, 0);
  }, [selectedProducts, carts]);

  const cartLength = Object.values(carts).reduce((sum, item) => sum + item[0].product_items.length, 0);

  if (!cartLength) return <EmptyShoppingCart />;

  const handleSelectVoucher = (voucher: any) => {
    setVoucherSelect(voucher);
  };

  const onSubTotal = (value: number) => {
    setSubTotal(value);
  };

  return (
    <CartWrapper maxWidth="xl">
      <Title show={step === 0 ? 1 : 0}>
        Shopping cart <CartCount>({isPlural(cartLength, "item")})</CartCount>
      </Title>
      <BackButton color="reverse" onClick={() => setStep(0)} show={step === 1 ? 1 : 0}>
        <LeftArrowIcon /> Back
      </BackButton>
      <Grid container spacing={4}>
        <StyledGrid item xs={12} md={9} show={step === 0 ? 1 : 0}>
          {isMobile && (
            <ProductsCart
              storeSelected={currentMerchant}
              selectedProducts={selectedProducts}
              setStoreSelected={setStoreSelected}
              setSelectedProducts={setSelectedProducts}
              merchantBonusLP={merchantBonusLP}
            />
          )}
          {/* Temporary disable for now */}
          <Temp sx={{ display: "none" }} />
          <VoucherContainer sx={{ display: "none" }}>
            <FlexBox>
              <BigText>Merchant Vouchers</BigText>
              <AddVoucherButton onClick={() => {}}>
                <GradientText onClick={() => setIsOpen(true)}>Add Voucher</GradientText>
              </AddVoucherButton>
            </FlexBox>
            {!isEmpty(voucherSelect) && selectedProducts.length > 0 ? (
              <VoucherInfoByProduct voucher={voucherSelect} />
            ) : (
              <TextNoVoucher>No Voucher </TextNoVoucher>
            )}
          </VoucherContainer>
          {/* -------------------------- */}
          <StepFooter>
            <SubTotal>
              <GradientText>Total bill</GradientText>
              <GradientText fontSize={24} fontWeight={600}>
                {"S$ "}
                {format2Digit(subTotal)}
              </GradientText>
            </SubTotal>
            <GradientButton onClick={() => setStep(1)} disabled={!currentMerchant?.product_items.length}>
              Continue
            </GradientButton>
          </StepFooter>
        </StyledGrid>
        <StyledGrid item xs={12} show={step === 1 ? 1 : 0}>
          <CheckoutForm
            storeSelected={currentMerchant}
            selectedProducts={selectedProducts}
            setStoreSelected={setStoreSelected}
            setSelectedProducts={setSelectedProducts}
            merchantBonusLP={merchantBonusLP}
            voucher={voucherSelect}
            freeItemByVoucher={freeProduct}
            onSubTotal={onSubTotal}
            getListVoucherForUser={getListVoucherForUser}
            loadingVoucher={loading}
          />
        </StyledGrid>
      </Grid>
      <ChooseVoucher
        subTotal={subTotal}
        selectedProducts={selectedProducts}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelectVoucher={handleSelectVoucher}
      />
    </CartWrapper>
  );
}
