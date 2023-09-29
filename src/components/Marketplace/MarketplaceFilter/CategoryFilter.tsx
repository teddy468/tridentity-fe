import { FilterIcon } from "@/assets/icons";
import useQuery from "@/commons/hooks/useQuery";
import { getQueryString } from "@/commons/utils/getQueryString";
import CustomCheckbox from "@/components/commons/CustomCheckbox/CustomCheckbox";
import Icon from "@/components/commons/Icon/Icon";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse } from "@mui/material";
import { cloneDeep, difference } from "lodash";
import { useRouter } from "next/router";
import * as React from "react";
import { useSelector } from "react-redux";
import {
  Categories,
  CategoryLabel,
  CategoryName,
  CategoryOption,
  CategoryWrapper,
  FilterBtn,
  FilterGroup,
  FilterGroupTitle,
  Header,
  StyledCloseIcon,
  StyledDrawer,
  StyledFilterGroup
} from "./styles";

interface Props {
  handleSelect: (category: number) => void;
  selectedCategories: Array<number>;
}

const CategoryFilter: React.FC<Props> = ({ handleSelect, selectedCategories }) => {
  const { categories } = useSelector(({ system }: RootState) => system);
  const query = useQuery<Partial<MerchantsQuery>>();
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let isChoose;
    setOpenDrawer(false);
    const id = event.target.value;
    handleSelect(Number(id));
    const newQuery = { ...query };
    let ids = cloneDeep(selectedCategories);
    if (selectedCategories.includes(Number(id))) {
      ids = selectedCategories.filter(item => item !== Number(id));
      isChoose = false;
    } else {
      ids = [...selectedCategories, Number(id)];
      isChoose = true;
    }

    const current = categories.find(item => item.id === Number(id));
    const children = (current?.children.map(item => item.id) as number[]) || [];

    if (children.length > 0) {
      // Case 1 pick 1 cate and sub cate
      // Case 2 unpick cate then auto unpick sub cate
      if (isChoose) {
        ids = [...children, ...ids];
      } else {
        ids = difference(ids, [...children]);
      }
    }

    // Case ids = []
    if (ids.length === 0) {
      delete newQuery.category_ids;
      router.push({ query: getQueryString({ ...newQuery }) });
      return;
    }

    newQuery.category_ids = ids.join(",");
    router.push({ query: getQueryString({ ...newQuery }) });
  };

  const renderSubChild = (isShowSubChild: boolean, subItem: CategoryTree) => {
    return (
      <>
        {isShowSubChild &&
          subItem.children?.map((subChild: CategoryTree) => (
            <CategoryOption key={subChild.id} style={{ marginLeft: 40 }}>
              <CustomCheckbox
                checked={selectedCategories.includes(subChild.id)}
                value={subChild.id}
                key={subChild.id}
                onChange={handleChange}
              />
              <CategoryLabel>
                <CategoryName>{subChild.name}</CategoryName>
              </CategoryLabel>
            </CategoryOption>
          ))}
      </>
    );
  };

  const renderChild = (isShowChildren: boolean, item: CategoryTree) => {
    return (
      <>
        {isShowChildren &&
          item.children?.map((child: CategoryTree) => {
            const isShowSubChild = selectedCategories.length > 0 && selectedCategories.includes(child.id);
            return (
              <>
                <CategoryOption key={child.id} style={{ marginLeft: 20 }}>
                  <CustomCheckbox
                    checked={selectedCategories.includes(child.id)}
                    value={child.id}
                    key={child.id}
                    onChange={handleChange}
                  />
                  <CategoryLabel>
                    <CategoryName>{child.name}</CategoryName>
                  </CategoryLabel>
                </CategoryOption>
                {renderSubChild(isShowSubChild, child)}
              </>
            );
          })}
      </>
    );
  };

  const renderData = () => {
    return (
      <>
        <Categories>
          {categories.map((item: CategoryTree) => {
            const isShowChildren = selectedCategories.length > 0 && selectedCategories.includes(item.id);
            return (
              <>
                <CategoryOption key={item.id}>
                  <CustomCheckbox
                    checked={selectedCategories.includes(item.id)}
                    value={item.id}
                    key={item.id}
                    onChange={handleChange}
                  />
                  <CategoryLabel>
                    <CategoryName>{item.name}</CategoryName>
                  </CategoryLabel>
                </CategoryOption>
                {renderChild(isShowChildren, item)}
              </>
            );
          })}
        </Categories>
      </>
    );
  };

  const renderListCategories = () => {
    return (
      <>
        <FilterGroupTitle
          style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}
          onClick={handleClick}
        >
          Categories
          {open ? <ExpandLess style={{ color: "#C3C3C3" }} /> : <ExpandMore style={{ color: "#C3C3C3" }} />}
        </FilterGroupTitle>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <>{renderData()}</>
        </Collapse>
      </>
    );
  };
  return (
    <>
      <FilterBtn onClick={() => setOpenDrawer(true)} active={selectedCategories.length}>
        <Icon icon={FilterIcon} isFill={true} originWidth={24} originHeight={24} width={22} height={22} />
      </FilterBtn>
      <StyledDrawer
        PaperProps={{
          sx: {
            width: "100%",
            overflow: "hidden",
            background: "linear-gradient(324deg, #0B0B0B 38.44%, #161A18 85.8%)",
          },
        }}
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box>
          <Header>
            Filter
            <StyledCloseIcon onClick={() => setOpenDrawer(false)} />
          </Header>
          <CategoryWrapper>
            <FilterGroup>{renderListCategories()}</FilterGroup>
          </CategoryWrapper>
        </Box>
      </StyledDrawer>
      <StyledFilterGroup>{renderListCategories()}</StyledFilterGroup>
    </>
  );
};

export default CategoryFilter;
