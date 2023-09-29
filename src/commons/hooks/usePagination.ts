import { useMemo } from "react";
import useQuery from "./useQuery";

const usePagination = (initialValues: Partial<PageQuery> = { page: 1, perPage: 10 }): PageQuery => {
  const { page, perPage } = useQuery<PageQuery>(initialValues);
  const query = useMemo(() => {
    return {
      page: Math.abs(Number(page) || 1),
      perPage: Math.abs(Number(perPage) || 10),
    };
  }, [page, perPage]);
  return query;
};

export default usePagination;
