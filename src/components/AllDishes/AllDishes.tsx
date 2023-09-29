import { URL_ALL_PRODUCTS } from "@/commons/constants/apiUrl";
import useFetchList from "@/commons/hooks/useFetchList";
import {
  AllDishesContainer,
  AllDishesWrapper,
  FilterContainer,
  FilterContainerMobile,
  HeaderWrapper,
  MarketPlaceContainer,
  MarketplaceWrapper,
  PaginationWrapper,
  SearchButton,
  SearchForm,
  SearchIcon,
  SearchTextField,
  Title,
} from "./styles";
import { Button, Grid, InputAdornment, ThemeProvider } from "@mui/material";
import NotFoundData from "../commons/NotFoundData/NotFoundData";

import ProductCard, { SkeletonProductCard } from "../commons/ProductCard/ProductCard";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MarketplaceFilter from "@/components/Marketplace/MarketplaceFilter/MarketplaceFilter";
import MarketplaceFilterBar from "@/components/Marketplace/MarketplaceFilterBar/MarketplaceFilterBar";
import { useRouter } from "next/router";
import { PaginationCustom } from "@/components/MerchantDetail/Review/styles";
import { createTheme } from "@mui/material/styles";

export const AllDishes = () => {
  const router = useRouter();
  const { category_ids } = router.query;

  const [keyword, setKeyword] = useState("");
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  const param = {
    page: page,
    perPage: perPage,
    category_ids: category_ids,
    sort_by: "rating",
    order_by: "DESC",
    paginationMetadataStyle: "body",
    keyword: keyword,
  };
  const { data, loading, totalPage } = useFetchList<ProductItem>(URL_ALL_PRODUCTS, param as any);

  const {
    handleSubmit,
    register,
    formState: {},
  } = useForm<SearchProduct>();

  function onChangeText(value: string) {
    setText(value);
    if (value === "") {
      setPage(1);
      setKeyword("");
    }
  }

  const onSubmit = (value: SearchProduct) => {
    setPage(1);
    setKeyword(text);
  };

  function handleChange(page: number) {
    setPage(page);
  }

  const theme = createTheme({
    palette: {
      mode: "light", // or 'dark'
      text: {
        primary: "#fff",
      },
      primary: {
        main: "#fff",
      },
    },
    mode: "light", // or 'dark'
    isDark: false, // or true
  });

  return (
    <AllDishesWrapper>
      <AllDishesContainer>
        <Title>Featured Dishes</Title>
        <HeaderWrapper>
          <SearchForm id="app" onSubmit={handleSubmit(onSubmit)}>
            <FilterContainerMobile>
              <MarketplaceFilter />
            </FilterContainerMobile>
            <SearchTextField
              {...register("searchValue")}
              onChange={event => onChangeText(event.target.value)}
              placeholder="Search for dishes"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchButton variant="text" type="submit">
                      <SearchIcon />
                    </SearchButton>
                  </InputAdornment>
                ),
              }}
            />
          </SearchForm>
        </HeaderWrapper>
        <MarketplaceWrapper>
          <MarketPlaceContainer>
            <Grid container columnSpacing={"24px"}>
              <FilterContainer item xs={12} md={3}>
                <MarketplaceFilter />
              </FilterContainer>
              <Grid item xs={12} md={9}>
                <MarketplaceFilterBar />
                <Grid container spacing="24px">
                  {loading ? (
                    new Array(3).fill(0).map((_, index) => (
                      <Grid item key={index} xs={6} sm={6} md={4}>
                        <SkeletonProductCard />
                      </Grid>
                    ))
                  ) : data.length > 0 ? (
                    data.map(product => {
                      return (
                        <Grid item key={product.id} xs={6} sm={6} md={4}>
                          <ProductCard product={product} />
                        </Grid>
                      );
                    })
                  ) : (
                    <NotFoundData text="dish" />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <PaginationWrapper>
              <ThemeProvider theme={theme}>
                <PaginationCustom
                  count={totalPage}
                  variant="outlined"
                  shape="rounded"
                  color={"primary"}
                  page={page}
                  onChange={(event: React.ChangeEvent<unknown>, page: number) => handleChange(page)}
                />
              </ThemeProvider>
            </PaginationWrapper>
          </MarketPlaceContainer>
        </MarketplaceWrapper>
      </AllDishesContainer>
    </AllDishesWrapper>
  );
};
