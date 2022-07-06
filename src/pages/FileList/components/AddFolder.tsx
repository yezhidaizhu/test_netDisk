/**
 * @ Create Time: 2022-06-16 09:05:25
 * @ Modified time: 2022-07-06 12:52:01
 * @ Description:  新建文件夹弹窗
 */
import { useEffect, useRef, useState } from 'react';

import { Grow, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useKeyPress } from 'ahooks';

import useNoti from '@/hooks/useNoti';
import { validateFileName } from '@/utils/helper';

import { addActions } from '../hooks/useAddActions';

export default function AddFolder(
  props: DialogProps & { onConfirm: (newFileName: string) => void },
) {
  const { onConfirm, ...dialogprops } = props;

  const noti = useNoti();
  const inputRef = useRef<any>(null);
  const [newFolderName, setNewFolderName] = useState('新建文件夹');

  useKeyPress('Enter', (e) => {
    e.stopPropagation();
    e.preventDefault();
    _onConfirm();
  });

  const onCloseDialog = () => {
    const close = dialogprops.onClose;
    close?.({}, 'escapeKeyDown');
  };

  const _onConfirm = async () => {
    const err = checkFolderName(newFolderName);
    if (err) {
      noti.error(err);
    } else {
      onConfirm(newFolderName);
      onCloseDialog();
    }
  };

  const onInputChange = (e: any) => {
    setNewFolderName(e.target.value);
  };

  useEffect(() => {
    setNewFolderName(newFolderName);
    setTimeout(() => {
      inputRef.current?.select();
    });
  }, []);

  const { label, Icon } = addActions.NewFolder;

  return (
    <Dialog fullWidth TransitionComponent={Grow} {...dialogprops}>
      <DialogTitle>
        <div className="flex items-center gap-2 ">
          <Icon />
          {label}
        </div>
      </DialogTitle>
      <DialogContent>
        <TextField
          inputRef={inputRef}
          value={newFolderName}
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

export function checkFolderName(folderName: string) {
  const value = folderName.trim();
  if (!value) return '名称不能为空';

  if (!validateFileName(folderName)) {
    return '文件名不支持特殊字符';
  }
}
