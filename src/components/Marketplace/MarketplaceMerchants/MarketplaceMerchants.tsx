import {
  URL_MERCHANT_STORE_LIST,
  URL_MERCHANT_STORE_LIST_BY_PRODUCT_NAME,
  URL_MERCHANT_STORE_LIST_BY_TAG,
} from "@/commons/constants/apiUrl";
import useFetchInfinity from "@/commons/hooks/useFetchInfinity";
import useQuery from "@/commons/hooks/useQuery";
import MerchantCard, { SkeletonMerchantCard } from "@/components/commons/MerchantCard/MerchantCard";
import NotFoundData from "@/components/commons/NotFoundData/NotFoundData";
import { Grid } from "@mui/material";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MarketplaceFilterBar from "../MarketplaceFilterBar/MarketplaceFilterBar";
import { FilterResult, MainContainer, SearchResult } from "./styles";
import MarketplaceFilterSearchBar from "@/components/Marketplace/MarketplaceFilterBar/MarketplaceFilterSearchBar";
import useFetchList from "@/commons/hooks/useFetchList";
import { useEffect, useState } from "react";
import { ORDER_BYS } from "@/commons/constants/pagination";

const MarketplaceMerchants: React.FC = () => {
  const { page, keyword, ...query } = useQuery<MerchantsQuery>({
    perPage: 8,
    sort_by: "rating",
    order_by: ORDER_BYS.DESC,
    is_exclude_empty_store: true,
  });

  useEffect(() => {
    if (!keyword) {
      setViewAll(false);
    }
  }, [keyword]);

  const { data, loading, hasMore, next } = useFetchInfinity<StoreItem>(URL_MERCHANT_STORE_LIST, {
    ...query,
    is_exclude_empty_store: true,
  });

  const querySearchProductName = { perPage: 3, keyword, is_exclude_empty_store: true };
  const { data: dataSearchProductName, loading: loadingSearchProductName } = useFetchList<StoreItem>(
    keyword ? URL_MERCHANT_STORE_LIST_BY_PRODUCT_NAME : "",
    querySearchProductName
  );

  const querySearchTag = { perPage: 3, keyword, is_exclude_empty_store: true };
  const { data: dataSearchTag, loading: loadingSearchTag } = useFetchList<StoreItem>(
    keyword ? URL_MERCHANT_STORE_LIST_BY_TAG : "",
    querySearchTag
  );

  const querySearchStoreName = {
    perPage: 4,
    keyword,
    is_exclude_empty_store: true,
  };
  const { data: dataSearchStoreName, loading: loadingSearchStoreName } = useFetchList<StoreItem>(
    keyword ? URL_MERCHANT_STORE_LIST : "",
    querySearchStoreName
  );

  const [viewAll, setViewAll] = useState(false);
  const [viewAllType, setViewAllType] = useState<string>("");
  const [queryAllUrl, setQueryALlUrl] = useState<string | undefined>(undefined);

  const queryAllParam = { perPage: 1000, keyword };
  const { data: dataAll, loading: loadingAll } = useFetchList<StoreItem>(
    keyword ? (queryAllUrl ? queryAllUrl : "") : "",
    queryAllParam
  );

  const viewAllStoreName = () => {
    setViewAll(true);
    setViewAllType("Results for store name: ");
    setQueryALlUrl(URL_MERCHANT_STORE_LIST);
  };

  const viewAllProductName = () => {
    setViewAll(true);
    setViewAllType("Results for product name: ");
    setQueryALlUrl(URL_MERCHANT_STORE_LIST_BY_PRODUCT_NAME);
  };

  const viewAllTag = () => {
    setViewAll(true);
    setViewAllType("Results for product hashtag: ");
    setQueryALlUrl(URL_MERCHANT_STORE_LIST_BY_TAG);
  };

  const quitViewAll = () => {
    setViewAll(false);
    setViewAllType("");
    setQueryALlUrl("");
  };

  return (
    <>
      {viewAll && keyword && (
        <MainContainer>
          <FilterResult>
            <MarketplaceFilterSearchBar
              label={viewAllType}
              viewAll={viewAllStoreName}
              isViewAll={true}
              quitViewAll={quitViewAll}
            />
            <Grid container columnSpacing="24px" rowSpacing="24px">
              {dataAll.map(merchant => (
                <Grid item xs={6} sm={3} key={merchant.id}>
                  <MerchantCard restaurant={merchant} defaultTag="NEW" direction="verticalWithFavorite" />
                </Grid>
              ))}
            </Grid>
            {!loadingAll && !dataAll.length && <SearchResult>Found 0 store</SearchResult>}
          </FilterResult>
        </MainContainer>
      )}

      {!viewAll && (
        <MainContainer>
          {/*Store name*/}
          {keyword && (
            <FilterResult>
              <MarketplaceFilterSearchBar
                label={"Results for store name: "}
                viewAll={viewAllStoreName}
                isViewAll={false}
                quitViewAll={quitViewAll}
              />
              <Grid container columnSpacing="24px" rowSpacing="24px">
                {dataSearchStoreName.map(merchant => (
                  <Grid item xs={6} sm={3} key={merchant.id}>
                    <MerchantCard restaurant={merchant} defaultTag="NEW" direction="verticalWithFavorite" />
                  </Grid>
                ))}
              </Grid>
              {!loadingSearchStoreName && !dataSearchStoreName.length && <SearchResult>Found 0 store</SearchResult>}
            </FilterResult>
          )}

          {/*Product name*/}
          {keyword && (
            <FilterResult>
              <MarketplaceFilterSearchBar
                label={"Results for product name: "}
                viewAll={viewAllProductName}
                isViewAll={false}
                quitViewAll={quitViewAll}
              />
              <Grid container columnSpacing="24px" rowSpacing="24px">
                {dataSearchProductName.map(merchant => (
                  <Grid item xs={6} sm={3} key={merchant.id}>
                    <MerchantCard restaurant={merchant} defaultTag="NEW" direction="verticalWithFavorite" />
                  </Grid>
                ))}
              </Grid>
              {!loadingSearchProductName && !dataSearchProductName.length && <SearchResult>Found 0 store</SearchResult>}
            </FilterResult>
          )}

          {/*Product tag*/}
          {keyword && (
            <FilterResult>
              <MarketplaceFilterSearchBar
                label={"Results for product hashtag: "}
                viewAll={viewAllTag}
                isViewAll={false}
                quitViewAll={quitViewAll}
              />
              <Grid container columnSpacing="24px" rowSpacing="24px">
                {dataSearchTag.map(merchant => (
                  <Grid item xs={6} sm={3} key={merchant.id}>
                    <MerchantCard restaurant={merchant} defaultTag="NEW" direction="verticalWithFavorite" />
                  </Grid>
                ))}
              </Grid>
              {!loadingSearchTag && !dataSearchTag.length && <SearchResult>Found 0 store</SearchResult>}
            </FilterResult>
          )}

          {(query.category_ids !== undefined || !keyword) && (
            <InfiniteScroll
              style={{ marginTop: "30px" }}
              key={data.length}
              dataLength={data.length}
              next={next}
              hasMore={hasMore}
              loader={
                <Grid container columnSpacing="24px" rowSpacing="24px">
                  {new Array(6).fill(0).map((_, index) => (
                    <Grid item xs={6} sm={3} key={index}>
                      <SkeletonMerchantCard direction="vertical" />
                    </Grid>
                  ))}
                </Grid>
              }
            >
              <MarketplaceFilterBar />
              <Grid container columnSpacing="24px" rowSpacing="24px">
                {data.map(merchant => (
                  <Grid item xs={6} sm={3} key={merchant.id}>
                    <MerchantCard restaurant={merchant} defaultTag="NEW" direction="verticalWithFavorite" />
                  </Grid>
                ))}
              </Grid>
              {!loading && !data.length && <NotFoundData text="merchant" />}
            </InfiniteScroll>
          )}
        </MainContainer>
      )}
    </>
  );
};

export default MarketplaceMerchants;
