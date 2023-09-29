import * as React from "react";
import useQuery from "@/commons/hooks/useQuery";
import { GradientText } from "@/components/commons/GradientText/GradientText";
import { routers } from "@/commons/constants/routers";
import { ButtonClose, FilterBar, FilterItem, FilterItemName, FilterLabel, ClearAll } from "./styles";
import { useRouter } from "next/router";

const MarketplaceNearFilterBar: React.FC = () => {
  const router = useRouter();
  const { address } = useQuery<Partial<MerchantsQuery>>();

  return (
    <FilterBar>
      <FilterLabel>Results for nearby store: </FilterLabel>
      <FilterItem>
        <FilterItemName>{address}</FilterItemName>
        <ButtonClose onClick={() => router.push({})} />
      </FilterItem>
      <ClearAll onClick={() => router.push({})}>
        <GradientText> View All </GradientText>
      </ClearAll>
    </FilterBar>
  );
};

export default MarketplaceNearFilterBar;
