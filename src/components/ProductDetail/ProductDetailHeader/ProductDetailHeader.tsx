import { URL_PUBLIC_MERCHANT_STORE } from "@/commons/constants/apiUrl";
import useFetch from "@/commons/hooks/useFetch";
import useToast from "@/commons/hooks/useToast";
import { GradientText } from "@/components/commons/GradientText/GradientText";
import InputQuantity from "@/components/commons/InputQuantity/InputQuantity";
import { systemActions } from "@/redux/reducer/systemReducer";
import { addCartSync } from "@/redux/saga/cartSagas";
import { checkExistsVariant, getPriceFormAttribute, getQuantityAttribute } from "@/utils/product";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductImages } from "./ProductImages/ProductImages";
import { ProductSummary } from "./ProductSummary/ProductSummary";
import ProductVariants from "./ProductVariants/ProductVariants";
import {
  AddToCartMobile,
  ButtonAddToCartMobile,
  ButtonGroup,
  ErrorMessage,
  InputQuantityMobile,
  InputQuantityWrapper,
  ProductInfo,
  Quantity,
  StyledButton,
  StyledContainer,
} from "./styles";
interface ProductDetailHeaderProps {
  product: ProductV2;
}

const ProductDetailHeader = ({ product }: ProductDetailHeaderProps) => {
  const { images, name, price, description, reviews, rating, merchant_store_id, main_tags, sub_tags, is_sold_out } =
    product;
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { data: store } = useFetch<MerchantStore>(
    merchant_store_id ? URL_PUBLIC_MERCHANT_STORE(merchant_store_id) : ""
  );
  const { carts } = useSelector((state: RootState) => state.cart);
  const [attributes, setAttributes] = useState<{ [name: string]: string[] }>({});
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const toast = useToast();

  const productsInStore = (store && carts[store.name]?.[0] && carts[store.name]?.[0].product_items) || [];

  const currentCartProducts: CartProductV2[] = productsInStore.filter(item => item.product_id === product?.id);

  const handleSelect = (name: string, value: string) => {
    const productAttribute = product?.attributes.find(item => item.attribute_name === name);
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

  const handleAddToCart = () => {
    if (!userInfo?.id) dispatch(systemActions.setDisplayAuthModal("login"));
    if (!product) return;
    const requiredAttributes = product.attributes.filter(attribute => attribute.is_required);
    let error = "";
    requiredAttributes.forEach(attribute => {
      if (!attributes[attribute.attribute_name]) {
        error = `Please select all required variants`;
      }
    });
    if (store && product && !error) {
      const newProduct: CreateUpdateCartBodyV2["product_items"]["0"] = {
        product_id: product.id,
        quantity: Number(quantity) || 1,
        bundles: Object.keys(attributes).reduce<CreateUpdateCartBodyV2["product_items"]["0"]["bundles"]>((sum, key) => {
          const bundles: CreateUpdateCartBodyV2["product_items"]["0"]["bundles"] = attributes[key].map(value => ({
            attribute_name: key,
            attribute_value: value,
          }));
          return [...sum, ...bundles];
        }, []),
      };

      if (currentCartProducts.length > 0) {
        const currentProductVariant = currentCartProducts.find(product => checkExistsVariant(product, attributes));
        if (currentProductVariant) {
          newProduct.quantity += currentProductVariant.quantity;
        }
      }
      const newCart: CreateUpdateCartBodyV2 = {
        merchant_store_id: store.id,
        meta: {},
        product_items: [
          newProduct,
          ...productsInStore.filter((product: CartProductV2) => !checkExistsVariant(product, attributes)),
        ],
      };
      dispatch(
        addCartSync({
          payload: newCart,
          onSuccess: () => {
            toast.success("Add to cart successfully");
            const attributes: { [key: string]: string[] } = {};
            product.attributes.forEach(
              attribute =>
                attribute.is_required &&
                attribute.variants[0] &&
                (attributes[attribute.attribute_name] = [attribute.variants[0].attribute_value])
            );
            setAttributes(attributes);
          },
          onError: error => console.log({ error }),
        })
      );
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (userInfo) setError("");
  }, [userInfo]);

  useEffect(() => {
    if (product) {
      const attributes: { [key: string]: string[] } = {};
      product.attributes.forEach(
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
  }, [product]);

  const currentPrice = useMemo(
    () => (product && getPriceFormAttribute(product, attributes)) || 0,
    [product, attributes]
  );

  const maxQuantity = useMemo(() => (product && getQuantityAttribute(product, attributes)) || 0, [product, attributes]);

  const isSoldOut = useMemo(() => product && is_sold_out, [is_sold_out]);

  return (
    <>
      <StyledContainer>
        <ProductImages
          images={images}
          description={description}
          main_tags={main_tags}
          sub_tag={sub_tags}
          merchant_store_id={merchant_store_id}
          campaignInfo={product.onGoingCampaigns?.[0]}
        />
        <ProductInfo>
          <ProductSummary
            merchant_store_id={merchant_store_id}
            name={name}
            price={currentPrice}
            reviews={reviews}
            rating={rating}
            campaignInfo={product.onGoingCampaigns?.[0]}
          />
          <ProductVariants attributes={attributes} handleSelect={handleSelect} product={product} />

          {isSoldOut ? (
            <GradientText fontWeight={500}>This product has sold out.</GradientText>
          ) : (
            <>
              <Quantity>Quantity: </Quantity>
              <InputQuantityWrapper>
                <InputQuantity quantity={quantity} onChange={quantity => setQuantity(quantity)} />
              </InputQuantityWrapper>

              <ErrorMessage>{error} </ErrorMessage>
              <ButtonGroup>
                <StyledButton onClick={handleAddToCart}>Add to cart</StyledButton>
              </ButtonGroup>
            </>
          )}
        </ProductInfo>
        {!isSoldOut && (
          <AddToCartMobile>
            <InputQuantityMobile>
              <InputQuantity quantity={quantity} onChange={quantity => setQuantity(quantity)} max={maxQuantity || 1} />
              <ButtonAddToCartMobile onClick={handleAddToCart}>
                Add to cart
              </ButtonAddToCartMobile>
            </InputQuantityMobile>
          </AddToCartMobile>
        )}
      </StyledContainer>
    </>
  );
};

export default ProductDetailHeader;
