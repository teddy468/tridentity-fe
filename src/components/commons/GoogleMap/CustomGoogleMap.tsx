import React from "react";
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps";

interface MapProps {
  lat: number;
  lng: number;
}
const CustomGoogleMap = ({ lat, lng, ...props }: MapProps) => {
  return <GoogleMap {...props} defaultZoom={8} defaultCenter={{ lat, lng }}></GoogleMap>;
};

export default withScriptjs(withGoogleMap(CustomGoogleMap));
