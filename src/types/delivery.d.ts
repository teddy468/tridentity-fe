declare type PickupMethodType = "delivery" | "pickup";

declare interface ShippingFeeLalamoveBody {
  locations: {
    coordinate: {
      lat: string;
      lng: string;
    };
    address: string;
  }[];
}

declare interface ShippingFeeLalamoveResponse {
  scheduleAt: string;
  expiresAt: string;
  serviceType: string;
  language: string;
  stops: {
    coordinates: {
      lat: string;
      lng: string;
    };
    address: string;
    id: string;
  }[];
  isRouteOptimized: boolean;
  priceBreakdown: {
    base: string;
    extraMileage: string;
    totalBeforeOptimization: string;
    totalExcludePriorityFee: string;
    total: string;
    currency: string;
  };
  distance: {
    value: string;
    unit: string;
  };
  id: string;
}
declare interface Coordinate {
  lat: string;
  lng: string;
}
declare interface ShippingLocationGrab {
  coordinate: Coordinate;
  address: string;
}

declare interface ShippingFeeGrabBody {
  time: Date;
  locations: ShippingLocationGrab[];
}

declare interface ShippingFeeResponseGrab {
  distance: number;
  price: number;
}

declare interface ShippingFeeError {
  error: {
    message: string;
    errorCode: string;
    statusCode: number;
    error: string;
  };
  timestamp: string;
  statusCode: number;
}
