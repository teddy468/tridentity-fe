import { details } from "@/commons/constants/routers";
import React from "react";
import {
  StyledRating,
  MerchantDetail,
  MerchantImage,
  MerchantItem,
  MerchantName,
  MerchantRating,
  MerchantRatingValue,
  MerchantSaleOff,
  SalesOrders,
  SkeletonMerchantImage,
  SkeletonMerchantItem,
  SkeletonMerchantName,
  SkeletonMerchantRating,
  SkeletonMerchantSaleOff,
  SkeletonSalesOrders,
} from "./styles";

export const SkeletonMarketplaceMerchantItem = () => {
  return (
    <SkeletonMerchantItem>
      <SkeletonMerchantSaleOff />
      <SkeletonMerchantImage variant="rectangular" />
      <MerchantDetail>
        <SkeletonMerchantName variant="rectangular" />
        <SkeletonMerchantRating variant="rectangular" />
        <SkeletonSalesOrders variant="rectangular" />
      </MerchantDetail>
    </SkeletonMerchantItem>
  );
};

interface Props {
  merchant: StoreItem;
}
const MarketplaceMerchantItem = ({ merchant }: Props) => {
  return (
    <MerchantItem href={details.store(merchant.id)}>
      <MerchantSaleOff></MerchantSaleOff>
      <MerchantImage src={merchant.logo} />
      <MerchantDetail>
        <MerchantName>{merchant.name}</MerchantName>
        <MerchantRating>
          Rating: <MerchantRatingValue>4.5</MerchantRatingValue>
          <StyledRating value={4.5} readOnly />
        </MerchantRating>
        <SalesOrders>Sales: 109,098 products</SalesOrders>
      </MerchantDetail>
    </MerchantItem>
  );
};

export default MarketplaceMerchantItem;
