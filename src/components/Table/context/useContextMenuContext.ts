/**
 * @ Create Time: 2022-07-12 17:52:06
 * @ Modified time: 2022-07-14 14:49:23
 * @ Description:  右键菜单
 */
import { useCallback, useEffect, useState } from 'react';

import { useMenuState } from '@szhsin/react-menu';

export default function useContextMenuContext(opts: {
  contextMenu?: ContextMenuItem[];
  onBeforeOpenContextMenu?: (data: ContextMenuTempSelData) => void;
}) {
  const { contextMenu = [], onBeforeOpenContextMenu } = opts;

  const [menuProps, toggleMenu] = useMenuState({ transition: true });
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  const [tempData, setTempData] = useState<ContextMenuTempSelData>({
    id: undefined,
    ids: [],
  });

  const _toggleMenu = useCallback(
    (open?: boolean) => {
      toggleMenu(open);
    },
    [toggleMenu, contextMenu, tempData],
  );

  useEffect(() => {
    if (menuProps.state === 'closed') {
    }
  }, [menuProps.state]);

  return {
    menuProps,
    toggleMenu: _toggleMenu,
    anchorPoint,
    setAnchorPoint,
    tempData,
    setTempData,
    onBeforeOpenContextMenu,
  };
}
