/**
 * @ Create Time: 2022-07-11 15:29:04
 * @ Modified time: 2022-07-14 09:44:32
 * @ Description:  表格数据
 */
import { useCallback, useEffect, useMemo } from 'react';

import useShareFileList from './useShareFileList';
import useShareFilePath from './useShareFilePath';

export default function useShareTable(opts: { type: 2 | 3; rootPath: ShareFilePathItemType }) {
  const { loading, shareFileList, getShareDetailFileList, getShareRootFileList, refreshRoot } =
    useShareFileList(opts);
  const { shareFilePath, addFilePath, arrivePath, refreshPath } = useShareFilePath(opts);

  const isRootPath = useMemo(() => {
    return shareFilePath.length === 1;
  }, [shareFilePath]);

  // 根据id返回对应的文件信息
  const getFileDataById = useCallback(
    (fileId: any): ShareFileInfo | undefined => {
      return shareFileList.find((file) => file.id === fileId);
    },
    [shareFileList],
  );

  // 根据id返回对应的文件信息
  const getFileDataByIds = useCallback(
    (fileIds: any[]): ShareFileInfo[] => {
      return shareFileList.filter((file) => fileIds.find((fid) => file.id === fid));
    },
    [shareFileList],
  );

  const onRowDbClick = (dataId: any) => {
    const curFile = getFileDataById(dataId);
    if (!curFile) return;

    if (curFile.isFolder) {
      addFilePath(curFile);
    }
  };

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
    isRootPath,
    refreshRoot,
    addFilePath,
    arrivePath,
    getFileDataById,
    getFileDataByIds,
    onRowDbClick,
  };
}
