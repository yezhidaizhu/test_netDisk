/**
 * @ Create Time: 2022-06-20 09:00:41
 * @ Modified time: 2022-07-07 14:11:29
 * @ Description:  增加操作，包括 新建文件夹，上传文件
 */
import { useEffect } from 'react';

import { CloudUpload, CreateNewFolder } from '@mui/icons-material';

import { useModal } from 'mui-modal-provider';

import useNoti from '@/hooks/useNoti';

import AddFolder from '../components/AddFolder';
import useFilePath from '../store/useFilePath';
import useCreatFolder from './req/useCreatFolder';
import useGetPrivilege from './req/useGetPrivilege';
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
  const { isMineNetDisk, refreshFilePath } = useFilePath();
  const { creatFolderAction } = useCreatFolder();
  const { getPrivilegeAction } = useGetPrivilege();

  /**
   * 新建文件夹
   * @param parentFolder 父级文件夹名，默认为当前路径的文件夹
   */
  const onNewFolder = async (
    parentFolder?: FileInfo | { id: number },
    opts?: { onSuccess?: () => void; dissmissRefreshNetList?: boolean },
  ) => {
    console.log('newFolder');
    if (!isMineNetDisk) {
      // 获取权限
      const data = await getPrivilegeAction.runAsync();
      if (data) {
        if (data?.prv === 1) {
          openNewFolder(parentFolder, opts);
        } else {
          noti.info('您没有操作权限！');
        }
      }
    } else {
      openNewFolder(parentFolder, opts);
    }
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

  const openNewFolder = (
    parentFolder?: FileInfo | { id: number },
    opts?: { onSuccess?: () => void; dissmissRefreshNetList?: boolean },
  ) => {
    const { onSuccess, dissmissRefreshNetList } = opts || {};
    showModal(AddFolder, {
      onConfirm: async (newFileName: string) => {
        console.log('new file name:', newFileName);
        const params = { folderName: newFileName };
        if (parentFolder?.id) {
          Object.assign(params, { folderId: parentFolder.id });
        }
        const data = await creatFolderAction.runAsync(params);

        // 文件夹创建
        if (!data) return;
        const err = data.errmsg || '创建失败，未知错误';
        if (data.result === 0) {
          if (err?.includes('创建成功')) {
            noti.success(err);
            !dissmissRefreshNetList && refreshFilePath(); // 刷新当前列表
            onSuccess?.();
          } else {
            noti.warning(err);
          }
        }
      },
    });
  };

  return {
    onNewFolder,
    onUploadFile,
    execAddAction,
  };
}
