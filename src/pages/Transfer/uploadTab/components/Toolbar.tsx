/**
 * @ Create Time: 2022-06-21 14:54:37
 * @ Modified time: 2022-06-21 16:42:58
 * @ Description:  表单前的显示
 */
import { useMemo } from 'react';

import TToolbar from '../../components/TToolbar';
import { UploadActionType } from '../hooks/types';
import useUploadAction, { uploadActions } from '../hooks/useUploadAction';

export default function Toolbar() {
  //  const { } = props;
  const { execUploadAction } = useUploadAction();
  const isStopAll = true;

  const label = useMemo(() => {
    return '上传列表 - 已上传47%' + (isStopAll ? '，已全部暂停' : '');
  }, [isStopAll]);

  const actions = useMemo(() => {
    const btns = [uploadActions.Start, uploadActions.Stop, uploadActions.Cancel].map((action) => {
      const { label, Icon, key } = action;
      return {
        label,
        Icon,
        disabled: key === UploadActionType.Cancel,
        onClick: () => execUploadAction(action),
      };
    });

    return btns;
  }, [isStopAll]);

  return <TToolbar label={label} actions={actions} />;
}
