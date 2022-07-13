/**
 * @ Create Time: 2022-07-12 17:52:06
 * @ Modified time: 2022-07-13 15:49:09
 * @ Description:  右键菜单
 */
import { useContext } from 'react';

import { ContextMenuAnchorPoint } from '../context';

export default function useContextMenu() {
  const { menuProps, toggleMenu, anchorPoint, setAnchorPoint, tempData, setTempData } =
    useContext(ContextMenuAnchorPoint);

  return { menuProps, toggleMenu, anchorPoint, setAnchorPoint, tempData, setTempData };
}
