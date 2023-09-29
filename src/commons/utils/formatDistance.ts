export const formatDistance = (value: number) => {
  if (value >= 1000) {
    return (value / 1000.0).toFixed(1) + " km";
  } else if (value >= 100) {
    return Math.round(value) + " m";
  } else {
    return value.toFixed(1) + " m";
  }
};
