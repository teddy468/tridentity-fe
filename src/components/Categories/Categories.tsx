import { details } from "@/commons/constants/routers";
import useFetch from "@/commons/hooks/useFetch";
import NotFoundData from "../commons/NotFoundData/NotFoundData";
import {
  CategoriesContainer,
  CategoriesGrid,
  CategoriesGridItem,
  CategoriesWrapper,
  Category,
  CategoryInfo,
  CategorySkeleton,
  Description,
  Name,
  Overlay,
  Title,
} from "./styles";
import { URL_ALL_CATEGORIES } from "@/commons/constants/apiUrl";
import { useSelector } from "react-redux";

const Categories = () => {
  const { categories } = useSelector(({ system }: RootState) => system);

  const handleSubCategories = (cate: CategoryTree[]) => {
    if (cate && cate.length > 0) {
      return cate.map(item => item.id);
    }
    return [];
  };

  const renderCategories = () => {
    if (categories && categories.length > 0) {
      return categories.map((category: CategoryTree, index: number) => (
        <CategoriesGridItem spacing={2} xs={6} md={4} key={category.id}>
          <Category href={details.marketplace(handleSubCategories(category.children), category.id)}>
            <img src={category.image} alt={category.name} />
            <CategoryInfo>
              <Overlay>
                <Name>{category.name}</Name>
                <Description>{category.description}</Description>
              </Overlay>
            </CategoryInfo>
          </Category>
        </CategoriesGridItem>
      ));
    }
    return <NotFoundData text="category" />;
  };

  return (
    <CategoriesWrapper>
      <CategoriesContainer>
        <Title>All categories</Title>
        <CategoriesGrid container spacing={2}>
          {!categories
            ? new Array(9).fill(0).map((_, index) => (
                <CategoriesGridItem spacing={2} xs={6} md={4} key={index}>
                  <CategorySkeleton />
                </CategoriesGridItem>
              ))
            : renderCategories()}
        </CategoriesGrid>
      </CategoriesContainer>
    </CategoriesWrapper>
  );
};

export default Categories;
