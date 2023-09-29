import { useRouter } from "next/router";
import { useMemo } from "react";

const useQuery = <T extends Query>(initialValues: Partial<T> = {}): T => {
  const router = useRouter();
  const { query } = router;
  const params = useMemo(() => ({ ...initialValues, ...(query as T) }), [query]);
  return params;
};

export default useQuery;
