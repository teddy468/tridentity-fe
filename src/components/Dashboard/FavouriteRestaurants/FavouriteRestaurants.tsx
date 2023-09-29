import { RightArrowIcon, SlickLeftArrow, SlickRightArrow } from "@/assets/icons";
import MerchantCard, { SkeletonMerchantCard } from "@/components/commons/MerchantCard/MerchantCard";
import { getDefaultTag } from "@/utils/product";
import { useRef, useState } from "react";
import {
  ContentContainer,
  FavouriteRestaurantsContainer,
  Header,
  StyledFavouriteSlider,
  Title,
  ArrowButton,
  CardWrapper,
  ViewAll,
  FavouritedGridItem,
  MobileDisplayWrapper,
} from "./styles";
import Icon from "@/components/commons/Icon/Icon";
import { routers } from "@/commons/constants/routers";
import { isMobile } from "react-device-detect";
import { Box, Grid } from "@mui/material";
import SeeMoreButton from "@/components/commons/SeeMoreButton/SeeMoreButton";

interface IFavoriteRestaurantProps {
  data: StoreItem[];
  loading: boolean;
}

const FavoriteRestaurants = (props: IFavoriteRestaurantProps) => {
  const { data, loading } = props;
  const drag = useRef<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(4);

  const handleSeeMore = () => {
    setIsOpen(!isOpen);
    return !isOpen ? setCount(8) : setCount(4);
  };

  return (
    <FavouriteRestaurantsContainer>
      <ContentContainer>
        <Header>
          <Title>Favourite restaurant</Title>
          <ViewAll href={routers.USER.FAVOURITE} color="gradient">
            <Icon icon={RightArrowIcon} gradient isFill />
          </ViewAll>
        </Header>
        {isMobile ? (
          <MobileDisplayWrapper>
            <Grid container rowSpacing={{ xs: 2, lg: 3 }} columnSpacing={{ xs: 2, lg: 3 }}>
              {data.slice(0, count).map(restaurant => (
                <FavouritedGridItem item key={restaurant.id} xs={6} sm={12 / 5}>
                  <CardWrapper>
                    <MerchantCard
                      key={restaurant.id}
                      defaultTag={getDefaultTag(restaurant)}
                      direction="verticalWithFavorite"
                      restaurant={restaurant}
                    />
                  </CardWrapper>
                </FavouritedGridItem>
              ))}
              {data.length > 4 && (
                <Grid item xs={12}>
                  <Box onClick={handleSeeMore} marginTop={2}>
                    <SeeMoreButton isOpen={isOpen} />
                  </Box>
                </Grid>
              )}
            </Grid>
          </MobileDisplayWrapper>
        ) : (
          <StyledFavouriteSlider
            dots={false}
            infinite={false}
            speed={500}
            slidesToShow={5}
            slidesToScroll={5}
            draggable={true}
            beforeChange={() => (drag.current = true)}
            afterChange={() => (drag.current = false)}
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
              ? new Array(5).fill(0).map((_, index) => <SkeletonMerchantCard direction="vertical" key={index} />)
              : data.map(restaurant => {
                  return (
                    <CardWrapper>
                      <MerchantCard
                        key={restaurant.id}
                        defaultTag={getDefaultTag(restaurant)}
                        direction="verticalWithFavorite"
                        restaurant={restaurant}
                      />
                    </CardWrapper>
                  );
                })}
          </StyledFavouriteSlider>
        )}
      </ContentContainer>
    </FavouriteRestaurantsContainer>
  );
};

export default FavoriteRestaurants;
