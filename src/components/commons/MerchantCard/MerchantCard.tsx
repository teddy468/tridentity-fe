import { details } from "@/commons/constants/routers";
import { formatDistance } from "@/commons/utils/formatDistance";
import { Skeleton } from "../Skeleton";
import Tag from "../Tag/Tag";
import {
  CardContent,
  CardTitle,
  ImageLink,
  Label,
  MerchantImage,
  RatingNumber,
  RatingsWrapper,
  RatingsFeaturedWrapper,
  ReviewNumber,
  ReviewWrapper,
  SkeletonContainer,
  StyledRating,
  TagWrapper,
  DesktopWrapper,
  RatingFeaturedNumber,
  ReviewFeaturedWrapper,
  FavoriteFeaturedButton,
} from "./styles";
import { HeartRedIcon, HeartGrayIcon, StarIconGreen } from "@/assets/icons";
import { Box, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import useFetch from "@/commons/hooks/useFetch";
import { useEffect, useState } from "react";
import { URL_MERCHANT_FAVORITE, URL_MERCHANT_FAVORITE_LIKE_ACTION } from "@/commons/constants/apiUrl";
import { isPlural } from "@/utils/product";
import { roundingNumber } from "@/utils/formatNumber";

interface SkeletonProps {
  /** 
  @default "horizontal"
  */
  direction?: "horizontal" | "vertical";
}
export const SkeletonMerchantCard: React.FC<SkeletonProps> = ({ direction = "horizontal" }) => {
  return (
    <SkeletonContainer direction={direction}>
      <TagWrapper>
        <Skeleton width={48} height={32} variant="rectangular" style={{ borderRadius: 8 }} />
      </TagWrapper>
      <Skeleton
        width="100%"
        height={direction === "horizontal" ? "100%" : 160}
        variant="rectangular"
        style={{ borderRadius: direction === "horizontal" ? "8px 0px 0px 8px" : "8px 8px 0px 0px" }}
      />
      <Skeleton
        width="100%"
        height={direction === "horizontal" ? "100%" : 187}
        variant="rectangular"
        style={{
          borderRadius: direction === "horizontal" ? "0px 8px 8px 0px" : "0px 0px 8px 8px",
          marginLeft: direction === "horizontal" ? 1 : 0,
          marginTop: direction === "horizontal" ? 0 : 1,
        }}
      />
    </SkeletonContainer>
  );
};
interface Props {
  defaultTag: string;
  /** 
  @default "horizontal"
  */
  direction: Direction;
  restaurant: StoreItem;
  /** 
  @params distance unit is meter;
  */
  distance?: number;
}

const MerchantCard: React.FC<Props> = ({ defaultTag, direction, restaurant, distance }) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [clickAction, setClickAction] = useState<number>(0);
  const [favorite, setFavorite] = useState<boolean>(false);

  const { data: likeResult, refresh: reaction } = useFetch<LikeMerchantAction>(
    userInfo && clickAction ? URL_MERCHANT_FAVORITE_LIKE_ACTION(restaurant.id) : ""
  );

  const { data: likeMerchant } = useFetch<LikeMerchant[]>(userInfo ? URL_MERCHANT_FAVORITE : "");

  useEffect(() => {
    const favorite = likeMerchant?.map(value => value.id).includes(restaurant.id);
    setFavorite(favorite ? favorite : false);
  }, [likeMerchant]);

  useEffect(() => {
    const favorite = likeResult ? likeResult.is_liked : true;
    setFavorite(favorite);
  }, [likeResult]);

  const favoriteClick = () => {
    if (userInfo) {
      setClickAction(clickAction + 1);
      reaction();
    }
  };

  return (
    <DesktopWrapper direction={direction}>
      {defaultTag && (
        <TagWrapper>
          <Tag text={defaultTag} />
        </TagWrapper>
      )}
      <ImageLink href={details.store(restaurant.id)} direction={direction}>
        <MerchantImage src={restaurant.logo} alt={restaurant.name} direction={direction} />
      </ImageLink>
      <CardContent direction={direction}>
        <CardTitle href={details.store(restaurant.id)} direction={direction} color="secondary">
          {restaurant.name}
        </CardTitle>
        {direction === "verticalWithFavorite" ? (
          <>
            <Tooltip title={userInfo ? "Favorites" : "Log in to add to Favorites"}>
              <FavoriteFeaturedButton active={favorite ? "active" : "deactive"} onClick={favoriteClick}>
                {favorite ? <HeartRedIcon /> : <HeartGrayIcon />}
              </FavoriteFeaturedButton>
            </Tooltip>
            <RatingsFeaturedWrapper>
              <RatingFeaturedNumber>{roundingNumber(restaurant.rating)}</RatingFeaturedNumber>
              <Box justifySelf={"center"}>
                <StarIconGreen />
              </Box>
              <ReviewFeaturedWrapper>({isPlural(restaurant.reviews, "review")})</ReviewFeaturedWrapper>
            </RatingsFeaturedWrapper>
          </>
        ) : (
          <>
            <RatingsWrapper>
              <Label>Rating:</Label>
              <StyledRating value={restaurant.rating} readOnly size={direction === "vertical" ? "small" : "medium"} />
              {direction === "horizontal" && <RatingNumber>({roundingNumber(restaurant.rating)})</RatingNumber>}
            </RatingsWrapper>
            <ReviewWrapper>
              <Label>Reviews: </Label>
              <ReviewNumber>{isPlural(restaurant.reviews, "review")}</ReviewNumber>
            </ReviewWrapper>
          </>
        )}
        {typeof distance === "number" && (
          <ReviewWrapper>
            <Label>Distance </Label>
            <ReviewNumber>{formatDistance(distance)}</ReviewNumber>
          </ReviewWrapper>
        )}
      </CardContent>
    </DesktopWrapper>
  );
};

export default MerchantCard;
