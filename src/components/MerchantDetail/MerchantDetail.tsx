import { CampaignProductsList } from "@/components/MerchantDetail/CampaignProducts/CampaignProductsList";
import { SearchProduct } from "@/components/MerchantDetail/SearchProduct/SearchProduct";
import React from "react";
import MerchantStoreBanner from "./MerchantBanner/MerchantBanner";
import MerchantStoreDetailInfo from "./MerchantDetailInfo/MerchantDetailInfo";
import OurMenu from "./OurMenu/OurMenu";
import Review from "./Review/Review";
import { MerchantDetailContainer } from "./styles";
import { TempFeatureProducts } from "./TempFeatureProducts/TempFeatureProducts";
import { TempleMustTry } from "./TempleMustTry/TempleMustTry";
import { Voucher } from "./Voucher";
import { isMobile } from "react-device-detect";

type Props = {
  merchantStore: Store;
};

const MerchantStoreDetail = ({ merchantStore }: Props) => {
  return (
    <MerchantDetailContainer>
      <MerchantStoreBanner banners={merchantStore.banners} />
      <MerchantStoreDetailInfo merchantStore={merchantStore} />
      <SearchProduct merchantId={merchantStore.id} />
      {/* <Voucher merchantId={merchantStore.id} /> */}
      <CampaignProductsList merchantId={merchantStore.id} />
      <TempFeatureProducts merchantId={merchantStore.id} />
      {!isMobile && <TempleMustTry merchantId={merchantStore.id} />}
      <OurMenu merchantCategory={merchantStore.categoriesLevel1} />
      <Review storeId={merchantStore.id} />
    </MerchantDetailContainer>
  );
};

export default MerchantStoreDetail;
