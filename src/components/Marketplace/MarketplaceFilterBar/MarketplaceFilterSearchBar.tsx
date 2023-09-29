import * as React from "react";
import { useEffect, useState } from "react";
import { ButtonClose, ClearAll, FilterBar, FilterItem, FilterItemName, FilterLabel } from "./styles";
import { useRouter } from "next/router";
import useQuery from "@/commons/hooks/useQuery";


interface Props {
  label: string;
  viewAll: () => void;
  isViewAll: boolean;
  quitViewAll: () => void;
}

const MarketplaceFilterSearchBar: React.FC<Props> = ({ label, viewAll, isViewAll, quitViewAll }: Props) => {
  const router = useRouter();
  const query = useQuery<Partial<MerchantsQuery>>();
  const [searchKey, setSearchKey] = useState<string>("");

  const clearAll = () => {
    const newQuery = { ...query };
    delete newQuery.keyword;
    router.push({ query: newQuery });
  };

  const handleDelete = () => {
    clearAll();
  };

  useEffect(() => {
    const { keyword } = query;
    setSearchKey(keyword ? keyword : "");
  }, [query]);

  return (
    <FilterBar selected={searchKey ? 1 : 0}>
      {searchKey && <><FilterLabel>{label ? label : "Filter by"}</FilterLabel>
        <FilterItem key={searchKey}>
          <FilterItemName>{searchKey}</FilterItemName>
          <ButtonClose onClick={() => handleDelete()} />
        </FilterItem></>
      }
      {searchKey && !isViewAll && <ClearAll onClick={() => viewAll()}> View All</ClearAll>}
      {searchKey && isViewAll && <ClearAll onClick={() => quitViewAll()}> Back</ClearAll>}
    </FilterBar>
  );
};

export default MarketplaceFilterSearchBar;
