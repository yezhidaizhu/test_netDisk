/**
 * @ Create Time: 2022-06-20 10:43:51
 * @ Modified time: 2022-06-20 14:58:02
 * @ Description:  重命名弹窗
 */
import { useEffect, useRef, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grow,
  TextField,
} from '@mui/material';
import { DialogProps } from '@mui/material/Dialog';

import { useKeyPress } from 'ahooks';

import useNoti from '@/hooks/useNoti';

import useFileOperation from '../hooks/useFileOperation';
import { checkFolderName } from './AddFolder';

export default function ReName(
  props: DialogProps & { fileName: string; onConfirm: (newFileName: string) => void },
) {
  const { fileName, onConfirm, ...dialogprops } = props;

  const { operations } = useFileOperation();
  const noti = useNoti();
  const inputRef = useRef<any>(null);
  const [newFileName, setNewFileName] = useState('');

  useKeyPress('Enter', (e) => _onConfirm());

  const onCloseDialog = () => {
    const close = dialogprops.onClose;
    close?.({}, 'escapeKeyDown');
  };

  const _onConfirm = async () => {
    const err = checkFolderName(newFileName);
    if (err) {
      noti.error(err);
    } else {
      onConfirm(newFileName);
      onCloseDialog();
    }
  };

  const onInputChange = (e: any) => {
    setNewFileName(e.target.value);
  };

  useEffect(() => {
    setNewFileName(fileName);
    setTimeout(() => {
      inputRef.current?.select();
    });
  }, []);

  const { label, Icon } = operations.Rename;

  return (
    <Dialog fullWidth TransitionComponent={Grow} {...dialogprops}>
      <DialogTitle>
        <div className="flex items-center gap-2 ">
          <Icon />
          {label}
        </div>
      </DialogTitle>
      <DialogContent>
        <div className=" text-gray-700 dark:text-gray-300 mb-4">原文件名：{fileName}</div>
        <TextField
          inputRef={inputRef}
          value={newFileName}
          margin="dense"
          label={label}
          fullWidth
          inputProps={{
            maxLength: 30,
            selectionstart: 0,
            selectionend: 5,
          }}
          onChange={onInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onCloseDialog}>
          取消
        </Button>
        <Button onClick={_onConfirm} variant="contained">
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
}
