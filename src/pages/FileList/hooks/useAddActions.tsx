/**
 * @ Create Time: 2022-06-20 09:00:41
 * @ Modified time: 2022-06-20 15:57:03
 * @ Description:  增加操作，包括 新建文件夹，上传文件
 */
import { CloudUpload, CreateNewFolder } from '@mui/icons-material';

import { useModal } from 'mui-modal-provider';

import AddFolder from '../components/AddFolder';
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
  const { showModal } = useModal();

  /**
   *
   * @param opts filePath: 新建文件夹的路劲
   */
  const onNewFolder = (opts?: { filePath: { label: string; id: string }[] }) => {
    const { filePath = [] } = opts || {};

    console.log('onNewFolder and filePath=> ', filePath);

    showModal(AddFolder, {
      onConfirm: (newFileName: string) => {
        console.log('new file name:', newFileName);
      },
    });
  };

  const onUploadFile = () => {
    console.log('onUploadFile');
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

  return {
    onNewFolder,
    onUploadFile,
    execAddAction,
  };
}
