import { isPlural } from "@/utils/product";
import Tag from "../Tag/Tag";
import {
  CardContent,
  CardImage,
  CardImageSkeleton,
  CardTitle,
  CardTitleSkeleton,
  Label,
  RatingNumber,
  RatingsWrapper,
  ReviewNumber,
  ReviewWrapper,
  StyledRating,
  TagSkeleton,
  TagWrapper,
  Wrapper,
} from "./styles";
import { details } from "@/commons/constants/routers";
import Link from "next/link";

export type CardDirection = "horizontal" | "vertical";
interface GeneralCardProps {
  defaultTag: string;
  direction?: CardDirection;
  restaurant: StoreItem;
}

export const GeneralCardSkeleton: React.FC<{ direction: CardDirection }> = ({
  direction = "horizontal",
}: {
  direction: CardDirection;
}) => {
  return (
    <Wrapper direction={direction}>
      <TagWrapper>
        <TagSkeleton />
      </TagWrapper>
      <CardImageSkeleton direction={direction} />
      <CardContent direction={direction}>
        <CardTitleSkeleton />
        <div>
          <RatingsWrapper>
            <CardTitleSkeleton />
          </RatingsWrapper>
          <ReviewWrapper>
            <CardTitleSkeleton />
          </ReviewWrapper>
        </div>
      </CardContent>
    </Wrapper>
  );
};

const GeneralCard: React.FC<GeneralCardProps> = ({
  defaultTag,
  direction = "horizontal",
  restaurant,
}: GeneralCardProps) => {
  return (
    <Wrapper direction={direction}>
      <TagWrapper>
        <Tag text={restaurant.tag || defaultTag} />
      </TagWrapper>
      <Link href={details.store(restaurant.id)}>
        <CardImage direction={direction} alt={restaurant.name} src={restaurant.logo} />
      </Link>
      <CardContent direction={direction}>
        <CardTitle href={details.store(restaurant.id)} direction={direction}>
          {restaurant.name}
        </CardTitle>
        <div>
          <RatingsWrapper>
            <Label>Rating:</Label>
            <StyledRating value={restaurant.rating} readOnly size={direction === "vertical" ? "small" : "medium"} />
            {direction === "horizontal" && <RatingNumber>({restaurant.rating || 0})</RatingNumber>}
          </RatingsWrapper>
          <ReviewWrapper>
            <Label>Reviews: </Label>
            <ReviewNumber>
              {isPlural(restaurant.reviews, 'review')}
            </ReviewNumber>
          </ReviewWrapper>
        </div>
      </CardContent>
    </Wrapper>
  );
};

export default GeneralCard;
