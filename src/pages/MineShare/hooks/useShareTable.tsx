/**
 * @ Create Time: 2022-07-11 15:29:04
 * @ Modified time: 2022-07-12 11:12:49
 * @ Description:  表格数据
 */
import { useEffect, useMemo } from 'react';

import { CancelScheduleSend } from '@mui/icons-material';
import { Divider } from '@mui/material';

import useDialog from '@/hooks/useDialog';
import useNoti from '@/hooks/useNoti';
import { TempFileList } from '@/pages/FileList/components/DeleteFileContent';

import useCancelShare from './req/useCancelShare';
import useShareFileList from './useShareFileList';
import useShareFilePath from './useShareFilePath';

export default function useShareTable(opts: { type: 2 | 3; rootPath: ShareFilePathItemType }) {
  const { warning } = useDialog();
  const noti = useNoti();
  const { cancelShareAciton } = useCancelShare();

  const { loading, shareFileList, getShareDetailFileList, getShareRootFileList, refreshRoot } =
    useShareFileList(opts);
  const { shareFilePath, addFilePath, arrivePath, refreshPath } = useShareFilePath(opts);

  // 右键菜单
  const menuItems: ShareContextMenuItem[] = useMemo(
    () => [
      {
        label: '取消分享',
        Icon: CancelScheduleSend,
        onClick: (file: ShareFileInfo) => {
          const curFile = { ...file };
          const files = [curFile];
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
          console.log(file);
        },
      },
    ],
    [shareFileList],
  );

  useEffect(() => {
    if (!shareFilePath.length) return;

    const lastPathIndex = shareFilePath.length - 1;
    const lastPathItem = shareFilePath[lastPathIndex];

    if (lastPathItem.id === 0) {
      getShareRootFileList();
    } else {
      getShareDetailFileList({ id: lastPathItem.id, type: lastPathIndex === 1 ? 1 : -1 });
    }
  }, [shareFilePath]);

  return {
    loading,
    shareFileList,
    shareFilePath,
    menuItems,
    addFilePath,
    arrivePath,
  };
}
