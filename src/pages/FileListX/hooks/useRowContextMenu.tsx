/**
 * @ Create Time: 2022-07-14 15:28:05
 * @ Modified time: 2022-07-14 16:07:05
 * @ Description:  右键菜单
 */
import { useMemo, useState } from 'react';

import { ListItemIcon } from '@mui/material';

import useDiskFiles from '../store/useDiskFiles';
import useFileOperation from './useFileOperation';

export default function useContextMenu() {
  const { operations, execFileOperation } = useFileOperation();

  const { getFileDataByIds } = useDiskFiles();

  const [contextMenu, setContextMenu] = useState<any[]>([]);

  // 根据情况，获取当前菜单，空对象渲染成分界线
  const onBeforeOpenContextMenu = (data: { ids: any[] }) => {
    const { ids } = data;
    const curFiles = getFileDataByIds(ids);
    const { Download, Share, Rename, Move } = operations;

    if (curFiles.length > 1) {
      //  当前选择的文件有多个
      return setContextMenu(formatMenu([Download, Share, null, Move]));
    } else {
      return setContextMenu(formatMenu([Download, Share, null, Rename, Move]));
    }

    function formatMenu(menus: any[]) {
      menus.push(null);
      const newMenus = menus.map((item) => {
        return !item
          ? { divider: true }
          : { ...item, onClick: () => execFileOperation(item, curFiles) };
      });

      newMenus.push({
        children: deleteItem,
        onClick: () => execFileOperation(operations.Delete, curFiles),
      });
      return newMenus;
    }
  };

  // 删除选项
  const deleteItem = useMemo(() => {
    const { Delete } = operations;
    const DeleteIcon = Delete.Icon;
    return (
      <div className="flex gap-3 text-red-500">
        <DeleteIcon fontSize="small" />
        {Delete.label}
      </div>
    );
  }, [operations]);

  return {
    contextMenu,
    onBeforeOpenContextMenu,
  };
}
