import { SelectChangeEvent, Theme } from "@mui/material";
import { SystemProps } from "@mui/system";
import React from "react";
import {
  PageContainer,
  PageInfo,
  PageSizeContainer,
  PageSizeDropdown,
  PageSizeOption,
  PageList,
  TotalItems,
  PageItem,
  NumberOfItems,
} from "./styles";
import useQuery from "@/commons/hooks/useQuery";
import { useRouter } from "next/router";

export const pageSizes = [10, 20, 50];

interface Props extends SystemProps<Theme> {
  page: number;
  perPage: number;
  totalPage: number;
  totalItems: number;
  onChange?: (pageQuery: PageQuery) => void;
  scroll?: boolean;
}

const Pagination = (props: Props) => {
  const router = useRouter();
  const query = useQuery();
  const { page = 1, perPage = pageSizes[0], scroll, totalPage, totalItems, onChange, ...pageProps } = props;

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    onChange?.({ page: 1, perPage: e.target.value as number });
    router.push({ query: { ...query, page: 1, perPage: e.target.value as number } }, undefined, { scroll });
  };

  return (
    <PageContainer {...pageProps}>
      <PageInfo>
        <PageSizeContainer>
          <PageSizeDropdown
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={{
              MenuListProps: { sx: { padding: 0 } },
              disableScrollLock: true,
            }}
            value={perPage}
            onChange={handleChange}
          >
            {pageSizes.map(item => {
              return (
                <PageSizeOption key={item} value={item}>
                  {item}
                </PageSizeOption>
              );
            })}
          </PageSizeDropdown>
          Per page
        </PageSizeContainer>
        <TotalItems>{totalItems} Results</TotalItems>
      </PageInfo>
      <PageList>
        <PageItem
          href={{ query: { ...query, perPage, page: 1 } }}
          onClick={() => !(page === 1) && onChange?.({ perPage, page: 1 })}
          disabled={page === 1 ? 1 : 0}
          scroll={scroll}
        >
          {"<<"}
        </PageItem>
        <PageItem
          href={{ query: { ...query, perPage, page: page - 1 } }}
          onClick={() => !(page === 1) && onChange?.({ perPage, page: page - 1 })}
          disabled={page === 1 ? 1 : 0}
          scroll={scroll}
        >
          {"<"}
        </PageItem>
        <NumberOfItems>
          {perPage * (page - 1) + 1}-{Math.min(perPage * page, totalItems)} of {totalItems}
        </NumberOfItems>
        <PageItem
          href={{ query: { ...query, perPage, page: page + 1 } }}
          onClick={() => !(page === totalPage) && onChange?.({ perPage, page: page + 1 })}
          disabled={page === totalPage ? 1 : 0}
          scroll={scroll}
        >
          {">"}
        </PageItem>
        <PageItem
          href={{ query: { ...query, perPage, page: totalPage } }}
          onClick={() => !(page === totalPage) && onChange?.({ perPage, page: totalPage })}
          disabled={page === totalPage ? 1 : 0}
          scroll={scroll}
        >
          {">>"}
        </PageItem>
      </PageList>
    </PageContainer>
  );
};

export default Pagination;
