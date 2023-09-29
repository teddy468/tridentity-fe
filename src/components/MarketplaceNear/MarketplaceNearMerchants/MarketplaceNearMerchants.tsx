import { URL_MERCHANT_STORE_LIST } from "@/commons/constants/apiUrl";
import useFetchInfinity from "@/commons/hooks/useFetchInfinity";
import useQuery from "@/commons/hooks/useQuery";
import MerchantCard, { SkeletonMerchantCard } from "@/components/commons/MerchantCard/MerchantCard";
import NotFoundData from "@/components/commons/NotFoundData/NotFoundData";
import { Grid } from "@mui/material";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MarketplaceNearFilterBar from "../MarketplaceNearFilterBar/MarketplaceNearFilterBar";
import { MainContainer } from "./styles";
import { ORDER_BYS } from "@/commons/constants/pagination";

const MarketplaceNearMerchants: React.FC = () => {
  const query = useQuery<MerchantsQuery>({
    perPage: 12,
    sort_by: "distance",
    order_by: ORDER_BYS.ASC,
  });
  const { lat, lng, address } = query;

  console.log({query})

  const { data, loading, hasMore, next } = useFetchInfinity<StoreItemNear>(URL_MERCHANT_STORE_LIST, {
    ...query,
    is_exclude_empty_store: true,
  });

  if (!(lat && lng && address)) return <NotFoundData text="merchant" />;

  return (
    <MainContainer>
      <InfiniteScroll
        style={{ marginTop: "30px" }}
        key={data.length}
        dataLength={data.length}
        next={next}
        hasMore={hasMore}
        loader={
          <Grid container columnSpacing="24px" rowSpacing="24px">
            {new Array(6).fill(0).map((_, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <SkeletonMerchantCard direction="vertical" />
              </Grid>
            ))}
          </Grid>
        }
      >
        <MarketplaceNearFilterBar />
        <Grid container columnSpacing="24px" rowSpacing="24px">
          {data.map(merchant => (
            <Grid item xs={6} sm={4} md={3} key={merchant.id}>
              <MerchantCard
                restaurant={merchant}
                defaultTag="NEW"
                direction="vertical"
                distance={merchant.distance_in_meter}
              />
            </Grid>
          ))}
        </Grid>
        {!loading && !data.length && <NotFoundData text="merchant" />}
      </InfiniteScroll>
    </MainContainer>
  );
};

export default MarketplaceNearMerchants;
