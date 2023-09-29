export const getProductAttributes = (product: Product) => {
  const attributes: { [name: string]: string[] } = {};
  try {
    product.items.map(item => {
      for (const attribute in item.attributes) {
        if (!attributes[attribute]) attributes[attribute] = [item.attributes[attribute]];
        else if (!attributes[attribute].includes(item.attributes[attribute]))
          attributes[attribute].push(item.attributes[attribute]);
      }
    });
  } catch {}
  return attributes;
};
