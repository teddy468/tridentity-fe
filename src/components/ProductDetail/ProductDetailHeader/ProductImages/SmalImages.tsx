import React from "react";
import { Extra, ImageWrapper, SmallImage } from "./styles";

export interface SmallImageProps {
  image: string;
  onMouseEnter?: () => void;
  onClick?: () => void;
  extra?: string;
}
export const SmallImages: React.FunctionComponent<SmallImageProps> = ({
  image,
  onMouseEnter,
  onClick,
  extra,
}: SmallImageProps) => {
  return (
    <ImageWrapper>
      <SmallImage src={image} alt="" onClick={onClick} onMouseEnter={onMouseEnter} />
      {extra && <Extra>{extra}</Extra>}
    </ImageWrapper>
  );
};
