export type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonConfig = {
  label: string;
  type?: ButtonType;
  disabled?: boolean;
  customClasses?: string;
  iconPath?: string;
};

export type PageHeaderConfig = {
  title: string;
  description?: string;
  overline?: string;
  primaryAction?: ButtonConfig;
};

export type PaginationConfig = {
  currentPage: number;
  totalPages: number;
  helperText?: string;
};
