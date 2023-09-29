import useFetchList from "@/commons/hooks/useFetchList";
import { CampaignProducts } from "@/components/MerchantDetail/CampaignProducts/CampaignProducts";
import { URL_CAMPAIGN_LIST } from "@/commons/constants/apiUrl";

export const CampaignProductsList = ({ merchantId }: { merchantId: Store["id"] }) => {
  const { data, loading } = useFetchList<Campaign>(URL_CAMPAIGN_LIST(merchantId));
  return (
    <>
      {loading ||
        (!loading &&
          data.length > 0 &&
          data.map((value, index) => {
            return <CampaignProducts merchantId={merchantId} campaign={value} key={index} />;
          }))}
    </>
  );
};
