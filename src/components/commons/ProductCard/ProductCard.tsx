import { MAIN_TAG } from "@/commons/constants/product";
import { details } from "@/commons/constants/routers";
import {
  CampaignTag,
  ImageWrapper,
  PlusIconWrapper,
  ProductCampaignImageWrapper,
  ProductCampaignWrapper,
  ProductContainer,
  ProductImage,
  ProductImageCampaign,
  ProductImageWrapper,
  ProductInfo,
  ProductName,
  ProductPrice,
  ProductPriceWrapper,
  RatingValue,
  RatingsWrapper,
  ReviewCount,
  SkeletonContainer,
  SkeletonProductImage,
  SkeletonProductInfo,
  SkeletonTag,
  Tag,
} from "./styles";
import { PlusIcon, StarIconGreen } from "@/assets/icons";
import { Box } from "@mui/material";
import { format2Digit, roundingNumber } from "@/utils/formatNumber";
import { isPlural } from "@/utils/product";

export const SkeletonProductCard = () => {
  return (
    <SkeletonContainer>
      <SkeletonTag variant="rectangular" />
      <SkeletonProductImage variant="rectangular" />
      <SkeletonProductInfo variant="rectangular" />
    </SkeletonContainer>
  );
};

interface Props {
  product: ProductV2 | ProductItem;
  fixOnCampaign?: boolean | undefined;
}

const ProductCard = ({ product, fixOnCampaign }: Props) => {
  const showCampaignTag = fixOnCampaign
    ? fixOnCampaign
    : product.onGoingCampaigns && product.onGoingCampaigns.length > 0;

  const renderDishTag = () => {
    if (product.is_sold_out) {
      return <Tag>Sold out</Tag>;
    }
    return product.main_tags?.[0] && <Tag>{MAIN_TAG[product.main_tags[0]]}</Tag>;
  };

  return (
    <>
      {!showCampaignTag && (
        <ProductContainer>
          {renderDishTag()}
          <ProductImageWrapper href={`${details.product(product.id)}`}>
            <ProductImage src={product.images[0]} />
          </ProductImageWrapper>
          <ProductInfo>
            <ProductName href={`${details.product(product.id)}`}>{product.name}</ProductName>
            <RatingsWrapper>
              {/* There is different data in All Dishes page */}
              <RatingValue>{roundingNumber(product.rating)}</RatingValue>
              <Box justifySelf={"center"}>
                <StarIconGreen />
              </Box>
              {/* There is different data in All Dishes page */}
              <ReviewCount>({isPlural(product.reviews, "review")})</ReviewCount>
            </RatingsWrapper>
            <ProductPriceWrapper>
              <ProductPrice>S$ {format2Digit(product.price)}</ProductPrice>
              {!product.is_sold_out && (
                <PlusIconWrapper product={product} textAlign={"right"} margin={"0 0 0 auto"}>
                  <PlusIcon />
                </PlusIconWrapper>
              )}
            </ProductPriceWrapper>
          </ProductInfo>
        </ProductContainer>
      )}

      {showCampaignTag && (
        <>
          <ProductCampaignWrapper>
            {product.main_tags?.[0] && <Tag>{MAIN_TAG[product.main_tags[0]]}</Tag>}
            <ImageWrapper>
              <CampaignTag>Extra LP</CampaignTag>
              <ProductCampaignImageWrapper href={`${details.product(product.id)}`}>
                <ProductImageCampaign src={product.images[0]} />
              </ProductCampaignImageWrapper>
            </ImageWrapper>
            <ProductInfo>
              <ProductName href={`${details.product(product.id)}`}>{product.name}</ProductName>
              <RatingsWrapper>
                <RatingValue>{roundingNumber(product.rating)}</RatingValue>
                <Box justifySelf={"center"}>
                  <StarIconGreen />
                </Box>
                <ReviewCount>({isPlural(product.reviews, "review")})</ReviewCount>
              </RatingsWrapper>
              <ProductPriceWrapper>
                <ProductPrice>S$ {format2Digit(product.price)}</ProductPrice>
                <PlusIconWrapper product={product} textAlign={"right"} margin={"0 0 0 auto"}>
                  <PlusIcon />
                </PlusIconWrapper>
              </ProductPriceWrapper>
            </ProductInfo>
          </ProductCampaignWrapper>
        </>
      )}
    </>
  );
};

export default ProductCard;
