import { RatingItemWrapper, ItemInfoWrapper, ItemImage, ItemInfo, ItemName } from "./styles";
import CustomRating from "@/components/commons/CustomRating/CustomRating";
import { useState } from "react";

interface RatingItemProps {
  name: string;
  image: string;
  info?: React.ReactNode;
  onRate: (rate: number|null) => void;
  disable: boolean;
  defaultValue: number;
}
const RatingItem = ({ name, image, info, onRate, disable, defaultValue}: RatingItemProps) => {
  const [value, setValue] = useState(defaultValue? defaultValue : 0)

  const onChange = (newValue: number) => {
    setValue(newValue);
    onRate(newValue)
  }
  return (
    <RatingItemWrapper>
      <ItemInfoWrapper>
        <ItemImage src={image} />
        <ItemInfo>
          <ItemName>{name}</ItemName>
          {info}
        </ItemInfo>
      </ItemInfoWrapper>
      <CustomRating disabled={disable} onChange={(event, value) => onChange(value ? value : 0)} value={value}/>
    </RatingItemWrapper>
  );
};

export default RatingItem;
