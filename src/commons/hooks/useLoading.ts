import { systemActions } from "@/redux/reducer/systemReducer";
import { useDispatch } from "react-redux";

type Loading = () => void;

interface ReturnType {
  show: Loading;
  hide: Loading;
}

const useLoading = (): ReturnType => {
  const dispatch = useDispatch();
  const showLoading =
    (loading: boolean): Loading =>
    () => {
      dispatch(systemActions.setLoading(loading));
    };

  return {
    show: showLoading(true),
    hide: showLoading(false),
  };
};

export default useLoading;
