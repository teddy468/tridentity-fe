import { PRODUCTS_DASHBOARD_SETTING } from "@/commons/constants/apiUrl";
import { Box, Grid } from "@mui/material";
import { DishGridItem, DishGridList, FlexBox, SectionContainer, SectionContent, Title, ViewAll } from "./styles";
import { RightArrowIcon } from "@/assets/icons";
import { routers } from "@/commons/constants/routers";
import Icon from "@/components/commons/Icon/Icon";
import ProductCard, { SkeletonProductCard } from "@/components/commons/ProductCard/ProductCard";
import useFetch from "@/commons/hooks/useFetch";
import { useMemo, useState } from "react";
import SeeMoreButton from "@/components/commons/SeeMoreButton/SeeMoreButton";
import { isMobile } from "react-device-detect";

export const TopSellingDishes = () => {
  const { data: topSellingDishes, loading } = useFetch<ProductDashboardConfig[]>(
    PRODUCTS_DASHBOARD_SETTING("top_selling")
  );

  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(4);

  const data = useMemo(() => {
    return topSellingDishes?.map(productConfig => productConfig.product).filter(product => !!product) as ProductV2[];
  }, [topSellingDishes]);

  const handleSeeMore = () => {
    setIsOpen(!isOpen);
    return !isOpen ? setCount(10) : setCount(4);
  };

  const renderDishItem = () => {
    if (isMobile) {
      return data?.slice(0, count).map(product => {
        return (
          <DishGridItem item key={product.id} xs={6} sm={12 / 5}>
            <ProductCard product={product} />
          </DishGridItem>
        );
      });
    }
    return data?.map(product => {
      return (
        <DishGridItem item key={product.id} xs={6} sm={12 / 5}>
          <ProductCard product={product} />
        </DishGridItem>
      );
    });
  };

  return (
    <>
      {data?.length > 0 && (
        <SectionContainer>
          <SectionContent maxWidth="lg">
            <FlexBox>
              <Title>Top Selling Dishes</Title>
              <ViewAll href={routers.ALL_DISHES} color="gradient">
                <Icon icon={RightArrowIcon} gradient isFill />
              </ViewAll>
            </FlexBox>

            <Box mt={{ xs: "26px", lg: "32px" }}>
              <DishGridList container rowSpacing={{ xs: 2, lg: 3 }} columnSpacing={{ xs: 2, lg: 3 }}>
                {loading
                  ? new Array(5).fill(0).map((_, index) => (
                      <DishGridItem item key={index} xs={6} sm={3}>
                        <SkeletonProductCard />
                      </DishGridItem>
                    ))
                  : renderDishItem()}
                {data.length > 4 && isMobile && (
                  <Grid item xs={12}>
                    <Box onClick={handleSeeMore} marginTop={2}>
                      <SeeMoreButton isOpen={isOpen} />
                    </Box>
                  </Grid>
                )}
              </DishGridList>
            </Box>
          </SectionContent>
        </SectionContainer>
      )}
    </>
  );
};
