import * as React from "react";
import {
  SubCategorySelect,
  SubCategoryOption,
  SubFilterGroup,
  SubCategoryPlaceHolder,
  FilterGroupTitle,
} from "./styles";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { Collapse } from "@mui/material";
import useFetch from "@/commons/hooks/useFetch";
import { URL_COUNT_SUB_CATEGORIES } from "@/commons/constants/apiUrl";

interface Props {
  parentId: number | null;
  handleSelect: (category: number | null) => void;
  title?: React.ReactNode;
}
const SubCategoryFilter: React.FC<Props> = ({ parentId, handleSelect, title }) => {
  const [selected, setSelected] = React.useState<number | null>(null);
  const { data } = useFetch<Category[]>(parentId ? URL_COUNT_SUB_CATEGORIES(parentId) : "");

  const handleChange: SelectInputProps<unknown>["onChange"] = e => {
    setSelected(Number(e.target.value));
    handleSelect(Number(e.target.value));
  };

  const SubContainer = title ? SubFilterGroup : React.Fragment;

  return (
    <SubContainer>
      <Collapse in={!!data?.length} timeout="auto" unmountOnExit>
        {title && <FilterGroupTitle>{title}</FilterGroupTitle>}
        <SubCategorySelect
          value={selected || ""}
          onChange={handleChange}
          displayEmpty
          renderValue={selected => {
            if (selected === "") return <SubCategoryPlaceHolder>Select sub category</SubCategoryPlaceHolder>;
            return data?.find(item => item.id === Number(selected))?.name;
          }}
        >
          <SubCategoryOption value="">
            <SubCategoryPlaceHolder>Select sub category</SubCategoryPlaceHolder>
          </SubCategoryOption>
          {data?.map(item => {
            return (
              <SubCategoryOption value={item.id} key={item.id}>
                {item.name}
              </SubCategoryOption>
            );
          })}
        </SubCategorySelect>
      </Collapse>
      {!!selected && <SubCategoryFilter parentId={selected} handleSelect={handleSelect} />}
    </SubContainer>
  );
};

export default SubCategoryFilter;
