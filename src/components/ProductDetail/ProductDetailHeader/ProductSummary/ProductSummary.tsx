import React, { useEffect, useMemo, useState } from "react";
import {
  CampaignIconWrapper,
  CampaignLeftContent,
  CampaignLeftWrapper,
  CampaignRightContent,
  CampaignRightWrapper,
  CampaignWrapper,
  CustomRating,
  Name,
  Price,
  RatingWrapper,
  Reviews,
  SeeMore,
  Shipping,
  ShippingAddress,
  ShippingInfo,
  ShippingWrapper,
  Wrapper,
} from "./styles";
import { formatPrice } from "@/commons/utils/formatNumber";
import { EXCHANGE_RATE, URL_PUBLIC_MERCHANT_STORE_ADDRESS } from "@/commons/constants/apiUrl";
import useFetchList from "@/commons/hooks/useFetchList";
import { format2Digit, formatLP } from "@/utils/formatNumber";
import { CampaignInfoIcon } from "@/assets/icons";
import CampaignInfoModal
  from "@/components/ProductDetail/ProductDetailHeader/ProductSummary/CampaignInfoModal/CampaignInfoModal";
import BigNumber from "bignumber.js";
import defaultAxios from "@/commons/utils/axios";
import { isPlural } from "@/utils/product";

export interface ProductSummaryProps {
  name: string;
  rating: number;
  reviews: number;
  price: number;
  merchant_store_id: number;
  campaignInfo: CampaignInfo | undefined;
}

const params = {
  perPage: 2,
};
export const ProductSummary: React.FunctionComponent<ProductSummaryProps> = ({
  name,
  rating,
  reviews,
  price,
  merchant_store_id,
  campaignInfo,
}: ProductSummaryProps) => {
  const { data } = useFetchList<MerchantStore>(URL_PUBLIC_MERCHANT_STORE_ADDRESS(merchant_store_id), params);

  const [more, setMore] = useState(true);
  const [displayMore, setDisplayMore] = useState(false);
  const [showCount, setShowCount] = useState(0);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  useEffect(() => {
    setDisplayMore(data && data.length > 1);
  }, [data]);

  useEffect(() => {
    if (displayMore) {
      setShowCount(more ? 1 : data.length);
    }
  }, [more, displayMore]);

  const clickCampaignInfo = () => {
    setOpenInfoModal(true);
  }

  const closeModal = () => {
    setOpenInfoModal(false);
  }

  const [configExchange, setConfigExchage] = useState<{
    lp_rate: number;
    sgd_rate: number;
  }>({
    lp_rate: 1,
    sgd_rate: 1,
  });

  useEffect(() => {
    getExchangeRate();
  }, []);

  const getExchangeRate = async () => {
    try {
      const res = await defaultAxios.get<any>(EXCHANGE_RATE);
      const config = res.data;
      setConfigExchage(config);
    } catch (error) {}
  };


  const loyaltyPointBalance = useMemo(() => {
    if (campaignInfo) {
      return new BigNumber(campaignInfo.single_lp_amount)
        .multipliedBy(configExchange.sgd_rate)
        .div(configExchange.lp_rate)
        .toFixed(2, 1);
    }
    return 0;
  }, [configExchange.lp_rate, configExchange.sgd_rate, campaignInfo]);

  return (
    <Wrapper>
      <Name> {name}</Name>
      <RatingWrapper>
        <CustomRating value={rating} readOnly precision={0.5} size="small" />
        <Reviews>{isPlural(reviews, 'review')}</Reviews>
      </RatingWrapper>
      <Price>S$ {format2Digit(price)}</Price>


      {campaignInfo && <CampaignWrapper>
        <CampaignLeftWrapper>
          <CampaignLeftContent>
            <span> <span style={{color: "white"}}>Bonus</span> {formatLP(campaignInfo.single_lp_amount)} LP ~ {formatLP(loyaltyPointBalance)} S$ </span>
          </CampaignLeftContent>
        </CampaignLeftWrapper>

        <CampaignRightWrapper>
          <CampaignRightContent>
            Extra LP
          </CampaignRightContent>
        </CampaignRightWrapper>

        <CampaignIconWrapper onClick={clickCampaignInfo}><CampaignInfoIcon/></CampaignIconWrapper>

      </CampaignWrapper> }
      <ShippingWrapper>
        <Shipping>Delivered from: </Shipping>
        {data.length > 0 && (
          <ShippingInfo>
            {data.map((item: MerchantStore, index) => (
              <ShippingAddress key={index}>{item.address}</ShippingAddress>
            ))}
          </ShippingInfo>
        )}
        {displayMore && (
          <SeeMore onClick={() => setMore(!more)}>{more ? "See more location" : "See less location"}</SeeMore>
        )}
      </ShippingWrapper>

      <CampaignInfoModal isOpen={openInfoModal} onConfirm={closeModal} onClose={closeModal} campaignInfo={campaignInfo} storeId={merchant_store_id}/>
    </Wrapper>
  );
};
