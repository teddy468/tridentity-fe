import { AlertProps, alpha, useTheme } from "@mui/material";
import { connect, useDispatch, useSelector } from "react-redux";
import { StyledAlert, StyledStack, StyledTitle } from "./styles";
import { systemActions } from "@/redux/reducer/systemReducer";
import { ErrorIcon, SuccessIcon, InfoIcon, WarningIcon } from "@/assets/icons";

interface Props {
  toasts: ToastItem[];
}

const ToastContainer: React.FC<Props> = props => {
  const theme = useTheme();
  const { toasts } = props;

  const getProps = (severity: AlertProps["severity"]): { title: string; color: string; background: string } => {
    switch (severity) {
      case "error": {
        return { title: "Error", color: theme.palette.error.dark, background: alpha(theme.palette.error.dark, 0.2) };
      }
      case "success": {
        return {
          title: "Successfully",
          color: theme.palette.success.dark,
          background: alpha(theme.palette.success.dark, 0.2),
        };
      }
      case "warning": {
        return {
          title: "Warning",
          color: theme.palette.warning.light,
          background: alpha(theme.palette.warning.light, 0.2),
        };
      }
      default: {
        return { title: "Info", color: theme.palette.success.dark, background: alpha(theme.palette.success.dark, 0.2) };
      }
    }
  };
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(systemActions.removeToast(id));
  };

  return (
    <>
      <StyledStack spacing={2}>
        {toasts.map(item => {
          const { id, severity, message } = item;
          const { title, color, background } = getProps(severity);
          return (
            <StyledAlert
              key={id}
              iconMapping={{
                error: <ErrorIcon color={theme.palette.error.dark} />,
                success: <SuccessIcon color={theme.palette.success.dark} />,
                info: <InfoIcon color={theme.palette.info.dark} />,
                warning: <WarningIcon color={theme.palette.info.dark} />,
              }}
              severity={severity}
              variant="standard"
              background={background}
              onClose={() => handleRemove(id)}
              onClick={() => handleRemove(id)}
            >
              <StyledTitle color={color}>{title}</StyledTitle>
              {message}
            </StyledAlert>
          );
        })}
      </StyledStack>
    </>
  );
};

export default connect(({ system }: RootState) => ({ toasts: system.toasts }))(ToastContainer);
