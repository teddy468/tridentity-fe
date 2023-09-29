import {
  ContentWrapper,
  DescriptionContent,
  DescriptionLabel,
  DescriptionWrapper,
  SeeMore,
  StoreImg,
  StoreLinkWrapper,
  StoreName,
  StoreNameAndChat,
  SubTag,
  TagWrapper,
} from "./styles";
import React, { useEffect, useState } from "react";
import useFetch from "@/commons/hooks/useFetch";
import { URL_MERCHANT_STORE_DETAIL_2 } from "@/commons/constants/apiUrl";
import { details, routers } from "@/commons/constants/routers";
import { ChatButton } from "@/components/MerchantDetail/MerchantDetailInfo/styles";
import Icon from "@/components/commons/Icon/Icon";
import { MessageIcon } from "@/assets/icons";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/redux/reducer/userReducer";

interface ProductDescriptionProps {
  description: string;
  sub_tag: string[];
  merchant_store_id: number;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
  sub_tag,
  merchant_store_id,
}: ProductDescriptionProps) => {
  const [more, setMore] = useState(true);
  const [displayMore, setDisplayMore] = useState(description && description.length > 150);
  const [text, setText] = useState(description);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);

  const { data } = useFetch<MerchantStore>(URL_MERCHANT_STORE_DETAIL_2(merchant_store_id));

  useEffect(() => {
    if (displayMore) {
      if (more) {
        setText(description.slice(0, 150) + "...");
      } else {
        setText(description);
      }
    }
  }, [more]);

  const handleChat = () => {
    dispatch(userActions.setonStoreChat(data?.id ? data.id : 0));
  };

  return (
    <DescriptionWrapper>
      <DescriptionLabel>Description</DescriptionLabel>
      <ContentWrapper>
        <DescriptionContent>
          {text} {displayMore && <SeeMore onClick={() => setMore(!more)}>{more ? "See more" : "See less"}</SeeMore>}
        </DescriptionContent>
      </ContentWrapper>

      {sub_tag && sub_tag.length > 0 && (
        <TagWrapper>
          <DescriptionLabel sx={{ marginRight: "12px" }}>Product tag</DescriptionLabel>
          {sub_tag.map((value, index) => {
            return <SubTag key={index}>{value}</SubTag>;
          })}
        </TagWrapper>
      )}

      {data && (
        <StoreLinkWrapper>
          <StoreImg src={data.logo} alt={"Store"} />
          <StoreNameAndChat>
            <StoreName href={details.store2(data.id)}>{data.name}</StoreName>

            {/* <Tooltip title={userInfo ? "Message Store" : "Log in to message Store"}>
            <ChatButton onClick={handleChat}>
              <Icon icon={MessageIcon} isFill gradient width={32} height={32} />
            </ChatButton>
          </Tooltip> */}
          </StoreNameAndChat>
        </StoreLinkWrapper>
      )}
    </DescriptionWrapper>
  );
};

export default ProductDescription;
