import { URL_MERCHANT_PRODUCTS } from "@/commons/constants/apiUrl";
import useFetchList from "@/commons/hooks/useFetchList";
import { Box, Grid } from "@mui/material";
import { DishGridItem, FlexBox, SectionContainer, SectionContent, Title } from "./styles";
import ProductCard, { SkeletonProductCard } from "@/components/commons/ProductCard/ProductCard";
import TypeSearch from "@/components/MerchantDetail/SearchProduct/TypeSearch";
import { useState } from "react";
import { ORDER_BYS } from "@/commons/constants/pagination";
import { PRODUCT_SORT_BYS } from "@/commons/constants/product";

export const SearchProduct = ({ merchantId }: { merchantId: Store["id"] }) => {
  const [keyWord, setKeyWord] = useState("");
  const param = { sort_by: PRODUCT_SORT_BYS.create_time, order_by: ORDER_BYS.DESC, keyword: keyWord };

  const { data, loading } = useFetchList<Product>(keyWord ? URL_MERCHANT_PRODUCTS(merchantId) : "", param);

  function onSearch(value: string) {
    console.log("Search: ", value);
    setKeyWord(value);
  }

  return (
    <>
      <SectionContainer>
        <SectionContent maxWidth="lg">
          <TypeSearch onSearch={(value: string) => onSearch(value)} />
          {loading ||
            (!loading && data.length > 0 && keyWord && (
              <SectionContainer>
                <SectionContent maxWidth="lg">
                  <FlexBox>
                    <Title>Search Result</Title>
                  </FlexBox>

                  <Box mt={{ xs: "26px", lg: "32px" }}>
                    <Grid container spacing={{ xs: 2, lg: 3 }}>
                      {loading
                        ? new Array(4).fill(0).map((_, index) => (
                            <DishGridItem item key={index} xs={6} sm={3}>
                              <SkeletonProductCard />
                            </DishGridItem>
                          ))
                        : data.map(product => {
                            return (
                              <DishGridItem item key={product.id} xs={6} sm={6} md={3}>
                                <ProductCard product={product} />
                              </DishGridItem>
                            );
                          })}
                    </Grid>
                  </Box>
                </SectionContent>
              </SectionContainer>
            ))}

          {!loading && keyWord && (!data || data.length === 0) && (
            <Title sx={{ marginTop: "15px", fontSize: "15px" }}> Found 0 products</Title>
          )}
        </SectionContent>
      </SectionContainer>
    </>
  );
};
