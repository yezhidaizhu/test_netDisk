/**
 * @ Create Time: 2022-06-16 09:05:25
 * @ Modified time: 2022-06-17 17:02:02
 * @ Description:  新建文件夹弹窗
 */
import { useEffect, useRef } from 'react';

import { Fade, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useKeyPress } from 'ahooks';

import useNoti from '@/hooks/useNoti';
import useAddFolder from '@/pages/FileList/store/useAddFolder';
import { validateFileName } from '@/utils/helper';

export default function AddFolder() {
  const { isOpen, folderName, setFolderName, resetFolderName, closeAddFolderModal } =
    useAddFolder();

  const noti = useNoti();

  const inputRef = useRef<any>(null);
  const confirmBtnRef = useRef<any>(null);

  useKeyPress('Enter', (e) => onConfirm());

  const onInputChange = (e: any) => {
    setFolderName(e.target.value);
  };

  const onConfirm = () => {
    if (!isOpen) return;

    const err = checkFolderName(folderName);

    if (err) {
      noti.error(err);
    } else {
      closeAddFolderModal();
      noti.success('创建成功');
    }
  };

  useEffect(() => {
    isOpen && resetFolderName();
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      TransitionComponent={Fade}
      maxWidth="sm"
      onClose={closeAddFolderModal}
      onFocus={() => {
        inputRef.current?.select();
      }}
    >
      <DialogTitle>新建文件夹</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={inputRef}
          value={folderName}
          margin="dense"
          label="文件夹名称"
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
        <Button ref={confirmBtnRef} variant="contained" onClick={onConfirm}>
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function checkFolderName(folderName: string) {
  const value = folderName.trim();
  if (!value) return '名称不能为空';

  if (!validateFileName(folderName)) {
    return '文件夹名称不支持特殊字符';
  }
}
