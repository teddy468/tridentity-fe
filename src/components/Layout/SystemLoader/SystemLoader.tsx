import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMembershipAvatarsAsync,
  getUserLoyaltyPointAsync,
  getUserMembershipsAsync,
  loginLocalAsync,
} from "@/redux/saga/userSagas";

const SystemLoader = () => {
  const { userInfo } = useSelector(({ user }: RootState) => user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginLocalAsync({ payload: null }));
    dispatch(getMembershipAvatarsAsync({ payload: null }));
  }, []);

  useEffect(() => {
    if (userInfo?.id) dispatch(getUserLoyaltyPointAsync({ payload: null }));
    if (userInfo?.id) dispatch(getUserMembershipsAsync({ payload: null }));
  }, [userInfo?.id]);

  return null;
};

export default SystemLoader;
