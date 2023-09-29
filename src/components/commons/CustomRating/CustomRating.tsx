import { EmptyStarIcon, StarIcon } from "@/assets/icons";
import { Rating, RatingProps, styled } from "@mui/material";

const StyledRating = styled(Rating)(({ theme }) => ({
  color: theme.palette.primaryColor[900],
  ".MuiRating-decimal": {
    padding: "0px"
  },
  paddingRight: "10px",
  '& .MuiRating-icon': {
    margin: '0 2px'
  },
}));

const CustomRating: React.FC<RatingProps> = props => {
  return (
    <StyledRating
      precision={0.5}
      icon={<StarIcon fontSize="inherit" />}
      emptyIcon={<EmptyStarIcon fontSize="inherit" />}
      {...props}
    />
  );
};

export default CustomRating;
