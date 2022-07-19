/**
 * @ Create Time: 2022-07-07 10:01:38
 * @ Modified time: 2022-07-07 15:38:47
 * @ Description:  移动文件
 */
import { useEffect, useMemo, useState } from 'react';

import useFilePath, { netDiskType } from '../store/useFilePath';
import useMove from './req/useMove';
import useQueryList from './req/useQueryList';
import useAddActions from './useAddActions';

export default function useMoveFile(opts: { moveFileList: FileInfo[] }) {
  const { moveFileList = [] } = opts;
  const { filePath, isMineNetDisk, getCurFolderId } = useFilePath();
  const { onNewFolder } = useAddActions();
  const { queryListAction } = useQueryList();
  const { moveAction } = useMove();

  const [curFilePath, setCurFilePath] = useState<CurFilePathType[]>([]); // 当前路径，包括当前根路径
  const [curFileList, setCurFileList] = useState<FileInfo[]>([]); // 文件列表
  const [isChange, setIsChange] = useState<boolean>(false); // 用作是否在关闭移动弹窗后，进行刷新列表，例如移动成功，或者新建文件夹成功

  const moveFileListIds = useMemo(() => moveFileList.map((file) => file.id), [moveFileList]);

  // 是否在原来的路径上，是则不允许移动（相当于未移动）
  const isSameFilePath = useMemo(() => {
    if (!curFileList.length) return;
    return getCurFolderId() === getMoveCurFilePathId();
  }, [filePath, curFileList]);

  const { loading } = queryListAction;

  /**
   * 初始化
   */
  const init = () => {
    // 初始化文件路劲，当前文件为起始路劲
    const _fPath = filePath.map((pathItem) => ({
      id: pathItem.folderId,
      label: pathItem.label,
    }));

    // 根路径
    const netType = isMineNetDisk ? netDiskType.Mine : netDiskType.Common;
    const rootPathItem = {
      id: netType.folderId,
      label: netType.label,
    };

    setCurFilePath([rootPathItem, ..._fPath]);
  };

  /**
   * 到达某个路径
   */
  const onCurFilePathClick = (pathItem: CurFilePathType) => {
    const index = curFilePath.findIndex((path) => path.id === pathItem.id);
    if (index !== -1) {
      const newCurFilePath = [...curFilePath].splice(0, index + 1);
      setCurFilePath(newCurFilePath);
    }
  };

  /**
   * 点击文件夹
   */
  const onFolderClick = (file: FileInfo) => {
    const { fileName, id, isFolder } = file;
    if (!isFolder) return;

    // 防止重复点击多次文件
    const lastFilePath = curFilePath[curFilePath.length - 1];
    if (lastFilePath && id === lastFilePath.id) {
      return;
    }

    setCurFilePath((p) => [...p, { id, label: fileName }]);
  };

  /**
   * 当前路径下创建新文件夹
   */
  const onCreatFolder = () => {
    if (!curFilePath.length) return;
    const folderId = getMoveCurFilePathId();

    onNewFolder(
      { id: folderId },
      {
        onSuccess: () => {
          setCurFilePath([...curFilePath]); // 刷新列表
          setIsChange(true);
        },
        dissmissRefreshNetList: true,
      },
    );
  };

  /**
   * 确定移动
   */
  const onStartMove = async () => {
    const params = {
      fromIds: moveFileListIds.join(','),
      toId: getMoveCurFilePathId(),
    };
    const data = await moveAction.runAsync(params);
    return data;
  };

  /**
   * 获取当前路径的id
   */
  function getMoveCurFilePathId() {
    const folderId = curFilePath[curFilePath.length - 1].id;
    return folderId;
  }

  useEffect(init, []);

  // 路径改变，重新获取数据
  useEffect(() => {
    if (!curFilePath.length) return;
    const folderId = getMoveCurFilePathId();
    queryListAction.run({ folderId }, { dismissSearch: true });
  }, [curFilePath]);

  // 获取到列表数据
  useEffect(() => {
    const data = queryListAction.data;

    if (data?.list) {
      setCurFileList(data.list);
    }
  }, [queryListAction.data]);

  return {
    loading,
    curFilePath,
    curFileList,
    moveFileListIds,
    isChange,
    isSameFilePath,
    setCurFilePath,
    onCurFilePathClick,
    onFolderClick,
    onCreatFolder,
    onStartMove,
  };
}
