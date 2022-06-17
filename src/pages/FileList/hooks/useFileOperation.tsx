/**
 * @ Create Time: 2022-06-16 14:47:03
 * @ Modified time: 2022-06-17 16:05:03
 * @ Description:  文件操作，包括 下载、 分享、 删除、移动，重命名
 */
import {
  DeleteForever,
  DriveFileMove,
  DriveFileRenameOutline,
  FileDownload,
  Share,
} from '@mui/icons-material';
import { Divider } from '@mui/material';

import useDialog from '@/hooks/useDialog';
import imgIcon from '@/utils/fileIcon/icons/image.svg';

import { FileOperationItem, FileOperationType } from './types';

const operations = {
  [FileOperationType.Download]: {
    key: FileOperationType.Download,
    label: '下载',
    Icon: FileDownload,
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

  const onDownload = (files: FileInfo[]) => {
    console.log('onDownload => ', files);
  };

  const onShare = (files: FileInfo[]) => {
    console.log('onShare => ', files);
  };

  const onDelete = (files: FileInfo[]) => {
    console.log('onDelete waring');
    const fileNameList = files.map((file) => file.fileName);
    warning({
      title: '删除文件',
      content: <DeleteFileContent fileNameList={fileNameList} />,
      confirmLabel: `删除 (${fileNameList.length})`,
      confirmBtnProps: { color: 'error' },
      onConfirm: () => {
        console.log('onDelete => ', files);
      },
    });
  };

  const onMove = (files: FileInfo[]) => {
    console.log('onMove');
  };

  const onRename = (files: FileInfo[]) => {
    console.log('onRename');
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

function DeleteFileContent(props: { fileNameList: string[] }) {
  const { fileNameList } = props;
  return (
    <div>
      确定删除以下文件？
      <Divider />
      <div className="pt-2 flex flex-col gap-1 flex-wrap text-sm">
        {fileNameList.map((fname, index) => (
          <div key={index} className="flex gap-1">
            <img src={imgIcon} className="w-4" />
            {fname}
          </div>
        ))}
      </div>
    </div>
  );
}
