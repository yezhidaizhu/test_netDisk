/**
 * @ Create Time: 2022-06-17 09:34:06
 * @ Modified time: 2022-06-17 11:35:44
 * @ Description:  弹窗
 */
import { useMemo } from 'react';

import { Info, WarningAmber } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { DialogProps } from '@mui/material/Dialog';

import { CusDialogProps, CusDialogType } from './types';

const IconMap = {
  [CusDialogType.Normal]: {
    Icon: null,
    color: 'inherit',
  },
  [CusDialogType.Warning]: {
    Icon: WarningAmber,
    color: 'warning',
  },
  [CusDialogType.Info]: {
    Icon: Info,
    color: 'info',
  },
};

export default function CusDiglog(props: DialogProps & CusDialogProps) {
  const {
    type = CusDialogType.Warning,
    title,
    content,
    confirmLabel = '确定',
    cancelLabel = '取消',

    onCancel,
    onConfirm,
    confirmBtnProps = {},
    cancelBtnProps = {},

    hiddenConfirmBtn = false,
    hiddenCancelBtn = false,
    ...dialogprops
  } = props;

  const onCloseDialog = () => {
    const close = dialogprops.onClose;
    close?.({}, 'escapeKeyDown');
  };

  const _onConfirm = async () => {
    await onConfirm?.();
    onCloseDialog();
  };

  const _onCancel = async () => {
    await onCancel?.();
    onCloseDialog();
  };

  const Icon = useMemo(() => {
    const { Icon, color = '' } = IconMap[type];
    if (!Icon) return;
    return <Icon color={color as any} />;
  }, [type]);

  return (
    <Dialog fullWidth {...dialogprops}>
      <DialogTitle>
        <div className="flex items-center gap-2 ">
          {Icon}
          {title}
        </div>
      </DialogTitle>
      <DialogContent>
        <div className=" text-gray-700 dark:text-gray-300 ">{content}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={_onCancel} autoFocus {...cancelBtnProps}>
          {cancelLabel}
        </Button>
        <Button onClick={_onConfirm} variant="contained" {...confirmBtnProps}>
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
