/**
 * @ Create Time: 2022-07-12 09:58:49
 * @ Modified time: 2022-07-12 10:12:10
 * @ Description:  右键弹出菜单
 */
import { useState } from 'react';

export function useContextMenu() {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const [rowData, setRowData] = useState<any>(); // 临时保存右键所在的行数据

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    const { clientX: mouseX, clientY: mouseY } = event;
    setContextMenu(contextMenu === null ? { mouseX: mouseX + 2, mouseY: mouseY - 6 } : null);
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  return {
    rowData,
    contextMenu,
    setRowData,
    closeContextMenu,
    handleContextMenu,
  };
}
