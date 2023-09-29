import { systemActions } from "@/redux/reducer/systemReducer";
import { AlertProps } from "@mui/material";
import { useDispatch } from "react-redux";

type ToastFn = (message: React.ReactNode, duration?: number) => void;

interface ReturnType {
  error: ToastFn;
  success: ToastFn;
  warning: ToastFn;
  info: ToastFn;
}

const useToast = (): ReturnType => {
  const dispatch = useDispatch();

  const createToast =
    (severity: AlertProps["severity"]): ToastFn =>
    (message: React.ReactNode, duration: number = 3000) => {
      const id = performance.now();
      dispatch(systemActions.addToast({ id, severity, message, duration }));
      setTimeout(() => dispatch(systemActions.removeToast(id)), duration);
    };

  return {
    error: createToast("error"),
    success: createToast("success"),
    warning: createToast("warning"),
    info: createToast("info"),
  };
};

export default useToast;
