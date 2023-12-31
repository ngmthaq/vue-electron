export type ToastType = {
  id?: string;
  message: string;
  variant: "primary" | "warning" | "danger" | "success" | "info";
  status?: "idle" | "opened" | "closed";
};

export type NotificationPermissionType = {
  time: number;
  granted: boolean;
};

export type SystemThemeModeType = "light" | "dark";
