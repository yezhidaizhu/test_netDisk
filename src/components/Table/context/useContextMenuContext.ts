/**
 * @ Create Time: 2022-07-12 17:52:06
 * @ Modified time: 2022-07-13 17:18:32
 * @ Description:  右键菜单
 */
import { useCallback, useState } from 'react';

import { useMenuState } from '@szhsin/react-menu';

export default function useContextMenuContext(contextMenu?: ContextMenuItem[]) {
  const [menuProps, toggleMenu] = useMenuState({ transition: true });
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  const [tempData, setTempData] = useState<{ id: DataIdType | undefined; ids: DataIdType[] }>({
    id: undefined,
    ids: [],
  });

  const _toggleMenu = useCallback(
    (open?: boolean) => {
      if (!contextMenu?.length) {
        toggleMenu(false);
      } else {
        toggleMenu(open);
      }
    },
    [toggleMenu, contextMenu],
  );

  return {
    menuProps,
    toggleMenu,
    anchorPoint,
    setAnchorPoint,
    tempData,
    setTempData,
  };
}
