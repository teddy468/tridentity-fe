import { CloseCircleIcon, CloseIcon } from "@/assets/icons";
import { MAIN_TAG } from "@/commons/constants/product";
import { ClickAwayListener, Modal } from "@mui/material";
import { useMemo, useState } from "react";
import ProductDescription from "../../ProductDescription/ProductDescription";
import { SmallImages } from "./SmalImages";
import {
  ActiveImage,
  ActiveImageWrapper,
  CampaignTag,
  CloseButton,
  FullScreenContainer,
  FullScreenImage,
  FullScreenImageWrapper,
  Images,
  MainTag,
  MainTagWrapper,
  Overlay,
  ProductDescriptionWrapper,
  ProductImagesWrapper,
  StyledSlider,
  Wrapper,
} from "./styles";

interface ProductImagesProps {
  images: string[];
  description: string;
  main_tags?: (keyof typeof MAIN_TAG)[];
  sub_tag?: string[];
  merchant_store_id: number;
  campaignInfo: CampaignInfo | undefined;
}

export const ProductImages = ({
  images,
  description,
  main_tags,
  sub_tag,
  merchant_store_id,
  campaignInfo,
}: ProductImagesProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeIndexSlide, setActiveIndexSlide] = useState<number>(0);
  const activeImage = useMemo(() => images[activeIndex], [activeIndex, images]);
  const maxFourImages = useMemo(() => images.slice(0, 5), [images]);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const toggleGallery = () => setGalleryVisible(!galleryVisible);

  return (
    <>
      <Wrapper>
        <ActiveImageWrapper>
          <MainTagWrapper>
            {main_tags?.map((value, index) => {
              return <MainTag key={index}>{MAIN_TAG[value]}</MainTag>;
            })}
          </MainTagWrapper>
          {campaignInfo && <CampaignTag>Extra LP</CampaignTag>}
          <ActiveImage src={activeImage} alt={""} width={350} height={350} onClick={toggleGallery} />
        </ActiveImageWrapper>

        <Images>
          {maxFourImages.map((image, index) => (
            <SmallImages
              key={index}
              image={image}
              onMouseEnter={(): void => {
                !(index === 4 && images.length > 5) && setActiveIndex(index);
                setActiveIndexSlide(index);
              }}
              onClick={toggleGallery}
              extra={index === 4 && images.length > 5 ? `+${images.length - 5}` : undefined}
            />
          ))}
        </Images>
        <ProductDescriptionWrapper>
          <ProductDescription description={description} sub_tag={sub_tag || []} merchant_store_id={merchant_store_id} />
        </ProductDescriptionWrapper>
      </Wrapper>
      <Modal
        open={galleryVisible}
        onClose={() => setGalleryVisible(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Overlay>
          <Gallery images={images} />
          <CloseButton onClick={() => setGalleryVisible(false)}>
            <CloseCircleIcon />
          </CloseButton>
        </Overlay>
      </Modal>
    </>
  );
};

const Gallery = ({ images }: { images: string[] }) => {
  const settings = {
    customPaging: function (index: number) {
      return (
        <a href="#">
          <img className="thumb" src={images[index]} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <ProductImagesWrapper>
      <StyledSlider {...settings}>
        {images.map((image, index) => (
          <FullScreenContainer key={index}>
            <FullScreenImageWrapper>
              <FullScreenImage src={image} alt="" />
            </FullScreenImageWrapper>
          </FullScreenContainer>
        ))}
      </StyledSlider>
    </ProductImagesWrapper>
  );
};
