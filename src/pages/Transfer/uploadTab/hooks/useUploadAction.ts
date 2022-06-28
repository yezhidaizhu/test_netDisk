/**
 * @ Create Time: 2022-06-21 15:11:02
 * @ Modified time: 2022-06-21 15:36:14
 * @ Description:  上传过程中的 开始、暂停、取消  操作
 */
import { Cancel, PlayCircleFilledWhite, StopCircle } from '@mui/icons-material';

import { UploadActionItem, UploadActionType } from './types';

export const uploadActions = {
  [UploadActionType.Start]: {
    key: UploadActionType.Start,
    label: '开始',
    Icon: PlayCircleFilledWhite,
  },
  [UploadActionType.Stop]: {
    key: UploadActionType.Stop,
    label: '暂停',
    Icon: StopCircle,
  },
  [UploadActionType.Cancel]: {
    key: UploadActionType.Cancel,
    label: '取消',
    Icon: Cancel,
  },
};

export default function useUploadAction() {
  const onStart = () => {
    console.log('onStart');
  };
  const onStop = () => {
    console.log('onStop');
  };
  const onCancel = () => {
    console.log('onCancel');
  };

  const execUploadAction = (action: UploadActionItem) => {
    const { key } = action;
    switch (key) {
      case UploadActionType.Start:
        onStart();
        break;
      case UploadActionType.Stop:
        onStop();
        break;
      case UploadActionType.Cancel:
        onCancel();
        break;
      default:
        break;
    }
  };

  return {
    onStart,
    onStop,
    onCancel,
    execUploadAction,
  };
}
