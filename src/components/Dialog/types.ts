import { ButtonProps } from '@mui/material';

export enum CusDialogType {
  Normal,
  Warning,
  Info,
}

type CusDialogProps = {
  type?: CusDialogType;
  title: string;
  content: any;

  confirmLabel?: string;
  confirmBtnProps?: ButtonProps;
  hiddenConfirmBtn?: boolean;
  onConfirm?: () => void;

  cancelLabel?: string;
  cancelBtnProps?: ButtonProps;
  hiddenCancelBtn?: boolean;
  onCancel?: () => void;
};

export type { CusDialogProps };
