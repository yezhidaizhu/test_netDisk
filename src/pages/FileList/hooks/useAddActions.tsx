/**
 * @ Create Time: 2022-06-20 09:00:41
 * @ Modified time: 2022-06-20 09:16:31
 * @ Description:  增加操作，包括 新建文件夹，上传文件
 */
import { CloudUpload, CreateNewFolder } from '@mui/icons-material';

import useAddFolder from '../store/useAddFolder';
import { AddActionType } from './types';

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
  const { openAddFolderModal } = useAddFolder();

  const onAddAction = (key: AddActionType) => {
    if (key === AddActionType.NewFolder) {
      openAddFolderModal();
    } else if (key === AddActionType.UploadFile) {
      console.log('upload');
    }
  };

  return {
    onAddAction,
  };
}
