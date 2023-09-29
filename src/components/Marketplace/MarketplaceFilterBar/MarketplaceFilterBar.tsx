import useQuery from "@/commons/hooks/useQuery";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ButtonClose, ClearAll, FilterBar, FilterItem, FilterItemName, FilterLabel } from "./styles";

const MarketplaceFilterBar: React.FC = () => {
  const router = useRouter();
  const query = useQuery<Partial<MerchantsQuery>>();
  const { categories } = useSelector(({ system }: RootState) => system);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const clearAll = () => {
    const newQuery = { ...query };
    delete newQuery.category_ids;
    router.push({ query: newQuery });
  };
  const handleDelete = (categoryId: number) => {
    const { address, lat, lng, ...newQuery } = query;
    if (newQuery.category_ids) {
      const categoryIds = newQuery.category_ids.split(",");
      if (categoryIds.length > 1) {
        newQuery.category_ids = categoryIds.filter(item => item !== categoryId + "").join(",");
      } else {
        delete newQuery.category_ids;
      }
    }
    router.push({ query: newQuery });
  };

  useEffect(() => {
    const { category_ids } = query;

    if (!category_ids) return;

    const categoryIds = category_ids?.split(",");

    const selectedCategories: Array<Category> = [];

    categories?.forEach(item => {
      if (categoryIds && categoryIds?.includes(item.id + "")) {
        selectedCategories.push(item);
      }
      item.children?.forEach(child => {
        if (categoryIds && categoryIds?.includes(child.id + "")) {
          selectedCategories.push(child);
        }
      });
    });

    setSelectedCategories(selectedCategories);
  }, [query]);

  return (
    <FilterBar selected={selectedCategories.length}>
      {(selectedCategories.length > 0 || query.address) && <FilterLabel>Filter by</FilterLabel>}
      {selectedCategories.map(category => (
        <FilterItem key={category.id}>
          <FilterItemName>{category.name}</FilterItemName>
          <ButtonClose onClick={() => handleDelete(category.id)} />
        </FilterItem>
      ))}
      {selectedCategories.length > 0 && <ClearAll onClick={clearAll}> Clear all</ClearAll>}
    </FilterBar>
  );
};

export default MarketplaceFilterBar;
