import { useCallback, useRef } from "react";

const useDebounce = (fnc: (...args: any[]) => void, delay?: number): typeof fnc => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounce = useCallback<typeof fnc>(
    (...args) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => fnc(...args), delay || 500);
      return () => {
        if (timeout.current) clearTimeout(timeout.current);
      };
    },
    [delay]
  );
  return debounce;
};

export default useDebounce;
