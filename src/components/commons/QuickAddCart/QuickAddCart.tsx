import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/redux/reducer/cartReducer";
import {
  AttributeList,
  AttributeName,
  AttributePrice,
  AttributeValue,
  AttributeVariantName,
  CloseButton,
  CloseIcon,
  ProductAttributeItem,
  ProductAttributes,
  ProductDivider,
  ProductImage,
  ProductInfo,
  ProductMerchantStore,
  ProductName,
  QuickCartContainer,
  QuickCartFooter,
  StyledButton,
  StyledDrawer,
} from "./styles";
import useFetch from "@/commons/hooks/useFetch";
import { URL_PRODUCT_DETAIL_V2, URL_PUBLIC_MERCHANT_STORE } from "@/commons/constants/apiUrl";
import { useEffect, useMemo, useState } from "react";
import useToast from "@/commons/hooks/useToast";
import { CloseCircleIcon } from "@/assets/icons";
import CustomLink from "../CustomLink/CustomLink";
import { details } from "@/commons/constants/routers";
import Link from "next/link";
import InputQuantity from "../InputQuantity/InputQuantity";
import { Box, Checkbox, Radio } from "@mui/material";
import { addCartSync } from "@/redux/saga/cartSagas";
import {
  getQuantityAttribute,
  checkExistsVariant,
  getPriceFormAttribute,
  getMinPrice,
  getNormalAttributes,
} from "@/utils/product";
import { format2Digit } from "@/utils/formatNumber";
import { isMobile } from "react-device-detect";
import { GradientText } from "../GradientText/GradientText";

const QuickAddCartModal: React.FC = () => {
  const { onAddToCart, carts } = useSelector((state: RootState) => state.cart);
  const { data, loading } = useFetch<ProductV2>(onAddToCart ? URL_PRODUCT_DETAIL_V2(onAddToCart.id) : "");
  const productDetail = onAddToCart?.id === data?.id ? data : null;
  const storeId = productDetail?.merchant_store_id;
  const { data: store } = useFetch<MerchantStore>(storeId ? URL_PUBLIC_MERCHANT_STORE(storeId) : "");
  const [attributes, setAttributes] = useState<{ [name: string]: string[] }>({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const toast = useToast();

  const productsInStore = (store && carts[store.name]?.[0]?.product_items) || [];
  const currentCartProducts: CartProductV2[] = productsInStore.filter(item => item.product_id === productDetail?.id);

  useEffect(() => {
    if (productDetail) {
      const attributes: { [key: string]: string[] } = {};
      productDetail.attributes.forEach(
        attribute =>
          attribute.is_required &&
          attribute.variants[0] &&
          (attributes[attribute.attribute_name] = [attribute.variants[0].attribute_value])
      );
      setAttributes(attributes);
    } else {
      setQuantity(1);
      setAttributes({});
    }
  }, [productDetail]);

  const handleSelect = (name: string, value: string) => {
    const productAttribute = productDetail?.attributes.find(item => item.attribute_name === name);
    const currentAttribute = attributes[name];
    if (!currentAttribute || productAttribute?.is_required) {
      attributes[name] = [value];
    } else {
      if (currentAttribute?.includes(value)) attributes[name] = currentAttribute.filter(item => item !== value);
      else if (!productAttribute?.is_multiple_choice) {
        attributes[name] = [value];
      } else attributes[name].push(value);
    }
    if (!attributes[name].length) delete attributes[name];
    setAttributes({ ...attributes });
    setQuantity(1);
  };

  const handleClose = () => dispatch(cartActions.setAddCartModal(null));

  const handleAdd = () => {
    if (!productDetail) return;
    const requiredAttributes = productDetail.attributes.filter(attribute => attribute.is_required);
    let error = "";
    requiredAttributes.forEach(attribute => {
      if (!attributes[attribute.attribute_name]) {
        error = `Please select all required variants`;
      }
    });
    if (store && productDetail && !error) {
      const newProduct: CreateUpdateCartBodyV2["product_items"]["0"] = {
        product_id: productDetail.id,
        quantity: Math.max(Number(quantity), 1),
        bundles: Object.keys(attributes).reduce<CreateUpdateCartBodyV2["product_items"]["0"]["bundles"]>((sum, key) => {
          const bundles: CreateUpdateCartBodyV2["product_items"]["0"]["bundles"] = attributes[key].map(value => ({
            attribute_name: key,
            attribute_value: value,
          }));
          return [...sum, ...bundles];
        }, []),
      };

      if (currentCartProducts.length > 0) {
        const currentProductVariant = currentCartProducts.find(
          product => product.product_id === productDetail.id && checkExistsVariant(product, attributes)
        );
        if (currentProductVariant) {
          newProduct.quantity += currentProductVariant.quantity;
        }
      }
      const newCart: CreateUpdateCartBodyV2 = {
        merchant_store_id: store.id,
        meta: {},
        product_items: [
          newProduct,
          ...productsInStore.filter(
            (product: CartProductV2) =>
              product.product_id !== productDetail.id || !checkExistsVariant(product, attributes)
          ),
        ],
      };
      dispatch(
        addCartSync({
          payload: newCart,
          onSuccess: () => {
            handleClose();
            toast.success("Add to cart successfully");
          },
          onError: error => console.log({ error }),
        })
      );
    } else {
      toast.error(error);
    }
  };

  const currentPrice = useMemo(
    () => (productDetail && getPriceFormAttribute(productDetail, attributes)) || 0,
    [productDetail, attributes]
  );

  const minPrice = useMemo(() => (productDetail && getMinPrice(productDetail)) || 0, [productDetail]);

  const normalAttributes = (productDetail && getNormalAttributes(productDetail)) || [];
  return (
    <StyledDrawer anchor="right" open={!!onAddToCart} onClose={handleClose}>
      <CloseButton onClick={handleClose}>
        <CloseIcon icon={CloseCircleIcon} width={32} height={32} />
      </CloseButton>
      {onAddToCart && (
        <QuickCartContainer>
          <ProductInfo>
            <Link href={details.product(onAddToCart.id)} onClick={handleClose}>
              <ProductImage src={onAddToCart.images[0]} />
            </Link>
            <ProductName>
              <CustomLink href={details.product(onAddToCart.id)}>{onAddToCart.name}</CustomLink>
              <ProductMerchantStore>{onAddToCart.store?.name}</ProductMerchantStore>
              <Box>S$ {format2Digit(minPrice)}</Box>
            </ProductName>
          </ProductInfo>
          {!!normalAttributes.length && (
            <>
              <ProductDivider />
              <ProductAttributes>
                {normalAttributes.map(attribute => {
                  return (
                    <ProductAttributeItem key={attribute.attribute_name}>
                      <AttributeName>
                        {attribute.attribute_name}:{attribute.is_required && <span style={{ color: "red" }}>*</span>}{" "}
                      </AttributeName>
                      <AttributeList>
                        {attribute.variants?.map((variant: AttributeVariantV2) => (
                          <AttributeValue key={variant.id}>
                            {attribute.is_required ? (
                              <Radio
                                color="secondary"
                                checked={!!attributes[variant.attribute_name]?.includes(variant.attribute_value)}
                                onChange={() => handleSelect(variant.attribute_name, variant.attribute_value)}
                              />
                            ) : (
                              <Checkbox
                                color="secondary"
                                checked={!!attributes[variant.attribute_name]?.includes(variant.attribute_value)}
                                onChange={() => handleSelect(variant.attribute_name, variant.attribute_value)}
                              />
                            )}
                            <AttributeVariantName>{variant.attribute_value}</AttributeVariantName>
                            <AttributePrice>
                              {attribute.is_required ? "" : "+ "}S$ {format2Digit(variant.price)}
                            </AttributePrice>
                          </AttributeValue>
                        ))}
                      </AttributeList>
                    </ProductAttributeItem>
                  );
                })}
              </ProductAttributes>
            </>
          )}
        </QuickCartContainer>
      )}
      {!productDetail?.is_sold_out ? (
        <QuickCartFooter>
          <InputQuantity quantity={quantity} onChange={quantity => setQuantity(quantity)} />
          <StyledButton onClick={handleAdd} disabled={loading}>
            Add to cart {isMobile ? null : `- S$ ${format2Digit(currentPrice * quantity)}`}
          </StyledButton>
        </QuickCartFooter>
      ) : (
        <GradientText fontWeight={500} textAlign={"center"}>
          This product has sold out
        </GradientText>
      )}
    </StyledDrawer>
  );
};

export default QuickAddCartModal;
