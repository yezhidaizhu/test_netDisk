import { useMemo, useState } from 'react';

import { CancelScheduleSend } from '@mui/icons-material';
import { Divider } from '@mui/material';

import useDialog from '@/hooks/useDialog';
import useNoti from '@/hooks/useNoti';
import { TempFileList } from '@/pages/FileList/components/DeleteFileContent';

export default function useMyShareContextMenu(opts: {
  getFileDataByIds: (ids: number[]) => ShareFileInfo[];
  refreshRoot: () => void;
  shareFileList: ShareFileInfo[];
  isRootPath: boolean;
}) {
  const { getFileDataByIds, refreshRoot, shareFileList, isRootPath } = opts;
  const { warning } = useDialog();
  const noti = useNoti();

  // 右键菜单
  const menuItems = [
    {
      label: '保存至我的云盘',
      Icon: CancelScheduleSend,
      onClick: (data: any) => {
        const { ids = [] } = data;
        console.log(data);
      },
    },
  ];

  return {
    menuItems,
  };
}
