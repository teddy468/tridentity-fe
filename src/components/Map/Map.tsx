import { GoogleMap, GoogleMapProps, Marker } from "@react-google-maps/api";
import React from "react";
import { LatLng } from "use-places-autocomplete";

interface Props extends GoogleMapProps {
  selected?: LatLng | undefined;
}

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: 400,
};

const center = { lat: 10.771595, lng: 106.7013516 };

const mapOptions = {};

const Map = ({ selected, mapContainerStyle }: Props) => {
  return (
    <GoogleMap
      options={{
        disableDoubleClickZoom: true,
        scrollwheel: false,
        zoomControl: false,
        scaleControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 16,
        center: selected || center,
        disableDefaultUI: true,
        draggable: false,
        clickableIcons: false,
      }}
      mapContainerStyle={{ ...containerStyle, ...mapContainerStyle }}
    >
      {selected && <Marker position={selected} />}
    </GoogleMap>
  );
};

export default Map;
