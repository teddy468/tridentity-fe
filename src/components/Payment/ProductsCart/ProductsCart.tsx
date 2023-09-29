import { useDispatch, useSelector } from "react-redux";
import {
  CartWrapper,
  Col,
  NoteContainer,
  NoteLength,
  Header,
  MerchantDivider,
  MerchantName,
  MerchantStore,
  NoteForm,
  ProductImage,
  ProductLink,
  ProductName,
  Row,
  StyledCheckbox,
  VariantValue,
  BonusLPContainer,
  LoyaltyPointBonus,
  NoteWrapper,
} from "./styles";
import Icon from "@/components/commons/Icon/Icon";
import { ArrowRightIcon, Edit2Icon, Shop20Icon, Trash2Icon } from "@/assets/icons";
import { details } from "@/commons/constants/routers";
import React, { useEffect, useMemo, useRef, useState } from "react";
import InputQuantity from "@/components/commons/InputQuantity/InputQuantity";
import { Box, IconButton } from "@mui/material";
import useToast from "@/commons/hooks/useToast";
import { updateCartSync, removeCartSync, getCartsSync } from "@/redux/saga/cartSagas";
import { getAttributeFromBundles, getNormalCartBundles, isPlural, isProductSelected } from "@/utils/product";
import UpdateCartButton from "@/components/commons/UpdateCartButton/UpdateCartButton";
import moment from "moment";
import { format2Digit, formatLP } from "@/utils/formatNumber";
import BigNumber from "bignumber.js";
import { GradientText } from "@/components/commons/GradientText/GradientText";
import { useRouter } from "next/router";

interface Props {
  storeSelected: CartItem | null;
  selectedProducts: CartProductV2[];
  setStoreSelected: (merchantStore: CartItem | null) => void;
  setSelectedProducts: (product: CartProductV2[]) => void;
  merchantBonusLP: number;
}
export default function ProductsCart(props: Props) {
  //create Ref save index of all items
  const sortIndexes = useRef<CartItem[]>([]);
  const { storeSelected, selectedProducts, setStoreSelected, setSelectedProducts, merchantBonusLP } = props;
  const [driverNote, setDriverNote] = useState("");

  const { carts } = useSelector(({ cart }: RootState) => cart);

  const toast = useToast();
  const dispatch = useDispatch();

  const handleChange = (merchantStore: CartItem, product?: CartProductV2) => {
    dispatch(getCartsSync({ payload: null }));
    if (product) {
      const quantity = Math.min(...product.bundles.map(item => item.exist_total_quantity));
      const isSoldOut = product.product_detail.is_sold_out;
      if (!storeSelected?.merchant_store_id) {
        if (!isSoldOut) {
          setStoreSelected(merchantStore);
          setSelectedProducts([product]);
        } else toast.error("Unable to select product that are sold out");
      } else if (storeSelected.merchant_store_id === merchantStore.merchant_store_id) {
        if (selectedProducts.find(selected => isProductSelected(selected, product))) {
          const newSelectedProducts = selectedProducts.filter(selected => !isProductSelected(selected, product));
          setSelectedProducts(newSelectedProducts);
          if (!newSelectedProducts.length) setStoreSelected(null);
        } else {
          if (!isSoldOut) setSelectedProducts([...selectedProducts, product]);
          else toast.error("Unable to select product that are sold out");
        }
      } else {
        toast.error("Only one store is allowed in one order");
      }
    } else if (storeSelected?.merchant_store_id === merchantStore.merchant_store_id) {
      setStoreSelected(null);
      setSelectedProducts([]);
    } else {
      const currentStore = Object.values(carts).find(
        ([cartItem]) => cartItem.merchant_store_id === merchantStore.merchant_store_id
      );
      const testAvailableItems =
        currentStore?.[0].product_items.filter(
          product => Math.min(...product.bundles.map(item => item.exist_total_quantity)) > 0
        ) || [];
      const availableItems =
        currentStore?.[0].product_items.filter(product => product.product_detail.is_sold_out === false) || [];
      if (availableItems.length) setStoreSelected(merchantStore);
      setSelectedProducts(availableItems);
      const numberOfSoldOut = (currentStore?.[0].product_items.length || 0) - availableItems.length;
      if (numberOfSoldOut)
        toast.error(
          `Unable to select ${isPlural(numberOfSoldOut, "product")} that ${numberOfSoldOut > 1 ? "are" : "is"} sold out`
        );
    }
  };

  const sortedList: CartItem[] = useMemo(() => {
    const values = Object.values(carts).map(([cartItem]) => cartItem);
    // if not saved index of all items
    if (!sortIndexes.current?.length) {
      // in first load, sort items by update_time and save to ref.current
      values.sort((a, b) => (moment(a.update_time).isBefore(b.update_time) ? 1 : -1));
      sortIndexes.current = JSON.parse(JSON.stringify(values));
      return values;
    } else {
      // in second load, sort item by index in ref.current, to prevent items from jumping when adding
      values.sort((a, b) => {
        const indexOfA = sortIndexes.current.findIndex(item => item.merchant_store_id === a.merchant_store_id);
        const indexOfB = sortIndexes.current.findIndex(item => item.merchant_store_id === b.merchant_store_id);
        return indexOfA - indexOfB;
      });
      const sortedStores: CartItem[] = values.map(store => {
        const copiedStore: CartItem = { ...store, product_items: [...store.product_items] };
        const currentStore = sortIndexes.current.find(item => item.merchant_store_id === store.merchant_store_id);
        if (currentStore) {
          copiedStore.product_items.sort((a, b) => {
            const indexOfA = currentStore?.product_items.findIndex(item => isProductSelected(item, a));
            const indexOfB = currentStore?.product_items.findIndex(item => isProductSelected(item, b));
            return indexOfA - indexOfB;
          });
        }
        return copiedStore;
      });
      return sortedStores;
    }
  }, [carts]);

  const handleChangeDriverNote = () => {
    const cart = sortedList[0];
    const newCart: CreateUpdateCartBodyV2 = {
      merchant_store_id: cart.merchant_store_id,
      meta: { ...cart.meta, driverNote },
      product_items: cart.product_items,
    };

    dispatch(updateCartSync({ payload: newCart }));
  };

  useEffect(() => {
    if (sortedList.length > 0) {
      // default selected all items in cart at first load
      handleChange(sortedList[0]);
    }
  }, []);

  return (
    <>
      <NoteWrapper>
        <NoteContainer>
          <NoteForm
            value={driverNote}
            minRows={1}
            placeholder="Note for driver"
            maxLength={100}
            onChange={e => setDriverNote(e.target.value)}
            onBlur={handleChangeDriverNote}
          />
          <NoteLength>{driverNote.length}/100</NoteLength>
        </NoteContainer>
      </NoteWrapper>
      <CartWrapper>
        <Header screen="desktop">
          <Col style={{ width: "45%" }}>Product</Col>
          <Col style={{ width: "15%", textAlign: "left" }}>Price</Col>
          <Col style={{ width: "15%", textAlign: "left" }}>Quantity</Col>
          <Col style={{ width: "15%", textAlign: "left" }}>Total</Col>
          <Col style={{ width: "10%" }} />
        </Header>
        <Header screen="mobile">
          <Col style={{ width: "100%" }}>All Product</Col>
        </Header>
        {sortedList.map(cartItem => {
          const isMerchantChecked = storeSelected?.store.id === cartItem?.store.id;
          const bonusLP = isMerchantChecked && merchantBonusLP;
          return (
            <ProductItem
              key={cartItem?.store.id}
              {...{ isMerchantChecked, cartItem, handleChange, selectedProducts, bonusLP }}
            />
          );
        })}
      </CartWrapper>
    </>
  );
}

interface CartItemProps {
  isMerchantChecked: boolean;
  cartItem: CartItem;
  handleChange: (merchantStore: CartItem, product?: CartProductV2) => void;
  selectedProducts: CartProductV2[];
  bonusLP: number | false;
}

const ProductItem = ({ isMerchantChecked, cartItem, handleChange, selectedProducts, bonusLP }: CartItemProps) => {
  const [merchantNote, setMerchantNote] = useState("");
  const [driverNote, setDriverNote] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [isUpdateQuantity, setIsUpdateQuantity] = useState(false);

  const handleChangeNote = () => {
    const newCart: CreateUpdateCartBodyV2 = {
      merchant_store_id: cartItem.merchant_store_id,
      meta: { ...cartItem.meta, merchantNote, driverNote },
      product_items: cartItem.product_items,
    };

    dispatch(updateCartSync({ payload: newCart }));
  };

  const handleChangeQuantity = (merchantStore: CartItem, product: CartProductV2, newQuantity: number) => {
    setIsUpdateQuantity(true);
    const currentItem = merchantStore.product_items.find(item => isProductSelected(item, product));
    if (!currentItem) return;
    const newCart: CreateUpdateCartBodyV2 = {
      merchant_store_id: merchantStore.merchant_store_id,
      meta: merchantStore.meta,
      product_items: [
        { ...currentItem, quantity: newQuantity },
        ...merchantStore.product_items.filter(item => !isProductSelected(item, product)),
      ],
    };
    dispatch(updateCartSync({ payload: newCart, onSuccess: () => setIsUpdateQuantity(false) }));
  };

  const handleRemove = (merchantStore: CartItem, product: CartProductV2) => {
    const newCart: CreateUpdateCartBodyV2 = {
      merchant_store_id: merchantStore.merchant_store_id,
      meta: merchantStore.meta,
      product_items: merchantStore.product_items.filter((item: CartProductV2) => !isProductSelected(item, product)),
    };
    if (newCart.product_items.length) {
      dispatch(updateCartSync({ payload: newCart }));
    } else {
      dispatch(removeCartSync({ payload: merchantStore.merchant_store_id }));
    }
  };

  const getPrice = (product: CartProductV2) => {
    return product.bundles.reduce((total, bundle) => {
      return new BigNumber(total).plus(bundle.price).toNumber();
    }, 0);
  };

  const redirectStorePage = (merchantId: number) => {
    return router.push(details.store(merchantId));
  };

  const redirectProductPage = (productId: number) => {
    return router.push(details.product(productId));
  };

  return (
    <React.Fragment>
      <Row>
        <Col style={{ textAlign: "center" }}>
          <StyledCheckbox color="secondary" checked={isMerchantChecked} onChange={() => handleChange(cartItem)} />
        </Col>
        <Col
          style={{ width: "90%", paddingLeft: 0 }}
          onClick={() => redirectStorePage(cartItem.merchant_store_id)}
          sx={{ cursor: "pointer" }}
        >
          <MerchantStore color="reverse">
            <Icon icon={Shop20Icon} width={20} height={20} isFill />
            <MerchantName>{cartItem?.store?.name}</MerchantName>
            <Icon icon={ArrowRightIcon} width={20} height={20} isFill />
          </MerchantStore>
        </Col>
      </Row>
      {cartItem?.product_items.map((item: CartProductV2, index: number) => {
        const isProductChecked = !!selectedProducts.find(product => isProductSelected(product, item));
        const bundles = getNormalCartBundles(item);
        const attributes = getAttributeFromBundles(bundles);
        return (
          <React.Fragment key={index}>
            <Row screen="desktop">
              <Col style={{ width: "5%" }} />
              <Col style={{ width: "5%" }}>
                <StyledCheckbox
                  color="secondary"
                  checked={isProductChecked}
                  onChange={() => handleChange(cartItem, item)}
                />
              </Col>
              <Col style={{ width: "35%" }}>
                <ProductLink color="reverse" sx={{ alignItems: bundles.length ? "flex-start" : "center" }}>
                  <ProductImage src={item.product_detail.images[0]} />
                  <Box>
                    <ProductName onClick={() => redirectProductPage(item.product_id)}>
                      {item.product_detail.name}
                    </ProductName>
                    {!!bundles.length && (
                      <Box>
                        {Object.entries(attributes).map(([key, values]) => (
                          <Box key={key}>
                            <VariantValue> {key}: </VariantValue>
                            <VariantValue>{values.join(", ")}</VariantValue>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                </ProductLink>
              </Col>
              <Col style={{ width: "15%", textAlign: "left" }}>S$ {format2Digit(getPrice(item))}</Col>
              {!item.product_detail.is_sold_out ? (
                <>
                  <Col style={{ width: "15%" }}>{isPlural(item.quantity, "product")}</Col>
                  <Col style={{ width: "15%", textAlign: "left" }}>
                    S$ {format2Digit(getPrice(item) * item.quantity)}
                  </Col>
                </>
              ) : (
                <Col sx={{ width: "30%" }}>
                  <GradientText fontWeight={500}>This product has sold out</GradientText>
                </Col>
              )}
              <Col style={{ width: "10%", display: "flex", alignItems: "center", columnGap: 8 }}>
                <Box textAlign="right">
                  <UpdateCartButton product={item}>
                    <Icon icon={Edit2Icon} isFill />
                  </UpdateCartButton>
                </Box>
                <Box textAlign="right">
                  <IconButton color="inherit" onClick={() => handleRemove(cartItem, item)}>
                    <Icon icon={Trash2Icon} />
                  </IconButton>
                </Box>
              </Col>
            </Row>
            <Row screen="mobile">
              <Col style={{ width: "10%", textAlign: "center" }}>
                <StyledCheckbox
                  color="secondary"
                  checked={isProductChecked}
                  onChange={() => handleChange(cartItem, item)}
                />
              </Col>
              <Col style={{ width: "70%" }}>
                <ProductLink
                  color="reverse"
                  sx={{ alignItems: bundles.length ? "flex-start" : "center" }}
                  onClick={() => redirectProductPage(item.product_id)}
                >
                  <ProductImage src={item.product_detail.images[0]} />
                  <Box>
                    <ProductName>{item.product_detail.name}</ProductName>
                    {!!bundles.length && (
                      <Box>
                        {Object.entries(attributes).map(([key, values]) => (
                          <Box key={key}>
                            <VariantValue> {key}: </VariantValue>
                            <VariantValue>{values.join(", ")}</VariantValue>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                </ProductLink>
              </Col>
              <Col style={{ width: "20%", display: "flex", justifyContent: "flex-end", padding: 0 }}>
                <Box textAlign="right">
                  <IconButton color="inherit" onClick={() => handleRemove(cartItem, item)}>
                    <Icon icon={Trash2Icon} />
                  </IconButton>
                </Box>
              </Col>
            </Row>
            <Row screen="mobile">
              <Col style={{ width: "10%", textAlign: "center" }} />
              {!item.product_detail.is_sold_out ? (
                <>
                  <Col style={{ width: "40%" }}>
                    <InputQuantity
                      quantity={item.quantity}
                      onChange={quantity => handleChangeQuantity(cartItem, item, quantity)}
                      disabled={isUpdateQuantity}
                    />
                  </Col>
                  <Col style={{ width: "50%", textAlign: "right" }}>
                    S$ {format2Digit(getPrice(item) * item.quantity)}
                  </Col>
                </>
              ) : (
                <Col sx={{ width: "90%" }}>
                  <GradientText fontWeight={500}>This product has sold out</GradientText>
                </Col>
              )}
            </Row>
          </React.Fragment>
        );
      })}
      {!!bonusLP && (
        <BonusLPContainer>
          * Bonus Loyalty point: <LoyaltyPointBonus>{formatLP(bonusLP)} LP</LoyaltyPointBonus>
        </BonusLPContainer>
      )}
      <NoteContainer>
        <NoteForm
          value={merchantNote}
          minRows={1}
          placeholder="Note for merchant"
          maxLength={100}
          onChange={e => setMerchantNote(e.target.value)}
          onBlur={handleChangeNote}
        />
        <NoteLength>{merchantNote.length}/100</NoteLength>
      </NoteContainer>
      <MerchantDivider />
    </React.Fragment>
  );
};
