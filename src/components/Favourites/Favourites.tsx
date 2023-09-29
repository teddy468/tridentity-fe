import { URL_FAVORITES } from "@/commons/constants/apiUrl";
import { ORDER_BYS } from "@/commons/constants/pagination";
import { PRODUCT_SORT_BYS } from "@/commons/constants/product";
import useFetchInfinity from "@/commons/hooks/useFetchInfinity";
import MerchantCard, { SkeletonMerchantCard } from "@/components/commons/MerchantCard/MerchantCard";
import NotFoundData from "@/components/commons/NotFoundData/NotFoundData";
import TypeSearch from "@/components/Favourites/TypeSearch";
import { Grid } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MainContainer, Title } from "./styles";

const Favourites: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const query = {
    page: 1,
    perPage: 9,
    keyword: keyword,
    sort_by: PRODUCT_SORT_BYS.create_time,
    order_by: ORDER_BYS.DESC,
  };
  const { data, loading, hasMore, next, refresh } = useFetchInfinity<StoreItem>(URL_FAVORITES, query);

  const onSearch = (value: string) => {
    setKeyword(value);
  };

  return (
    <MainContainer>
      <Title>Favourite restaurants</Title>
      <TypeSearch onSearch={(value: string) => onSearch(value)} />

      <InfiniteScroll
        key={data.length}
        dataLength={data.length}
        next={next}
        hasMore={hasMore}
        loader={
          <Grid container columnSpacing="24px" rowSpacing="24px">
            {new Array(6).fill(0).map((_, index) => (
              <Grid item xs={6} sm={4} key={index}>
                <SkeletonMerchantCard direction="vertical" />
              </Grid>
            ))}
          </Grid>
        }
      >
        <Grid container columnSpacing="24px" rowSpacing="24px">
          {data.map(favorite => (
            <Grid item xs={6} sm={4} key={favorite.id}>
              <MerchantCard restaurant={favorite} defaultTag="Tag" direction="verticalWithFavorite" />
            </Grid>
          ))}
        </Grid>
        {!loading && !data.length && <NotFoundData text="favorite " />}
      </InfiniteScroll>
    </MainContainer>
  );
};

export default Favourites;
