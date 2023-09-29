import { useEffect, useState } from "react";
import { LatLng, getGeocode } from "use-places-autocomplete";
import useToast from "@/commons/hooks/useToast";
import PlacesAutoComplete from "@/components/Map/PlacesAutoComplete";
import {
  BannerWrapper,
  StyledContainer,
  ContentContainer,
  Image,
  InputWrapper,
  Overlay,
  SearchBtn,
  SearchWrapper,
  Text,
  StyledGpsIcon,
  BannerTitleMobile,
  BannerTitleDesktop,
} from "./styles";
import { useLoadScript } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "@/commons/constants";
import { useRouter } from "next/router";
import { routers } from "@/commons/constants/routers";

type Library = ["places" | "drawing" | "geometry" | "localContext" | "visualization"];

const libraries: Library = ["places"];

const Banner = () => {
  const [address, setAddress] = useState<string>("");
  const [coordinate, setCoordinate] = useState<LatLng | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
    region: "sg",
  });

  const router = useRouter();
  const toast = useToast();

  const showPosition: PositionCallback = async position => {
    const { latitude: lat, longitude: lng } = position.coords;
    try {
      const result = await getGeocode({ location: { lat, lng } });
      const validAddress = result?.find(({ address_components }) =>
        address_components.find(({ short_name, types }) => short_name === "SG" && types.includes("country"))
      );
      if (!validAddress) return toast.error("Not supported outside of Singapore");
      setCoordinate({ lat, lng });
      setAddress(result[0].formatted_address);
    } catch (error) {
      toast.error("Can't get your location");
    }
  };

  const showError: PositionErrorCallback = error => {
    toast.error(error.message);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else toast.error("Geolocation is not supported by this browser");
  };

  const handleSubmit = () => {
    if (!address || !coordinate) return;
    router.push({ pathname: routers.MARKETPLACE, query: { ...coordinate, address } });
  };

  useEffect(() => {
    handleSubmit();
  }, [address, coordinate]);

  if (!isLoaded) return null;

  return (
    <BannerWrapper>
      <Image src="assets/images/banner.jpg" alt="banner" />
      <Overlay>
        <StyledContainer>
          <BannerTitleDesktop>
            <Text>Feeling hungry… Any cravings?</Text>
          </BannerTitleDesktop>
          <BannerTitleMobile>
            <Text>Feeling hungry…</Text>
            <Text>Any cravings?</Text>
          </BannerTitleMobile>
          <ContentContainer>
            <SearchWrapper>
              <InputWrapper>
                <PlacesAutoComplete
                  setSelected={setCoordinate}
                  defaultValue={address ? { label: address, value: address } : undefined}
                  currentLocation={address && coordinate ? address : ""}
                  onChange={option => setAddress(option?.label || "")}
                  placeholder="Enter your address to find local restaurants"
                  popupIcon={false}
                  groupProps={{ sx: { marginBottom: 0, flex: 1, marginRight: "12px" } }}
                  sx={theme => ({
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    width: "100%",
                    "&:focus": {
                      outline: "none",
                    },
                    "& .MuiOutlinedInput-root": {
                      border: "none !important",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: "#000000 !important",
                      "&:placeholder": {
                        color: theme.palette.grey[300],
                      },
                    },
                    "& .MuiAutocomplete-endAdornment": {
                      right: "40px !important",
                    },
                  })}
                />
                <StyledGpsIcon onClick={getUserLocation} title="Your location" />
              </InputWrapper>
            </SearchWrapper>
          </ContentContainer>
        </StyledContainer>
      </Overlay>
    </BannerWrapper>
  );
};
export default Banner;
