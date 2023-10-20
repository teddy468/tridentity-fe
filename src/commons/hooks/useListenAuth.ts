import { useRouter } from "next/router";
import { URL_ACTIVATE_ACCOUNT } from "../constants/apiUrl";
import useAuth from "./useAuth";
import { useEffect, useMemo } from "react";

const useListenAuth = () => {
  const router = useRouter();
  const { activateAccount } = useAuth();

  const token = useMemo(() => {
    if (router.asPath && router.asPath.includes(URL_ACTIVATE_ACCOUNT)) {
      const pathnameSplit = router.asPath.split("/");
      const query = pathnameSplit[2].split("?");
      const tokenSplit = query[1].split("=");

      if (tokenSplit[1]) return tokenSplit[1];
      return;
    }
  }, [router]);

  const activate = async (tokenAuth: string) => {
    try {
      const res = await activateAccount(tokenAuth);
    } catch (error) {}
  };

  useEffect(() => {
    token && activate(token);
  }, [token]);
};

export default useListenAuth;
