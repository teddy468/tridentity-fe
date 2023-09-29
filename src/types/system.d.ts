type AlertProps = import("@mui/material").AlertProps;

declare interface ToastItem {
  id: number;
  severity: AlertProps["severity"];
  message: React.ReactNode;
  duration?: number;
}
