import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import BigNumber from "bignumber.js";
import { userActions } from "@/redux/reducer/userReducer";
import { useBep20Contract } from "./useBep20Contract";
import { useAppSelector } from "@/redux/store";
import { getIsAuth } from "@/redux/selectors/auth";

export const useGetBalanceBep20 = (
  addressToken: string,
  isPreventFirstCall = false
) => {
  const isAuth = useAppSelector(getIsAuth);
  const dispatch = useDispatch();

  const account = useSelector((state: any) => state.currentAccount);
  const sc = useBep20Contract(addressToken);

  const getBalance = async () => {
    if (!isAuth || !addressToken || isPreventFirstCall) return;
    const balanceToken: BigNumber = await sc.balanceOf(account);
    const balance = balanceToken.toString();

    dispatch(userActions.setUserBalance(balance));
  };

  useEffect(() => {
    getBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, addressToken, isAuth]);

  return [getBalance];
};
