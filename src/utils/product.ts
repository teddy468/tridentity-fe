import BigNumber from "bignumber.js";

export const getVariants = (product: Product): Array<Variant> => {
  const variants = new Map();
  product.items.forEach((item: ProductVariant) => {
    Object.keys(item.attributes).forEach(variant => {
      if (!variants.has(variant)) {
        variants.set(variant, [item.attributes[variant]]);
      } else {
        if (variants.get(variant).find((value: string) => value === item.attributes[variant])) return;
        const values = variants.get(variant);
        values.push(item.attributes[variant]);
        variants.set(variant, values);
      }
    });
  });
  return Array.from(variants, ([name, values]) => ({ name, values }));
};

export const isProductSelected = (product: CartProductV2, selectedProduct: CartProductV2) => {
  if (product.product_id !== selectedProduct.product_id) return false;
  const attributes = getAttributeFromBundles(selectedProduct.bundles);
  return checkExistsVariant(product, attributes);
};
export const getProductVariantFromAttribute = (
  product: CartProductV2,
  attributes: { [key: string]: string }
): boolean => {
  if (product.bundles.length !== Object.keys(attributes).length) return false;
  for (const bundle of product.bundles) {
    const attribute = attributes[bundle.attribute_name];
    if (!attribute) return false;
    if (attribute !== bundle.attribute_value) return false;
  }
  return true;
};

export const getQuantityAttribute = (product: ProductV2, attributes: { [key: string]: string[] }): number => {
  const currentVariants = product.items.filter(variant =>
    attributes[variant.attribute_name]?.includes(variant.attribute_value)
  );
  if (!currentVariants.length) return 0;
  return Math.max(0, Math.min(...currentVariants?.map(variant => variant.current_quantity)));
};

export const checkExistsVariant = (product: CartProductV2, attributes: { [key: string]: string[] }): boolean => {
  // for each attribute
  for (const [name, attribute] of Object.entries(attributes)) {
    // for attribute value
    for (const value of attribute) {
      // if product bundle don't have attributes
      if (!product.bundles.find(item => item.attribute_name === name && item.attribute_value === value)) return false;
    }
    // if attribute value length not equal product bundle of attribute (multi select a attribue)
    if (attribute.length !== product.bundles.filter(item => item.attribute_name === name).length) return false;
  }
  // if product bundles length not equal total of attribute length
  if (product.bundles.length !== Object.values(attributes).reduce((sum, item) => sum + item.length, 0)) return false;

  return true;
};

export const getMinPrice = (product: ProductV2): number => {
  return product.attributes.reduce((sum, item) => {
    if (item.is_required)
      return new BigNumber(sum).plus(Math.min(...item.variants.map(variant => variant.price))).toNumber();
    return sum;
  }, 0);
};

export const getPriceFormAttribute = (product: ProductV2, attributes: { [key: string]: string[] }): number => {
  return product.items.reduce((sum, variant) => {
    if (attributes[variant.attribute_name]?.includes(variant.attribute_value))
      return new BigNumber(sum).plus(variant.price).toNumber();
    return sum;
  }, 0);
};

export const getAttributeFromBundles = (bundles: CartProductV2["bundles"]): { [key: string]: string[] } => {
  return bundles.reduce<{ [key: string]: string[] }>(
    (sum, variant) => ({
      ...sum,
      [variant.attribute_name]: [...(sum[variant.attribute_name] || []), variant.attribute_value],
    }),
    {}
  );
};

export const isVariantDefault = (attribute: AttributeV2): boolean => {
  return !!(
    attribute.attribute_name === "default" &&
    attribute.is_required &&
    attribute.variants.length === 1 &&
    attribute.variants[0]?.attribute_value === "default"
  );
};

export const getNormalAttributes = (product: ProductV2): AttributeV2[] => {
  return product.attributes.filter(attribute => !isVariantDefault(attribute));
};

export const getNormalOrderBundles = (order: OrderV2["items"][0]): OrderV2["items"][0]["bundles"] => {
  return order.bundles.filter(
    attribute => !(attribute.attribute_name === "default" && attribute.attribute_value === "default")
  );
};

export const getNormalCartBundles = (product: CartProductV2): CartVariantV2[] => {
  return product.bundles.filter(
    attribute => !(attribute.attribute_name === "default" && attribute.attribute_value === "default")
  );
};

export const isPlural = (amount: number | null, text: string) => {
  if (amount === null) return `0 ${text}`;
  const formatAmount = new Intl.NumberFormat().format(amount);
  return amount >= 0 && amount <= 1 ? `${amount} ${text}` : `${formatAmount} ${text}s`;
};

export const getDefaultTag = (restaurant: { tags: string[] }): string => {
  if (restaurant && restaurant.tags.length > 0) {
    return restaurant.tags[0];
  }
  return "";
};
