import React, { useRef } from "react";
import { MerchantBannerWrapper, Item, StyledImage } from "./styles";


type Props = {
  banners: Store["banners"];
};

const MerchantStoreBanner = ({ banners }: Props) => {
  return (
    <MerchantBannerWrapper>
      <Item>
        <StyledImage src={banners[0]} />
      </Item>
    </MerchantBannerWrapper>
  );
};

export default MerchantStoreBanner;
