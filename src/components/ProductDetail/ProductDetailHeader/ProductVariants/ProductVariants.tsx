import { format2Digit } from "@/utils/formatNumber";
import { Label, Row, VariantButton, VariantName, VariantsWrapper, Wrapper } from "./styles";
import { getNormalAttributes } from "@/utils/product";
interface Props {
  product: ProductV2;
  handleSelect: (name: string, value: string) => void;
  attributes: { [name: string]: string[] };
}
const ProductVariants: React.FC<Props> = ({ product, handleSelect, attributes }) => {
  const normalAttributes = getNormalAttributes(product);

  return (
    <Wrapper>
      {normalAttributes.map((attribute: AttributeV2) => (
        <Row key={attribute.attribute_name}>
          <Label>
            {attribute.attribute_name}: {attribute.is_required && <span style={{ color: "red" }}>*</span>}
          </Label>
          <VariantsWrapper>
            {attribute.variants.map((variant: AttributeVariantV2) => {
              const isSelected = !!attributes[variant.attribute_name]?.includes(variant.attribute_value);
              
              return (
                <VariantButton
                  disabled={+(variant.current_quantity === 0)}
                  selected={+isSelected}
                  key={variant.id}
                  onClick={() => handleSelect(variant.attribute_name, variant.attribute_value)}
                >
                  <VariantName selected={+isSelected}>{variant.attribute_value}</VariantName>
                  {variant.price > 0 && <span>S$ {format2Digit(variant.price)}</span>}
                </VariantButton>
              );
            })}
          </VariantsWrapper>
        </Row>
      ))}
    </Wrapper>
  );
};

export default ProductVariants;
