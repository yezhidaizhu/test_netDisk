/**
 * @ Create Time: 2022-06-20 09:00:41
 * @ Modified time: 2022-07-06 14:23:12
 * @ Description:  增加操作，包括 新建文件夹，上传文件
 */
import { useEffect } from 'react';

import { CloudUpload, CreateNewFolder } from '@mui/icons-material';

import { useModal } from 'mui-modal-provider';

import useNoti from '@/hooks/useNoti';

import AddFolder from '../components/AddFolder';
import useFilePath from '../store/useFilePath';
import useCreatFolder from './req/useCreatFolder';
import { AddActionItem, AddActionType } from './types';

export const addActions = {
  [AddActionType.NewFolder]: {
    key: AddActionType.NewFolder,
    label: '新建文件夹',
    Icon: CreateNewFolder,
  },
  [AddActionType.UploadFile]: {
    key: AddActionType.UploadFile,
    label: '上传文件',
    Icon: CloudUpload,
  },
};

export default function useAddActions() {
  const noti = useNoti();
  const { showModal } = useModal();
  const { creatFolderAction } = useCreatFolder();
  const { refreshFilePath } = useFilePath();

  /**
   *
   * @param opts filePath: 新建文件夹的路劲
   */
  const onNewFolder = (opts?: { filePath: { label: string; id: number }[] }) => {
    const { filePath = [] } = opts || {};

    console.log('onNewFolder and filePath=> ', filePath);
    showModal(AddFolder, {
      onConfirm: (newFileName: string) => {
        console.log('new file name:', newFileName);
        creatFolderAction.run({ folderName: newFileName });
      },
    });
  };

  /**
   * 上传文件
   */
  const onUploadFile = () => {
    document.getElementById(AddActionType.UploadFile)?.querySelector('button')?.click();
  };

  const execAddAction = (addActionItem: AddActionItem) => {
    const { key } = addActionItem;

    switch (key) {
      case AddActionType.NewFolder:
        onNewFolder();
        break;
      case AddActionType.UploadFile:
        onUploadFile();
        break;
      default:
        break;
    }
  };

  // 文件夹创建成功
  useEffect(() => {
    const data = creatFolderAction.data;
    if (data) {
      const err = data.errmsg || '创建失败，未知错误';
      if (data.result === 0) {
        if (err?.includes('创建成功')) {
          noti.success(err);
          refreshFilePath(); // 刷新
        } else {
          noti.warning(err);
        }
      } else {
        noti.error(err);
      }
    }
  }, [creatFolderAction.data]);

  return {
    onNewFolder,
    onUploadFile,
    execAddAction,
  };
}
