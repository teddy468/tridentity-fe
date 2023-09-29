import { RatingItemWrapper, ItemInfoWrapper, ItemImage, ItemInfo, ItemName } from "./styles";
import CustomRating from "@/components/commons/CustomRating/CustomRating";

interface OrderInfoProps {
  name: string;
  image: string;
  info?: React.ReactNode;
}
const OrderInfo = ({ name, image, info }: OrderInfoProps) => {
  return (
    <RatingItemWrapper>
      <ItemInfoWrapper>
        <ItemImage src={image} />
        <ItemInfo>
          <ItemName>{name}</ItemName>
          {info}
        </ItemInfo>
      </ItemInfoWrapper>
    </RatingItemWrapper>
  );
};

export default OrderInfo;
