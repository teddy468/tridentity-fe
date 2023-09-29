import { FavouriteFillIcon, FavouriteOutlineIcon } from "@/assets/icons";
import { GOOGLE_MAPS_API_KEY } from "@/commons/constants";
import { URL_MERCHANT_FAVORITE, URL_MERCHANT_FAVORITE_LIKE_ACTION } from "@/commons/constants/apiUrl";
import useFetch from "@/commons/hooks/useFetch";
// import Map from "@/components/Map/Map";
import { roundingNumber } from "@/utils/formatNumber";
import { isPlural } from "@/utils/product";
import { Tooltip, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ActionGroup,
  DefaultMerchantLogo,
  DetailItemTitle,
  DetailItemValue,
  DetailList,
  FavoriteButton,
  MerchantHeader,
  MerchantInfo,
  MerchantInfoContainer,
  MerchantLocation,
  MerchantLocationItem,
  MerchantLocationTitle,
  MerchantLogo,
  MerchantLogoSection,
  MerchantLogoWrapper,
  MerchantName,
  MerchantRating,
  MerchantReviewCount,
  ServiceAndTimeWrapper,
  StyledMapIcon,
  StyledRating,
} from "./styles";
import dayjs from "dayjs";

type Props = {
  merchantStore: StoreDetail;
};
const MerchantStoreDetailInfo = ({ merchantStore }: Props) => {
  const [favorite, setFavorite] = useState<boolean>(false);
  const [clickAction, setClickAction] = useState<number>(0);

  const { userInfo } = useSelector((state: RootState) => state.user);

  const { data: likeMerchant } = useFetch<LikeMerchant[]>(userInfo ? URL_MERCHANT_FAVORITE : "");
  const { data: likeResult, refresh: reaction } = useFetch<LikeMerchantAction>(
    userInfo && clickAction ? URL_MERCHANT_FAVORITE_LIKE_ACTION(merchantStore.id) : ""
  );

  useEffect(() => {
    const favorite = likeMerchant?.map(value => value.id).includes(merchantStore.id);
    setFavorite(favorite ? favorite : false);
  }, [likeMerchant]);

  useEffect(() => {
    const favorite = likeResult ? likeResult.is_liked : true;
    setFavorite(favorite);
  }, [likeResult]);

  useEffect(() => {
    if (!userInfo) {
      setClickAction(0);
      setFavorite(false);
    }
  }, [userInfo]);

  const favoriteClick = () => {
    if (userInfo) {
      setClickAction(clickAction + 1);
      reaction();
    }
  };

  const renderOpeningHours = (): string => {
    const date = dayjs();
    if (merchantStore.isOpen24Hours) {
      return "All day";
    } else {
      const now: string = date.format("ddd") || "Mon";
      const opening = merchantStore[`openingHours${now}`];
      const closing = merchantStore[`closingHours${now}`];
      if (!opening || !closing) {
        return "-";
      }
      return `${opening} - ${closing}`;
    }
  };

  // const handleChat = () => {
  //   dispatch(userActions.setonStoreChat(merchantStore.id));‰
  // };

  const { isLoaded } = useLoadScript({ googleMapsApiKey: GOOGLE_MAPS_API_KEY, libraries: ["places"] });

  const address = merchantStore.addresses[0];

  return (
    <MerchantInfoContainer>
      <MerchantLogoSection>
        <MerchantLogoWrapper>
          {merchantStore.logo ? <MerchantLogo src={merchantStore.logo} /> : <DefaultMerchantLogo />}
        </MerchantLogoWrapper>
        <ActionGroup>
          {/* Disable chat */}
          {/* <Tooltip title={userInfo ? "Message Store" : "Log in to message Store"}>
              <ChatButton onClick={handleChat}>
              <Icon icon={MessageIcon} isFill gradient width={32} height={32} />
              </ChatButton>
            </Tooltip> */}
          <Tooltip title={userInfo ? "Favorites" : "Log in to add to Favorites"}>
            <FavoriteButton onClick={favoriteClick}>
              {favorite ? <FavouriteOutlineIcon /> : <FavouriteFillIcon />}
            </FavoriteButton>
          </Tooltip>
        </ActionGroup>
      </MerchantLogoSection>
      <MerchantInfo>
        <MerchantHeader>
          <MerchantName>{merchantStore.name}</MerchantName>
        </MerchantHeader>
        <MerchantRating>
          <StyledRating value={roundingNumber(merchantStore.rating) || 0} readOnly starSize={16} />
          <MerchantReviewCount>{isPlural(merchantStore.reviews, "review")}</MerchantReviewCount>
        </MerchantRating>
        <Grid2 container>
          <Grid2 xs={12} md={6}>
            <ServiceAndTimeWrapper>
              <DetailList>
                <DetailItemTitle>Opening hours</DetailItemTitle>
                <DetailItemValue>{renderOpeningHours()}</DetailItemValue>
              </DetailList>
              <DetailList>
                <DetailItemTitle>Service support</DetailItemTitle>
                <DetailItemValue>{merchantStore?.service_supports?.join(", ")}</DetailItemValue>
              </DetailList>
            </ServiceAndTimeWrapper>
          </Grid2>
          <Grid2 xs={12}>
            <DetailList>
              <DetailItemTitle>Description</DetailItemTitle>
              <Typography fontSize={16} fontWeight={400}>
                {merchantStore?.description}
              </Typography>
            </DetailList>
          </Grid2>
          {/* <Grid2 xs={12} md={4}>
            <MerchantLocation>
              <MerchantLocationTitle>Address</MerchantLocationTitle>
              <MerchantLocationItem>
                <StyledMapIcon />
                {address?.address || "No Address"}
              </MerchantLocationItem>
            </MerchantLocation>
          </Grid2> */}
          {/* <Grid2 xs={12} md={4}>
            {isLoaded && (
              <Map
                mapContainerStyle={{ height: 170, borderRadius: 8 }}
                selected={
                  address?.coordinate && { lat: Number(address.coordinate.lat), lng: Number(address.coordinate.lng) }
                }
              />
            )}
          </Grid2> */}
        </Grid2>
      </MerchantInfo>
    </MerchantInfoContainer>
  );
};

export default MerchantStoreDetailInfo;
