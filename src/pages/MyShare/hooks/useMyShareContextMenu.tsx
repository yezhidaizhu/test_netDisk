import { useMemo } from 'react';

import { CancelScheduleSend } from '@mui/icons-material';
import { Divider } from '@mui/material';

import useDialog from '@/hooks/useDialog';
import useNoti from '@/hooks/useNoti';
import { TempFileList } from '@/pages/FileList/components/DeleteFileContent';

import useCancelShare from './req/useCancelShare';

export default function useMyShareContextMenu(opts: {
  getFileDataByIds: (ids: number[]) => ShareFileInfo[];
  refreshRoot: () => void;
  shareFileList: ShareFileInfo[];
  isRootPath: boolean;
}) {
  const { getFileDataByIds, refreshRoot, shareFileList, isRootPath } = opts;
  const { warning } = useDialog();
  const noti = useNoti();
  const { cancelShareAciton } = useCancelShare();

  const cancelShare = (ids: number[]) => {
    const curFiles = getFileDataByIds(ids);

    if (!curFiles.length) return;

    const files = [...curFiles];
    warning({
      title: '取消分享',
      content: (
        <div>
          确定取消以下文件的分享？
          <Divider />
          <TempFileList files={files} />
        </div>
      ),
      confirmLabel: `确定`,
      onConfirm: async () => {
        console.log('onCancelFile => ', files);
        const ids = files.map((file) => file.id);
        const data = await cancelShareAciton.runAsync({ ypsId: ids.join(',') });
        if (data?.result === 0) {
          if (!data?.errmsg) {
            noti.success('取消成功');
            refreshRoot();
          } else {
            noti.warning(data?.errmsg);
          }
        }
      },
    });
  };

  // 右键菜单
  const menuItems = useMemo(() => {
    if (isRootPath) {
      return [
        {
          label: '取消分享',
          Icon: CancelScheduleSend,
          onClick: (data: any) => {
            const { ids = [] } = data;
            cancelShare(ids);
          },
        },
      ];
    } else {
      return [];
    }
  }, [shareFileList, isRootPath]);

  return {
    menuItems,
  };
}
