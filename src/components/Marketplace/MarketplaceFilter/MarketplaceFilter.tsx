import * as React from "react";
import { useEffect, useState } from "react";
import MarketplaceCategory from "./CategoryFilter";
import { FilterContainer } from "./styles";
import useQuery from "@/commons/hooks/useQuery";

interface Props {}
const MarketplaceFilter: React.FC<Props> = () => {
  const [categoriesSelected, setCategoriesSelected] = useState<Array<number>>([]);
  const query = useQuery<MerchantsQuery>();

  const handleSelect = (categoryId: number) => {
    if (categoriesSelected.includes(categoryId)) {
      setCategoriesSelected(categoriesSelected.filter(item => item !== categoryId));
    } else {
      setCategoriesSelected([...categoriesSelected, categoryId]);
    }
  };

  useEffect(() => {
    if (query.category_ids && typeof query.category_ids === "string") {
      setCategoriesSelected(query.category_ids.split(",").map(item => Number(item)));
    } else {
      setCategoriesSelected([]);
    }
  }, [query]);
  return (
    <FilterContainer>
      <MarketplaceCategory handleSelect={handleSelect} selectedCategories={categoriesSelected} />
    </FilterContainer>
  );
};

export default MarketplaceFilter;
