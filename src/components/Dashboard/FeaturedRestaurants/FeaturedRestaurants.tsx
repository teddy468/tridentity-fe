import { RightArrowIcon, SlickLeftArrow, SlickRightArrow } from "@/assets/icons";
import { MERCHANT_STORE_DASHBOARD_SETTING } from "@/commons/constants/apiUrl";
import { routers } from "@/commons/constants/routers";
import Icon from "@/components/commons/Icon/Icon";
import MerchantCard, { SkeletonMerchantCard } from "@/components/commons/MerchantCard/MerchantCard";
import {
  ContentContainer,
  FeaturedRestaurantsContainer,
  Header,
  StyledFeaturedSlider,
  Title,
  ViewAll,
  ArrowButton,
  CardWrapper,
  MobileDisplayWrapper,
  FeaturedGridItem,
} from "./styles";
import useFetch from "@/commons/hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { getDefaultTag } from "@/utils/product";
import { isMobile } from "react-device-detect";
import { Box, Grid } from "@mui/material";
import SeeMoreButton from "@/components/commons/SeeMoreButton/SeeMoreButton";

const FeaturedRestaurantsMobile = () => {
  const { data, loading } = useFetch<MerchantStoreConfig[]>(MERCHANT_STORE_DASHBOARD_SETTING("featured"));
  const featuredRestaurant: StoreItem[] = data
    ?.map(merchantStore => merchantStore.merchantStore)
    .filter(merchantStore => !!merchantStore) as StoreItem[];

  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(4);

  const drag = useRef<boolean>(false);

  const handleSeeMore = () => {
    setIsOpen(!isOpen);
    return !isOpen ? setCount(8) : setCount(4);
  };

  return (
    <>
      {featuredRestaurant?.length > 0 && (
        <FeaturedRestaurantsContainer>
          <ContentContainer>
            <Header>
              <Title>Featured restaurants</Title>
              <ViewAll href={routers.MARKETPLACE} color="gradient">
                <Icon icon={RightArrowIcon} gradient isFill />
              </ViewAll>
            </Header>
            {isMobile ? (
              <MobileDisplayWrapper>
                <Grid container rowSpacing={{ xs: 2, lg: 3 }} columnSpacing={{ xs: 2, lg: 3 }}>
                  {featuredRestaurant.slice(0, count).map(restaurant => (
                    <FeaturedGridItem item key={restaurant.id} xs={6} sm={12 / 5}>
                      <CardWrapper>
                        <MerchantCard
                          key={restaurant.id}
                          defaultTag={getDefaultTag(restaurant)}
                          direction="verticalWithFavorite"
                          restaurant={restaurant}
                        />
                      </CardWrapper>
                    </FeaturedGridItem>
                  ))}
                  {featuredRestaurant?.length > 4 && (
                    <Grid item xs={12}>
                      <Box onClick={handleSeeMore} marginTop={2}>
                        <SeeMoreButton isOpen={isOpen} />
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </MobileDisplayWrapper>
            ) : (
              <StyledFeaturedSlider
                dots={false}
                infinite={false}
                speed={500}
                slidesToShow={5}
                slidesToScroll={5}
                draggable={true}
                beforeChange={() => (drag.current = true)}
                afterChange={() => (drag.current = false)}
                rows={2}
                responsive={[
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 4,
                      initialSlide: 4,
                    },
                  },
                  {
                    breakpoint: 540,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      initialSlide: 2,
                      rows: 5,
                    },
                  },
                ]}
                prevArrow={
                  <ArrowButton>
                    <SlickLeftArrow />
                  </ArrowButton>
                }
                nextArrow={
                  <ArrowButton>
                    <SlickRightArrow />
                  </ArrowButton>
                }
              >
                {loading
                  ? new Array(5).fill(0).map((_, index) => <SkeletonMerchantCard key={index} />)
                  : featuredRestaurant?.map(restaurant => (
                      <CardWrapper>
                        <MerchantCard
                          key={restaurant.id}
                          defaultTag={getDefaultTag(restaurant)}
                          direction="verticalWithFavorite"
                          restaurant={restaurant}
                        />
                      </CardWrapper>
                    ))}
              </StyledFeaturedSlider>
            )}
          </ContentContainer>
        </FeaturedRestaurantsContainer>
      )}
    </>
  );
};

export default FeaturedRestaurantsMobile;
