/**
 * @ Create Time: 2022-07-04 17:26:34
 * @ Modified time: 2022-07-04 17:53:10
 * @ Description:  右键新增
 */
import { useState } from 'react';

export default function useAddContextMenu() {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const openContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null,
    );
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  return {
    contextMenu,
    openContextMenu,
    closeContextMenu,
  };
}
