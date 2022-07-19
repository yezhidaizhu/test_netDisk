import { Button, Dialog, DialogContent, DialogTitle, Divider, Fade, Grow } from '@mui/material';
import { DialogProps } from '@mui/material/Dialog';

import { Loader } from '@/components/Loader';
import useNoti from '@/hooks/useNoti';

import useFileOperation from '../../hooks/useFileOperation';
import useMoveFile from '../../hooks/useMoveFile';
import useFilePath from '../../store/useFilePath';
import CurFileList from './CurFileList';
import CurFilePath from './CurFilePath';
import MoveFileList from './MoveFileList';

export default function MoveFile(props: DialogProps & { moveFileList: FileInfo[] }) {
  const { moveFileList, ...dialogprops } = props;
  const { refreshFilePath } = useFilePath();
  const noti = useNoti();
  const { operations } = useFileOperation();
  const {
    loading,
    curFilePath,
    curFileList,
    moveFileListIds,
    isChange,
    onCurFilePathClick,
    onFolderClick,
    onCreatFolder,
    isSameFilePath,
    onStartMove,
  } = useMoveFile({
    moveFileList: moveFileList,
  });

  const { label, Icon } = operations.Move;

  // 关闭弹窗
  const onCloseDialog = (refresh?: boolean) => {
    const close = dialogprops.onClose;
    (isChange || refresh) && refreshFilePath();
    close?.({}, 'escapeKeyDown');
  };

  // 确认移动
  const _onConfirm = async () => {
    const data = await onStartMove();
    if (data?.result === 0) {
      if (data.errmsg) {
        noti.warning(data.errmsg);
      } else {
        noti.success('移动成功');
        onCloseDialog(true);
      }
    }
  };

  return (
    <Dialog fullWidth TransitionComponent={Grow} {...dialogprops}>
      <DialogTitle>
        <div className="flex items-center gap-2 ">
          <Icon />
          {label}
        </div>
      </DialogTitle>

      <div className="px-4 pb-2">
        {/* 文件路劲 */}
        <CurFilePath curFilePath={curFilePath} onClick={onCurFilePathClick} />
        <Divider />

        {/* 移动文件列表 */}
        <MoveFileList moveFileList={moveFileList} />
      </div>

      {/* 文件列表 */}
      <DialogContent sx={{ height: 400, paddingTop: 0 }}>
        {!loading ? (
          <Fade in={!loading}>
            <div>
              <CurFileList
                fileList={curFileList}
                onClick={onFolderClick}
                moveFileListIds={moveFileListIds}
              />
              <div className="h-16"></div>
            </div>
          </Fade>
        ) : (
          <div className="flex justify-center items-center h-2/3 ">
            <Loader loading={loading} size={40} />
          </div>
        )}
      </DialogContent>

      {/* 操作 */}
      <div className="flex justify-between p-4 gap-2 bg-gray-100 dark:bg-gray-700 ">
        <Button disabled={loading} onClick={onCreatFolder}>
          新建文件夹
        </Button>

        <div className="flex gap-4 ">
          <Button variant="outlined" disabled={loading} onClick={() => onCloseDialog()}>
            取消
          </Button>
          <Button variant="contained" disabled={loading || isSameFilePath} onClick={_onConfirm}>
            移动到此处{`(${moveFileList.length})`}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
