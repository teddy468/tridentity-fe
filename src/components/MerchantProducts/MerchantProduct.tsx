import { URL_MERCHANT_PRODUCTS } from "@/commons/constants/apiUrl";
import useFetchList from "@/commons/hooks/useFetchInfinity";
import MarketplaceFilter from "@/components/Marketplace/MarketplaceFilter/MarketplaceFilter";
import { Button, Grid, InputAdornment } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import NotFoundData from "../commons/NotFoundData/NotFoundData";
import ProductCard, { SkeletonProductCard } from "../commons/ProductCard/ProductCard";
import {
  AllDishesContainer,
  AllDishesWrapper,
  FilterWrapperDesktop,
  FilterWrapperMobile,
  HeaderWrapper,
  MarketPlaceContainer,
  MarketPlaceContentDesktop,
  MarketPlaceContentMobile,
  MarketplaceWrapper,
  SearchForm,
  SearchIcon,
  SearchTextField,
  Title,
} from "./styles";

function compareItems(a: ProductItem, b: ProductItem): number {
  if (a.settings.is_featured && !b.settings.is_featured) {
    return -1;
  } else if (!a.settings.is_featured && b.settings.is_featured) {
    return 1;
  } else {
    if (a.rating > b.rating) {
      return -1;
    } else if (a.rating < b.rating) {
      return 1;
    } else {
      return 0;
    }
  }
}

export const MerchantStoreProducts = () => {
  const router = useRouter();
  const { slug, is_featured, category_ids, campaign_id } = router.query;

  const [keyword, setKeyword] = useState("");
  const param = {
    page: 1,
    perPage: 1000,
    category_ids: category_ids,
    sort_by: "rating",
    order_by: "DESC",
    paginationMetadataStyle: "body",
    keyword: keyword,
    is_featured,
    campaignId: campaign_id,
  };

  const [text, setText] = useState("");
  const { data, loading } = useFetchList<ProductItem>(URL_MERCHANT_PRODUCTS(+(slug as string)), param as any);

  const {
    handleSubmit,
    register,
    formState: {},
  } = useForm<SearchProduct>();

  const onSubmit = (value: SearchProduct) => {
    setKeyword(text);
  };

  function onChangeText(value: string) {
    setText(value);
    if (value === "") {
      setKeyword("");
    }
  }

  return (
    <AllDishesWrapper>
      <AllDishesContainer>
        <Title>Featured Dishes</Title>
        <HeaderWrapper>
          <SearchForm id="app" onSubmit={handleSubmit(onSubmit)}>
            <FilterWrapperMobile>
              <MarketplaceFilter />
            </FilterWrapperMobile>
            <SearchTextField
              {...register("searchValue")}
              onChange={event => onChangeText(event.target.value)}
              placeholder="Search for dishes"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Button variant="text" type="submit">
                      <SearchIcon />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </SearchForm>
        </HeaderWrapper>
        <MarketplaceWrapper>
          <MarketPlaceContainer>
            <MarketPlaceContentDesktop container spacing={2}>
              <FilterWrapperDesktop item md={2}>
                <MarketplaceFilter />
              </FilterWrapperDesktop>
              <Grid item md={10}>
                <Grid container spacing={2}>
                  {loading ? (
                    new Array(3).fill(0).map((_, index) => (
                      <Grid item key={index} md={3}>
                        <SkeletonProductCard />
                      </Grid>
                    ))
                  ) : data.length > 0 ? (
                    data.sort(compareItems).map(product => {
                      return (
                        <Grid item key={product.id} md={3}>
                          <ProductCard product={product} />
                        </Grid>
                      );
                    })
                  ) : (
                    <NotFoundData text="dish" />
                  )}
                </Grid>
              </Grid>
            </MarketPlaceContentDesktop>

            <MarketPlaceContentMobile container spacing={2}>
              {loading ? (
                new Array(2).fill(0).map((_, index) => (
                  <Grid item key={index} xs={6}>
                    <SkeletonProductCard />
                  </Grid>
                ))
              ) : data.length > 0 ? (
                data.sort(compareItems).map(product => {
                  return (
                    <Grid item key={product.id} xs={6}>
                      <ProductCard product={product} />
                    </Grid>
                  );
                })
              ) : (
                <NotFoundData text="dish" />
              )}
            </MarketPlaceContentMobile>
          </MarketPlaceContainer>
        </MarketplaceWrapper>
      </AllDishesContainer>
    </AllDishesWrapper>
  );
};
