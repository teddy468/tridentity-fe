import { EmptyStarIcon, StarIcon } from "@/assets/icons";
import { Rating, RatingProps, styled } from "@mui/material";
import CustomIcon from "../CustomIcon/CustomIcon";
import React from "react";

const StyledRating = styled(Rating)(({ theme }) => ({
  color: theme.palette.secondaryColor[900],
  ".MuiRating-decimal": {
    padding: "0px",
  },
  "& .MuiRating-icon": {
    margin: "0 2px",
  },
  "& .MuiRating-iconEmpty": {
    color: theme.palette.text.disabled,
  },
}));

interface Props extends RatingProps {
  starSize?: number;
}

const CustomRating2: React.FC<Props> = React.forwardRef(({ size, starSize, ...props }, ref) => {
  starSize = starSize || (size === "large" ? 32 : size === "small" ? 16 : 24);
  return (
    <StyledRating
      ref={ref}
      precision={0.5}
      icon={<CustomIcon icon={StarIcon} width={starSize} height={starSize} fill="currentColor" stroke="currentColor" />}
      emptyIcon={<CustomIcon icon={EmptyStarIcon} width={starSize} height={starSize} stroke="currentColor" />}
      {...props}
    />
  );
});

export default CustomRating2;
