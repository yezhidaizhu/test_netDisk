/**
 * @ Create Time: 2022-06-16 14:47:03
 * @ Modified time: 2022-07-07 14:28:01
 * @ Description:  文件操作，包括 下载、 分享、 删除、移动，重命名
 */
import { useEffect } from 'react';

import {
  CloudDownload,
  DeleteForever,
  DriveFileMove,
  DriveFileRenameOutline,
  Share,
} from '@mui/icons-material';

import { useModal } from 'mui-modal-provider';

import useDialog from '@/hooks/useDialog';
import useNoti from '@/hooks/useNoti';

import DeleteFileContent from '../components/DeleteFileContent';
import MoveFile from '../components/MoveFile';
import ReName from '../components/ReName';
import useFilePath from '../store/useFilePath';
import useDeleteFolder from './req/useDeleteFolder';
import useRename from './req/useRename';
import { FileOperationItem, FileOperationType } from './types';

const operations = {
  [FileOperationType.Download]: {
    key: FileOperationType.Download,
    label: '下载',
    Icon: CloudDownload,
  },
  [FileOperationType.Share]: {
    key: FileOperationType.Share,
    label: '分享',
    Icon: Share,
  },
  [FileOperationType.Delete]: {
    key: FileOperationType.Delete,
    label: '删除',
    Icon: DeleteForever,
  },
  [FileOperationType.Move]: {
    key: FileOperationType.Move,
    label: '移动',
    Icon: DriveFileMove,
  },
  [FileOperationType.Rename]: {
    key: FileOperationType.Rename,
    label: '重命名',
    Icon: DriveFileRenameOutline,
  },
};

export default function useFileOperation() {
  const { warning } = useDialog();
  const { showModal } = useModal();
  const noti = useNoti();
  const { refreshFilePath } = useFilePath();
  const { renameAction } = useRename();
  const { deleteFolderAction } = useDeleteFolder();

  const onDownload = (files: FileInfo[]) => {
    console.log('onDownload => ', files);
  };

  const onShare = (files: FileInfo[]) => {
    console.log('onShare => ', files);
  };

  const onDelete = (files: FileInfo[]) => {
    console.log('onDelete waring');
    warning({
      title: '删除文件',
      content: <DeleteFileContent files={files} />,
      confirmLabel: `删除 (${files.length})`,
      confirmBtnProps: { color: 'error' },
      onConfirm: () => {
        console.log('onDelete => ', files);
        const ids = files.map((file) => file.id);
        deleteFolderAction.run({ folderIds: ids.join(',') });
      },
    });
  };

  const onMove = (files: FileInfo[]) => {
    showModal(MoveFile, { moveFileList: files });
    console.log('onMove');
  };

  const onRename = (files: FileInfo[]) => {
    showModal(ReName, {
      fileName: files[0].fileName,
      onConfirm: (newFileName: string) => {
        console.log('new file name:', newFileName);
        renameAction.run({
          folderId: files[0].id,
          folderName: newFileName,
        });
      },
    });
  };

  const execFileOperation = (operation: FileOperationItem, files: FileInfo[]) => {
    const { key } = operation;
    switch (key) {
      case FileOperationType.Download:
        onDownload(files);
        break;
      case FileOperationType.Share:
        onShare(files);
        break;
      case FileOperationType.Delete:
        onDelete(files);
        break;
      case FileOperationType.Move:
        onMove(files);
        break;
      case FileOperationType.Rename:
        onRename(files);
        break;
      default:
        break;
    }
  };

  // 处理请求
  const handleResponse = (opts: { data: any; defaultErr: string; notiSuccess?: boolean }) => {
    const { data, defaultErr, notiSuccess } = opts;
    if (data?.result === 0) {
      const err = data?.errmsg || defaultErr;
      if (err.includes('成功')) {
        notiSuccess && noti.success(err);
        refreshFilePath();
      } else {
        noti.warning(err);
      }
    }
  };

  useEffect(() => {
    handleResponse({
      data: renameAction.data,
      defaultErr: '重命名失败，未知错误',
    });
  }, [renameAction.data]);

  useEffect(() => {
    handleResponse({
      data: deleteFolderAction.data,
      defaultErr: '删除失败，未知错误',
    });
  }, [deleteFolderAction.data]);

  return {
    operations,
    onDownload,
    onShare,
    onDelete,
    onMove,
    onRename,
    execFileOperation,
  };
}
